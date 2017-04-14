// ------------------------------------------------------------------
//
// This namespace holds the animated spritesheet demo model.
//
// ------------------------------------------------------------------
Demo.model = (function(input, components) {
	'use strict';
	var players = [
	  {
			buildTowers: [],
      towers: [],
      creeps: [],
			map: [],
      money: 0
    },
    {
			buildTowers: [],
      towers: [],
      creeps: [],
			map: [],
      money: 0
    }],
		myKeyboard = input.Keyboard(),
		myMouse = input.Mouse(),
		gameCommands = input.GameCommands(myMouse, myKeyboard),
    socket,
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
		// players[0].towers.push(components.Charmander({
    //   spriteCenter: { x: 500, y: 500 },
		// }))
    // players[0].towers.push(components.Bulbasaur({
    //   spriteCenter: {x: 250, y : 500}
    // }))
    // players[0].towers.push(components.Squirtle({
    //   spriteCenter: {x: 750, y : 500}
    // }))
		players[0].buildTowers.push(components.BulbasaurHover({
			imageCenter: {x:50, y: 950}
		}))
		players[0].buildTowers.push(components.SquirtleHover({
			imageCenter: {x:150, y: 950}
		}))
		players[0].buildTowers.push(components.CharmanderHover({
			imageCenter: {x:250, y: 950}
		}))

		for(let i = 0; i < 16; ++ i){
			players[0].map.push([]);
			players[1].map.push([]);
			for(let j = 0; j < 20; ++j){
				players[0].map[i].push(-1);
				players[1].map[i].push(-1);
			}
		}

		myKeyboard.registerCommand(KeyEvent.DOM_VK_1, gameCommands.buildTower1)
		myKeyboard.registerCommand(KeyEvent.DOM_VK_2, gameCommands.buildTower2)
		myKeyboard.registerCommand(KeyEvent.DOM_VK_3, gameCommands.buildTower3)

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
		let build = gameCommands.buildTower(myMouse);
		if(build) buildTower(build.type, build.x, build.y)
	};

	function buildTower(type, x1, y1){
		gameCommands.getKeyCommands();
		if(type === "Bulbasaur"){
			players[0].towers.push(components.Bulbasaur({
				spriteCenter: {x:x1, y:y1}
			}))
		}else if(type === "Squirtle"){
			players[0].towers.push(components.Squirtle({
				spriteCenter: {x:x1, y:y1}
			}))
		}else if(type === "Charmander"){
			players[0].towers.push(components.Charmander({
				spriteCenter: {x:x1, y:y1}
			}))
		}



		socket.emit('event', {game:room, event: 'build', type: type, center: {x:x1, y:y1}, player: socket.id})
	}

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
			for (let i = 0; i < players[p].buildTowers.length; i++) {
        players[p].buildTowers[i].update(elapsedTime)
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
		renderer.core.drawRectangle('rgba(200, 255, 200, 1)', 0, 0, 1000, 1000, false);
		if(myMouse.buildSelected()){
		  for(let i = 2; i < 18; i++){
		    for(let j = 0; j < 20; j++){
		      renderer.core.drawRectangle('rgba(0,0,0,1)', j * 50, i * 50, 50, 50)
        }
      }
    }

		for(let p = 0; p < players.length; ++p) {
      for (let i = 0; i < players[p].towers.length; i++) {
        renderer.Tower.render(players[p].towers[i])
      }
      for (let i = 0; i < players[p].creeps.length; i++) {
        renderer.Creep.render(players[p].creeps[i])
      }
			for(let i = 0; i < players[p].buildTowers.length; i++){
				renderer.TowerHover.render(players[p].buildTowers[i])
			}
    }

	};

  that.setSocket = function(s){
    socket = s;
  }

	return that;

}(Demo.input, Demo.components, Demo.assets));
