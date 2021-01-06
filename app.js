// Import Express
const express = require('express');
const app = express();

// Import 3rd party middleware
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Import routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware declarations

app.use(express.json());
console.log(__dirname);
app.use(express.static('public'));

// Mount the custom router (Using middleware to connect the custom router to the app)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// 63.18
