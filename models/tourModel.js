const mongoose = require('mongoose');

// 1. Specify Mongoose schema and specify validation
const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
});

// 2. Create a model using the previous created schema
// convention using upper case for models
const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
