const express = require('express');
const tourController = require('../controllers/tourController');

// Router setup
const router = express.Router();

// ID validation check (via param middleware)
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addTour);

router
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.patchTourByID)
  .delete(tourController.deleteTour);

module.exports = router;
