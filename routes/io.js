/**
 * Created by Steven on 3/23/2017.
 */


module.exports = function(app) {
  let io = require('socket.io')(app)
  let connections = {}

  io.on('connection', function(socket){
    console.log(`Socket: ${socket.id}`);
    connections[socket.id] = socket
    console.log(`Number of Clients: ${Object.keys(connections).length}`)

    socket.on('change color', function(color){
      socket.broadcast.emit('change color', color)
      console.log(color)
    })

    socket.on('disconnect', function(){
      delete connections[socket.id]
      console.log(`Deleted ${socket.id}\n Number of Clients:  ${Object.keys(connections).length}`)
    })
  })

  return io
}

