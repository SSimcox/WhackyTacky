/**
 * Created by Steven on 4/12/2017.
 */


module.exports = function(){
  'use strict';
  var players = [
      {
        towers: [],
        creeps: [],
        money: 0
      },
      {
        towers: [],
        creeps: [],
        money: 0
      }],
    myKeyboard = input.Keyboard(),
    that = {};

  // ------------------------------------------------------------------
  //
  // This function initializes the input demo model.  Only thing it
  // does right now is to register the resize event with the renderer.
  //
  // ------------------------------------------------------------------
  that.initialize = function() {

    players[0].towers.push(components.Charmander({
      spriteCenter: { x: 500, y: 500 },
    }))
    players[0].towers.push(components.Bulbasaur({
      spriteCenter: {x: 250, y : 500}
    }))
    players[0].towers.push(components.Squirtle({
      spriteCenter: {x: 750, y : 500}
    }))

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
    }
  };

  return that;
}