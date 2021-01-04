// Import Express
const express = require('express');
const app = express();

// Import 3rd party middleware
const morgan = require('morgan');

// Import routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


// Middleware declarations
app.use(morgan('dev'));
app.use(express.json());

// Mount the custom router (Using middleware to connect the custom router to the app)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// 57.17
