// Core modules
const fs = require('fs');

// Setup Express
const express = require('express');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ status: 'success', data: { tours } });
});

// Start the server
const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
