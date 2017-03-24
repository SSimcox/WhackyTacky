/**
 * Created by Steven on 3/23/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app)
var io = require('./routes/io')(server)

//var exampleRoute = require('./routes/exampleRoute');


app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('/views', __dirname + '/views');


//app.use('/example', exampleRoute);


app.get('/', function (req, res) {
 res.sendFile(__dirname + '/views/index.html')
});

server.listen(3000, function () {
  console.log("Listening on 3000")
});