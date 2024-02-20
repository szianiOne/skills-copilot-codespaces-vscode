// Create a web server for comments
// To run this file, execute the following command in the terminal:
// node comments.js
// Open a browser and type the following URL:
// http://localhost:3000/

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log('Request for ' + pathname + ' received.');
  if (pathname === '/comments') {
    if (req.method === 'GET') {
      fs.readFile('comments.json', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
      });
    } else if (req.method === 'POST') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk.toString();
      });
      req.on('end', function() {
        var comment = qs.parse(body);
        fs.readFile('comments.json', function(err, data) {
          var comments = JSON.parse(data);
          comments.push(comment);
          fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(comments));
            res.end();
          });
        });
      });
    }
  }
}
).listen(3000);