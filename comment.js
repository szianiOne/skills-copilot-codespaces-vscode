// Create a web server for comments

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body-parser middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create an array to store the comments
let comments = [];

// Create a route to get all the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route to add a new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json(newComment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Run the server and send a POST request to add a new comment
// Use curl to send a POST request
// $ curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "message": "Hello, World!"}' http://localhost:3000/comments
// {"name":"John","message":"Hello, World!"}

// Use curl to send a GET request
// $ curl http://localhost:3000/comments
// [{"name":"John","message":"Hello, World!"}]