const mongoose = require('mongoose');
const slugify = require('slugify');

// 1. Specify Mongoose schema and specify validation
const tourScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be lower or equal 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // 'this' only points to current document on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
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
      select: false, // exclude from response to client, useful to hide sensitive data
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property, they do not presist in DB
tourScheme.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document Middleware
// Runs before .save() and .create() ... not insertMany() or findByIdAndUpdate()
tourScheme.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

// tourScheme.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// Query Middleware
// ^find = all strings start with "find" = find*
tourScheme.pre(/^find/, function (next) {
  // this = query object
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();

  next();
});

tourScheme.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} millisecond!`);
  // console.log(docs);
  next();
});

// Aggregation Middleware
// eslint-disable-next-line prefer-arrow-callback
tourScheme.pre('aggregate', function (next) {
  // this.pipeline() = aggregation object

  // Remove from the pipeline, all documents with secretTour: true
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

// 2. Create a model using the previous created schema
// convention using upper case for models
const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
