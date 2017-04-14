/**
 * Created by Steven on 3/23/2017.
 */


module.exports = function(app) {
  let io = require('socket.io')(app)
  let Game = require('./gameloop.js')
  let connections = {}
  let pendingGames = []
  let activeGames = {}
  let initialTime

  //-------------------------------------------------------------------------
  //
  // Sets up socket connections
  //
  //-------------------------------------------------------------------------
  io.on('connection', function(socket){
    connections[socket.id] = socket
    connections[socket.id].myRooms = {}
    connections[socket.id].myRooms[socket.id] = socket.id
    io.to(socket.id).emit('list games', pendingGames)

    //-----------------------------------------------------------------------
    //
    // Recieves an input request from the
    //
    //-----------------------------------------------------------------------
    socket.on('change color', function(color){
      initialTime = present()
      let arr = []
      for(let i = 0; i < 10000; i++){
        arr.push(i)
      }
      socket.broadcast.to(color.id).emit('change color', {color: color.colorString,arr:arr})
    })

    /*****************************************
     *                                       *
     * Does Latency Work
     *                                       *
     *****************************************/
    socket.on('send ping', function(data){
      console.log('latency: ', (present() - initialTime))
    })

    /*****************************************
     *                                       *
     * Requests a room be made
     *                                       *
     *****************************************/
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
    })

    /*****************************************
     *                                       *
     * Client Request to join a game
     *                                       *
     *****************************************/
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
      let g = Game(id,socket.id,io)
      activeGames[id] = g
      g.startGame()
    })

    /*****************************************
     *                                       *
     * Sets event listener for gameplay
     *                                       *
     *****************************************/
    socket.on('event', function(data){
      activeGames[data.game].addEvent(data)
    })
    /*****************************************
     *                                       *
     * On Disconnect we boot everyone
     * from the rooms they are in
     *                                       *
     *****************************************/
    socket.on('disconnect', function(){
      for(let i = 0; i < pendingGames.length; i++) {
        if (pendingGames[i].id == socket.id){
          pendingGames.splice(i, 1)
          io.emit('list games', pendingGames)
          break
        }
      }

      for(let key in connections[socket.id].myRooms){
        if(activeGames[key]) activeGames[key].GameOver()
        io.to(key).emit('player left')
      }
      delete connections[socket.id]
    })
  })

  return io
}

function present(){
  var time = process.hrtime();
  return time[0]*1000 + time[1]/1000000
}