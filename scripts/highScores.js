/**
 * Created by Steven on 4/26/2017.
 */

var route = require('express').Router()
var fs = require('fs')

var file = 'highScores.json'

route.get('/highScores',function(req,res) {
  console.log("High Scores Get")
  fs.exists(file, function (exists) {
    if (exists) {
      fs.readFile(file, function (err, data) {
        var headers = {'Content-type': 'application/json'};
        if (err) {
          res.writeHead(500);
          res.end('Server Error!');
        } else {
          console.log("Sending Data:",data.toString())
          // res.writeHead(200, headers);
          console.log(typeof data)
          res.json(data);
        }
      });
    } else {
      res.writeHead(200);
      res.end();
    }
  })
})

route.post('/highScores', function(req,res){
  console.log("High Scores Post")
  var scores = []
  fs.exists(file, function(exists){
    if(exists){
      fs.readFile(file, function(err,data){
        if(err){
          console.log("Error Thrown")
          res.writeHead(500);
          res.end('Server Error!');
        }else{
          scores = JSON.parse(data)
          scores.push({name:req.body.name, score: req.body.score})
          fs.writeFile(file, JSON.stringify(scores),function(err){
            if(err){
              console.log(err)
              res.writeHead(500);
              res.end('Server Error!');
            }else{
              res.writeHead(200)
              res.end()
            }
          })
        }
      })
    }else{
      scores.push({name: req.body.name, score: req.body.score})
      fs.writeFile(file, JSON.stringify(scores),function(err){
        if(err){
          console.log(err)
          res.writeHead(500);
          res.end('Server Error!');
        }else{
          res.writeHead(200)
          res.end()
        }

      })
    }
  })

})

module.exports = route