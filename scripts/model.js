/**
 * Created by Steven on 4/12/2017.
 */

let Events = require('./Events')

module.exports = function(player1, player2){
  'use strict';
  let players = {}
  players[player1] = {
    towers: [],
    creeps: [],
    map: [],
    money: 15,
    income: 1
  }
  players[player2] = {
    towers: [],
    creeps: [],
    map: [],
    money: 15,
    income: 1
  }

  let that = {};

  // ------------------------------------------------------------------
  //
  // This function initializes the input demo model.  Only thing it
  // does right now is to register the resize event with the renderer.
  //
  // ------------------------------------------------------------------
  that.initialize = function() {

    for(let i = 0; i < 16; i++){
      players[player1].map.push([])
      players[player2].map.push([])
      for(let j = 0; j < 20; j++){
        players[player1].map[i].push(-1)
        players[player2].map[i].push(-1)
      }
    }

    //Example of how upgrading could work
    // towers[i] = components.Charmeleon({
    //   center: towers[i].center,
    //   exp: towers[i].exp
    // })
  };

  // ------------------------------------------------------------------
  //
  // Process all input for the model here.
  //
  // ------------------------------------------------------------------
  that.processEvents = function(events, emit){
    var sendUpdate = false
    while(events.length > 0){
      var event = events.shift()
      if(event.player == player1)
        event.opponent = players[player2]
      else
        event.opponent = players[player1]
      event.player = players[event.player]
      var success = Events.process(event,emit)
      if(success) sendUpdate = true
    }
    return sendUpdate
  }

  // ------------------------------------------------------------------
  //
  // This function is used to update the state of the demo model.
  //
  // ------------------------------------------------------------------
  that.update = function(elapsedTime) {
    for(let key in players) {
      if(players.hasOwnProperty(key)) {
        for (let i = 0; i < players[key].towers.length; i++) {
          players[key].towers[i].update(elapsedTime)
        }
        for (let i = 0; i < players[key].creeps.length; i++) {
          players[key].creeps[i].update(elapsedTime)
        }
      }
    }
  };

  that.getModel = function(){
    return players
  }

  return that;
}
