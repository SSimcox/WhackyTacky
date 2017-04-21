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
    path,
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
    players = [
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
      }]

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
    path = setPath(players[0])
		myKeyboard.changeCommands(gameCommands);

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
		// if(type === "Bulbasaur"){
		// 	players[0].towers.push(components.Bulbasaur({
		// 		spriteCenter: {x:x1, y:y1}
		// 	}))
		// }else if(type === "Squirtle"){
		// 	players[0].towers.push(components.Squirtle({
		// 		spriteCenter: {x:x1, y:y1}
		// 	}))
		// }else if(type === "Charmander"){
		// 	players[0].towers.push(components.Charmander({
		// 		spriteCenter: {x:x1, y:y1}
		// 	}))
		// }
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
		// renderer.core.drawRectangle('rgba(200, 255, 200, 1)', 0, 0, 1000, 1000, false,0);
    // renderer.core.drawRectangle('rgba(200, 255, 200, 1)', 0, 0, 1000, 1000, false,1);
    // renderer.core.drawRectangle('rgba(200, 200, 50, 1)', 0, 100, 1000, 750, false,0);
    // renderer.core.drawRectangle('rgba(200, 200, 50, 1)', 0, 100, 1000, 750, false,1);
    drawBackground(renderer)
    // renderer.core.drawRectangle('rgba(200, 50, 50, 1)', 0, 850, 1000, 50, false,0);
    // renderer.core.drawRectangle('rgba(200, 50, 50, 1)', 0, 850, 1000, 50, false,1);

    // Draws Current Shortest Path from bottom left corner
     for(let i = 0; i < path.length; i++){
       renderer.core.drawRectangle('rgba(0,200,50,.5)',path[i].x*50,(path[i].y + 2)*50,40,40,false,0)
     }


		if(myMouse.buildSelected()){
		  for(let i = 2; i < 17; i++){
		    for(let j = 0; j < 20; j++){
		      renderer.core.drawRectangle('rgba(0,0,0,1)', j * 50, i * 50, 50, 50,true,0)
        }
      }
    }

		for(let p = 0; p < players.length; ++p) {
      for (let i = 0; i < players[p].towers.length; i++) {
        renderer.Tower.render(players[p].towers[i],p)
      }
      for (let i = 0; i < players[p].creeps.length; i++) {
        renderer.Creep.render(players[p].creeps[i],p)
      }
			for(let i = 0; i < players[p].buildTowers.length; i++){
				renderer.TowerHover.render(players[p].buildTowers[i],p)
			}
    }

	};

	that.diffModels = function(serverModel){
	  var p = 0;
	  var built = false
	  for(var key in serverModel){
	    if(serverModel.hasOwnProperty(key)){
        if(socket.id == key) p = 0
        else p = 1
        for(let i = 0; i < serverModel[key].towers.length; i++){
          if(!players[p].towers[i] || players[p].towers[i].type != serverModel[key].towers[i].type){
            if(serverModel[key].towers[i].type === "deleted"){
              players[p].towers[i] = {type: "deleted"}
            }
            else {
              players[p].towers[i] = createTowerFromServer(serverModel[key].towers[i])
              if(p == 0) built = true
            }
          }
        }
        while(players[p].towers.length > serverModel[key].towers.length) {
          players[p].towers.splice(players[p].towers.length - 1, 1)
        }
        players[p].map = serverModel[key].map
      }
    }
    if(built)
      path = setPath(players[0])
  }

  function createTowerFromServer(tower){
	  return components[tower.type]({
	    spriteCenter: tower.center
    })
  }

  function drawBackground(renderer){
    //draw top row of grass/dirt
    renderer.core.drawImage(Demo.assets['dirt'],0,0,32,32,0,100,50,50,0)
    renderer.core.drawImage(Demo.assets['dirt'],0,0,32,32,0,100,50,50,1)
    for(let j = 1; j < 19; j++){
      renderer.core.drawImage(Demo.assets['dirt'],32,0,32,32,j*50,100,50,50,0)
      renderer.core.drawImage(Demo.assets['dirt'],32,0,32,32,j*50,100,50,50,1)
    }
    renderer.core.drawImage(Demo.assets['dirt'],64,0,32,32,950,100,50,50,0)
    renderer.core.drawImage(Demo.assets['dirt'],64,0,32,32,950,100,50,50,1)

    // draw middle of grass/dirt
    for(let i = 3; i < 16; i++){
      renderer.core.drawImage(Demo.assets['dirt'],0,32,32,32,0,(i*50),50,50,0)
      renderer.core.drawImage(Demo.assets['dirt'],0,32,32,32,0,(i*50),50,50,1)
      for(let j = 1; j < 19; j++){
        renderer.core.drawImage(Demo.assets['dirt'],32,32,32,32,j*50,(i*50),50,50,0)
        renderer.core.drawImage(Demo.assets['dirt'],32,32,32,32,j*50,(i*50),50,50,1)
      }
      renderer.core.drawImage(Demo.assets['dirt'],64,32,32,32,950,(i*50),50,50,0)
      renderer.core.drawImage(Demo.assets['dirt'],64,32,32,32,950,(i*50),50,50,1)
    }

    //draw bottom row of grass/dirt
    renderer.core.drawImage(Demo.assets['dirt'],0,64,32,32,0,800,50,50,0)
    renderer.core.drawImage(Demo.assets['dirt'],0,64,32,32,0,800,50,50,1)
    for(let j = 1; j < 19; j++){
      renderer.core.drawImage(Demo.assets['dirt'],32,64,32,32,j*50,800,50,50,0)
      renderer.core.drawImage(Demo.assets['dirt'],32,64,32,32,j*50,800,50,50,1)
    }
    renderer.core.drawImage(Demo.assets['dirt'],64,64,32,32,950,800,50,50,0)
    renderer.core.drawImage(Demo.assets['dirt'],64,64,32,32,950,800,50,50,1)

    // Draw "landing dirt" for creeps
    renderer.core.drawImage(Demo.assets['loadingdirt'],0,0,32,32,0,850,50,50,0)
    renderer.core.drawImage(Demo.assets['loadingdirt'],0,0,32,32,0,850,50,50,1)
    for(let j = 1; j < 19; j++){
      renderer.core.drawImage(Demo.assets['loadingdirt'],32,0,32,32,j*50,850,50,50,0)
      renderer.core.drawImage(Demo.assets['loadingdirt'],32,0,32,32,j*50,850,50,50,1)
    }
    renderer.core.drawImage(Demo.assets['loadingdirt'],64,0,32,32,950,850,50,50,0)
    renderer.core.drawImage(Demo.assets['loadingdirt'],64,0,32,32,950,850,50,50,1)


    // Draw Background grass at top under building and fences
    renderer.core.drawImage(Demo.assets['bggrass'],0,0,32,32,0,0,50,50,0)
    renderer.core.drawImage(Demo.assets['bggrass'],0,0,32,32,0,0,50,50,1)
    renderer.core.drawImage(Demo.assets['bggrass'],0,64,32,32,0,50,50,50,0)
    renderer.core.drawImage(Demo.assets['bggrass'],0,64,32,32,0,50,50,50,1)
    for(let j = 1; j < 19; j++){
      renderer.core.drawImage(Demo.assets['bggrass'],32,0,32,32,j*50,0,50,50,0)
      renderer.core.drawImage(Demo.assets['bggrass'],32,0,32,32,j*50,0,50,50,1)
      renderer.core.drawImage(Demo.assets['bggrass'],32,64,32,32,j*50,50,50,50,0)
      renderer.core.drawImage(Demo.assets['bggrass'],32,64,32,32,j*50,50,50,50,1)
    }
    renderer.core.drawImage(Demo.assets['bggrass'],64,0,32,32,950,0,50,50,0)
    renderer.core.drawImage(Demo.assets['bggrass'],64,0,32,32,950,0,50,50,1)
    renderer.core.drawImage(Demo.assets['bggrass'],64,64,32,32,950,50,50,50,0)
    renderer.core.drawImage(Demo.assets['bggrass'],64,64,32,32,950,50,50,50,1)


    // Draw fences
    for(let i = 0; i < 10; i++){
      renderer.core.drawImage2({image: Demo.assets['fence']},i*100,50,100,50,0)
      renderer.core.drawImage2({image: Demo.assets['fence']},i*100,50,100,50,1)
    }

    // Draw building
    renderer.core.drawImage2({image:Demo.assets['bluebuilding']},382,-28,324,128,0)
    renderer.core.drawImage2({image:Demo.assets['redbuilding']},382,-28,324,128,1)


  }

  that.setSocket = function(s){
    socket = s;
  }

	return that;

}(Demo.input, Demo.components, Demo.assets));
