/**
 * Created by Steven on 4/12/2017.
 */

module.exports = function(player1, player2, io){
  var model = require('./model.js')(player1,player2)
  var timeSinceLastSend = 2000
  var previousTime
  var startTime
  var that = {}
  var events = []
  var gameOver = false

  that.startGame = function(){
    model.initialize()
    previousTime = present()
    startTime = present()
    setTimeout(function(){
      gameLoop(present())
    },15)
  }

  function gameLoop(currentTime){
    var elapsedTime = currentTime - previousTime
    var sendUpdate = model.processEvents(events, emit)
    model.update(elapsedTime)
    previousTime = currentTime

    timeSinceLastSend += elapsedTime
    if(timeSinceLastSend > 2000 || sendUpdate){
      emit()
      timeSinceLastSend = 0
      //console.log((present() - startTime)/1000)
    }

    if(!gameOver) {
      setTimeout(function () {
        gameLoop(present())
      }, 15)
    }
  }

  that.addEvent = function(data){
    events.push(data)
  }

  function emit(message){
    var send = message || model.getModel()
    io.to(player1).emit('update', send)
  }

  that.GameOver = function(){
    gameOver = true
  }

  return that;
}

function present(){
  var time = process.hrtime();
  return time[0]*1000 + time[1]/1000000
}
