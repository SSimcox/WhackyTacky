/**
 * Created by Steven on 3/23/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app)
var io = require('./scripts/io')(server)
var port = process.env.PORT || 3000
var http = require('http'),
  path = require('path'),
  fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css'
};

var highScores = require('./scripts/highScores');


app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('/views', __dirname + '/views');


//app.use('/example', exampleRoute);
app.use(highScores)

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/views/index.html')
});

function handleRequest(req, res, next) {
  if(req.url === '/') return next();
  var lookup = decodeURI(req.url),
    file = lookup.substring(1, lookup.length);

  console.log('req: ' + req.url);
  fs.exists(file, function(exists) {
    if (exists) {
      console.log('Trying to send: ' + lookup);
      fs.readFile(file, function(err, data) {
        var headers = { 'Content-type': mimeTypes[path.extname(lookup)] };

        if (err) {
          res.writeHead(500);
          res.end('Server Error!');
        } else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    } else {
      console.log('Failed to find/send: ' + lookup);
      res.writeHead(404);
      res.end();
    }
  });
}



server.listen(port, function () {
  console.log("Listening on 3000")
});

// http.createServer(handleRequest).listen(3000, function() {
//   console.log('Server is listening on port 3000');
// });