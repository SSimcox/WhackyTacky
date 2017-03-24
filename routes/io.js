/**
 * Created by Steven on 3/23/2017.
 */


module.exports = function(app) {
  let io = require('socket.io')(app)
  io.on('connection', function(socket){
    console.log("Socket: ", socket);
    socket.on('change color', function(color){
      socket.broadcast.emit('change color', color)
    })
  })
  return io
}