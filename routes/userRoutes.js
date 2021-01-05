const express = require('express');
const userController = require('../controllers/userController');

// Router setup and export
const router = express.Router();

// Param middleware
// Note: Commented out because 'users' array not yet exist
// router.param('id', (req, res, next, val) => {
//   // console.log('Tour id is:' + `${val}`);

//   // ID Validation check
//   userController.checkID(req, res, next, `${val}`);

//   next();
// });

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
