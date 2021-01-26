const mongoose = require('mongoose');

// 1. Specify Mongoose schema and specify validation
const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a durations.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size.'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true, // auto remove beginning or the end whitespace
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// 2. Create a model using the previous created schema
// convention using upper case for models
const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
