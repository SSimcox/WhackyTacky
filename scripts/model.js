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

  let myKeyboard = input.Keyboard(),
    that = {};

  // ------------------------------------------------------------------
  //
  // This function initializes the input demo model.  Only thing it
  // does right now is to register the resize event with the renderer.
  //
  // ------------------------------------------------------------------
  that.initialize = function() {

    for(let i = 0; i < 14; i++){
      players[0].map.push([])
      players[1].map.push([])
      for(let j = 0; j < 20; j++){
        players[0].map[i].push('open')
        players[1].map[i].push('open')
      }
    }

    Events.AddTower({
      type: 'Charmander',
      center: {x: 500, y: 500},
      player: players[player1].towers
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
  that.processInput = function(elapsedTime) {
    myKeyboard.update(elapsedTime);
  };

  // ------------------------------------------------------------------
  //
  // This function is used to update the state of the demo model.
  //
  // ------------------------------------------------------------------
  that.update = function(elapsedTime) {
    for(let p = 0; p < players.length; ++p) {
      for (let i = 0; i < players[p].towers.length; i++) {
        players[p].towers[i].update(elapsedTime)
      }
      for (let i = 0; i < players[p].creeps.length; i++) {
        players[p].creeps[i].update(elapsedTime)
      }
      for(let i = 0; i < players[p].buildTowers.length; i++){
				//does nothing
			}
    }
  };

  return that;
}
