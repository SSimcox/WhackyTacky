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
    money: 0
  }
  players[player2] = {
    towers: [],
    creeps: [],
    map: [],
    money: 0
  }

  let that = {};

  // ------------------------------------------------------------------
  //
  // This function initializes the input demo model.  Only thing it
  // does right now is to register the resize event with the renderer.
  //
  // ------------------------------------------------------------------
  that.initialize = function() {

    for(let i = 0; i < 14; i++){
      players[player1].map.push([])
      players[player2].map.push([])
      for(let j = 0; j < 20; j++){
        players[player1].map[i].push('open')
        players[player2].map[i].push('open')
      }
    }

    Events.AddTower({
      type: 'Charmander',
      center: {x: 500, y: 500},
      player: players[player1].towers,
      map: players[player1].towers
    })

    Events.AddTower({
      type: 'Bulbasaur',
      center: {x: 250, y: 500},
      player: players[player1].towers
    })

    Events.AddTower({
      type: 'Squirtle',
      center: {x: 750, y: 500},
      player: players[player2].towers
    })

    //Example of how upgrading could work
    // towers[i] = components.Charmeleon({
    //   center: towers[i].center,
    //   exp: towers[i].exp
    // })

    // myKeyboard.registerHandler(function(elapsedTime) {
    // 		birdLittle.moveForward(elapsedTime);
    // 	},
    // 	input.KeyEvent.DOM_VK_W, true);
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
      event.player = players[event.player]
      if(Events.process(event, emit)) sendUpdate = true
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
