const Tour = require('../models/tourModel');

exports.createTour = async (req, res) => {
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

exports.getTour = (req, res) => {
  console.log(req.params);

  // convert string to number trick
  // const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      // tour,
    },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // 204 successfully deleted => no content
  // covention will return a null data
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: { tours },
  });
};
