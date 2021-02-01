const Tour = require('../models/tourModel');

exports.createTour = async (req, res) => {
  // using async await so we need try catch
  try {
    // Returns a promise
    const newTour = await Tour.create(req.body);

    // 201 = 'created'
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    //Same as Tour.findOne({ _id: req.params..id })
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    // 204 successfully deleted => no content
    // covention will return a null data
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Unable to find tour id!',
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    // 1. Build query
    // This is a trick to create shallow copy of an object in ES6
    // ... req.query will destructure the query
    // {} will make it a new object
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObject = { ...req.query };

    // 1.1 Basic filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // this will remove elements from excludedFields without creating a new object
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1.2 Advanced filtering: gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObject);
    // /g = exact match | /g = happens more than once
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // {difficulty: 'easy', duration { $gte: 5 }}

    // alternative way to use query to filter data
    // const query = await Tour.find()
    //   .where('duration')
    //   .lte(5)
    //   .where('difficulty')
    //   .equal('easy');

    // 2. Sorting
    if (req.query.sort) {
      // to sort secondary field
      // sort('price ratingsAverage')
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3. Field Limiting
    if (req.query.fields) {
      // something like 'name duration price'
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields); // projecting
    } else {
      // - means 'exclude', '-__v' means everything excluding '__v'
      query = query.select('-__v');
    }

    // 4. Execute query
    // We shouldn't use "await Tour.find(queryObject)" because it will execute the Query (return object) right away
    // and will will not be able to chain further methods like sort() or pagination
    const tours = await query;

    // 4. Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
