const fs = require('fs');

// Routes Handler Functions

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

// Note: Commented out because 'users' array not yet exist
// exports.checkID = (req, res, next, val) => {
//   if (val > users.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
// };

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
