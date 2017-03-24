/**
 * Created by Steven on 3/23/2017.
 */


module.exports = function(app) {
  let io = require('socket.io')(app)
  let connections = {}
  let pendingGames = []

  io.on('connection', function(socket){
    connections[socket.id] = socket

    io.to(socket.id).emit('list games', pendingGames)

    socket.on('change color', function(color){
      socket.broadcast.to(color.id).emit('change color', color.colorString)
      console.log(color)
    })

    socket.on('request room', function(roomName){
      pendingGames.push({id: socket.id, name: roomName})
      io.emit('list games', pendingGames)
    })

    socket.on('join game', function(id){
      socket.join(id)
      for(let i = 0; i < pendingGames.length; i++) {
        if (pendingGames[i].id == id){
          pendingGames.splice(i, 1)
          break
        }
      }
      io.emit('list games', pendingGames)
      io.to(id).emit('start game', id)
    })

    socket.on('disconnect', function(){
      delete connections[socket.id]
    })
  })

  return io
}

