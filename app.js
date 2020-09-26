// Setup Express
const express = require('express');
const app = express();

// Start a server
const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Routes
app.get('/', (req, res) => {
  // .send => string only
  // .json => return a JSON object
  res.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint ...');
});
