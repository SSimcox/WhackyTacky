// ------------------------------------------------------------------
//
// This namespace holds the animated spritesheet demo model.
//
// ------------------------------------------------------------------
Demo.model = (function(input, components) {
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

		//
		// Get our animated bird model and renderer created
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

	// ------------------------------------------------------------------
	//
	// This function renders the demo model.
	//
	// ------------------------------------------------------------------
	that.render = function(renderer) {

		//
		// Draw a border around the unit world.
		renderer.core.drawRectangle('rgba(255, 255, 255, 1)', 0, 0, 1, 1);


		for(let p = 0; p < players.length; ++p) {
      for (let i = 0; i < players[p].towers.length; i++) {
        renderer.Tower.render(players[p].towers[i])
      }
      for (let i = 0; i < players[p].creeps.length; i++) {
        renderer.Creep.render(players[p].creeps[i])
      }
    }

	};

	return that;

}(Demo.input, Demo.components, Demo.assets));
