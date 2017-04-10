/**
 * Created by Steven on 3/23/2017.
 */


module.exports = function(app) {
  let io = require('socket.io')(app)
  let connections = {}
  let pendingGames = []
  let activeGames = []

  io.on('connection', function(socket){
    connections[socket.id] = socket
    connections[socket.id].myRooms = {}
    connections[socket.id].myRooms[socket.id] = socket.id
    io.to(socket.id).emit('list games', pendingGames)

    socket.on('change color', function(color){
      socket.broadcast.to(color.id).emit('change color', color.colorString)
      console.log(color)
    })

    socket.on('request room', function(roomName){
      var add = true
      for (var i = 0; i < pendingGames.length; i++) {
        if (pendingGames[i].id === socket.id) {
          add = false
        }
      }
      if(add) {
        pendingGames.push({id: socket.id, name: roomName})
        io.emit('list games', pendingGames)
      }
      console.log(pendingGames.length)
    })

    socket.on('join game', function(id){
      socket.join(id)
      connections[socket.id].myRooms[id] = id
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
      for(let i = 0; i < pendingGames.length; i++) {
        if (pendingGames[i].id == socket.id){
          pendingGames.splice(i, 1)
          io.emit('list games', pendingGames)
          break
        }
      }
      console.log("Disconnect Called")
      console.log(connections[socket.id].myRooms)
      for(let key in connections[socket.id].myRooms){
        console.log(key)
        io.to(key).emit('player left')
      }
      delete connections[socket.id]
    })
  })

  return io
}