const fs = require('fs');

// Routes Handler Functions
const FILEPATH = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(FILEPATH));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
};

exports.addTour = (req, res) => {
  // Requires middleware to read 'req.body'
  const newId = tours[tours.length - 1].id + 1;

  // merge 2 objects together
  const newTour = Object.assign({ id: newId }, req.body);

  // Add the new tour to the tours object
  tours.push(newTour);

  // Write the new tours to the file
  fs.writeFile(FILEPATH, JSON.stringify(tours), (err) => {
    // 201 = 'created'
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  });
};

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  // var body = JSON.stringify(req.body);
  // console.log(`POST body: ${body}`);

  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

exports.getTourByID = (req, res) => {
  console.log(req.params);

  // convert string to number trick
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.patchTourByID = (req, res) => {
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
