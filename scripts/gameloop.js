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
  that.initialTime = 0
  that.latencies={}
  that.latencies[player1] = []
  that.latencies[player2] = []
  var loopTimes = []

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
    if(timeSinceLastSend > 100 || sendUpdate){
      emit()
      timeSinceLastSend = 0
      model.cleanseModel()
      //console.log((present() - startTime)/1000)
    }

    loopTimes.push(present()-currentTime)


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
    that.initialTime = present()
    var send = message ? message : JSON.stringify(model.getModel())
    io.to(player1).emit('update', send)
    // console.log("Player 1 Latency:",averageLatencies(that.latencies[player1]))
    // console.log("Player 2 Latency:",averageLatencies(that.latencies[player2]))
    // console.log("Average Time for loop:", averageLatencies(loopTimes))
  }

  that.GameOver = function(){
    gameOver = true
  }

  function averageLatencies(times){
    if (times.length > 50) {
      times = times.slice(1);
      return times.reduce(function (a, b) {
          return a + b;
        }) / times.length;
    }
  }

  return that;
}

function present(){
  var time = process.hrtime();
  return time[0]*1000 + time[1]/1000000
}
