// ------------------------------------------------------------------
//
// This namespace holds the animated spritesheet demo model.
//
// ------------------------------------------------------------------
Demo.model = (function(input, components, audio) {
	'use strict';
	var players = [],
		myKeyboard = input.Keyboard(),
		myMouse = input.Mouse(),
		gameCommands = input.GameCommands(myMouse, myKeyboard),
    socket,
    diffed,
		that = {};

	players[0] = Player()
  players[1] = Player()
	let myMoney = components.Text({
    text : players[0].money,
    font : '30px Oswald, sans-serif',
    fill : 'rgba(0, 0, 255, 1)',
    position : { x : 50, y : 5 }
  }),
    myIncome = components.Text({
    text : players[0].income,
    font : '30px Oswald, sans-serif',
    fill : 'rgba(0, 0, 255, 1)',
    position : { x : 175, y : 5 }
  }),
    nextIncome = components.Text({
    text : "in " + 7 +" sec",
    font : '30px Oswald, sans-serif',
    fill : 'rgba(0, 0, 255, 1)',
    position : { x : 225, y : 5 }
  }),
    gameTime = components.Text({
    text : "Time Elapsed: " + 0 + ":00",
    font : '30px Oswald, sans-serif',
    fill : 'rgba(0, 0, 255, 1)',
    position : { x : 5, y : 5 }
  })

	let gameVars = {
    totalTime: 0,
    lastIncome: 0,
    gameOver: false,
    gamePaused: false,
    gameStarts: 3000
  }
  let paths = []

	var hover;
	var imageHovering = false;
	var towerToEvolve;
	var upgrading = false;
	var location;

	// ------------------------------------------------------------------
	//
	// This function initializes the input demo model.  Only thing it
	// does right now is to register the resize event with the renderer.
	//
	// ------------------------------------------------------------------
	that.initialize = function() {

    players[0] = Player()
    players[1] = Player()

		players[0].buildTowers.push(components.BulbasaurHover({
			imageCenter: {x:50, y: 950}
		}))
		players[0].buildTowers.push(components.CharmanderHover({
			imageCenter: {x:150, y: 950}
		}))
    players[0].buildTowers.push(components.SquirtleHover({
      imageCenter: {x:250, y: 950}
    }))
		players[1].sendCreeps.push(components.BikerHover({
			imageCenter: {x:250, y: 950}
		}))
		players[1].sendCreeps.push(components.EyepatchHover({
			imageCenter: {x: 350, y: 950}
		}))
		players[1].sendCreeps.push(components.RocketMHover({
			imageCenter: {x: 50, y: 950}
		}))
		players[1].sendCreeps.push(components.ScientistHover({
			imageCenter: {x: 150, y: 950}
		}))



		for(let i = 0; i < 16; ++ i){
			players[0].map.push([]);
			players[1].map.push([]);
			for(let j = 0; j < 20; ++j){
				players[0].map[i].push(-1);
				players[1].map[i].push(-1);
			}
		}
		myKeyboard.changeCommands(gameCommands);


    components.TowerData.load()

    //Example of how upgrading could work
    // towers[i] = components.Charmeleon({
    //   center: towers[i].center,
    //   exp: towers[i].exp
    // })

		// myKeyboard.registerHandler(function(elapsedTime) {
		// 		birdLittle.moveForward(elapsedTime);
		// 	},
		// 	input.KeyEvent.DOM_VK_W, true);

    audio.playSound('/audio/song1')
	};

	// ------------------------------------------------------------------
	//
	// Process all input for the model here.
	//
	// ------------------------------------------------------------------
	that.processInput = function(elapsedTime) {
		myKeyboard.update(elapsedTime);
		let build = gameCommands.buildTower(myMouse);
		let wave = gameCommands.sendCreeps(myMouse);
		location = gameCommands.evolveTowerSelection(myMouse);
		if(location){
			selectTowerToEvolve(location);
		}
		if(build || wave){
			if(build) buildTower(build.type, build.x, build.y);
			if(wave) sendCreeps(wave.type, wave.x, wave.y);
		}else if(towerToEvolve){
			// do we want to evolve it?
			upgrading = gameCommands.evolveTower(myMouse);
			// upgrading = gameCommands.evolveTowerKeyboard(myMouse)

			if(upgrading){// || gameCommands.evolveTowerKey()){
				console.log('upgrading Tower')
				upgradeTower(towerToEvolve)
			}
		}
		resetHover();
		buildingHovering();
		mouseHovering();
	};

	function resetHover(){
		if(!myMouse.buildSelected() || !myMouse.creepSelected() && imageHovering){
			hover = null;
			imageHovering = false;
		}
	}

	function buildingHovering(){
		if(myMouse.buildSelected() && !imageHovering){
			let t = gameCommands.hoverTower();
			imageHovering = true;
			document.getElementById('my-canvas').className += "no-cursor"
			if(t.type === "Bulbasaur"){
				hover = components.BulbasaurHover({
					imageCenter: {x:t.x, y:t.y},
					range: components.TowerData[t.type].attack.range
				})
			}else if(t.type === "Squirtle"){
				hover = components.SquirtleHover({
					imageCenter: {x:t.x, y:t.y},
          range: components.TowerData[t.type].attack.range
				})
			}else if(t.type === "Charmander"){
				hover = components.CharmanderHover({
					imageCenter: {x:t.x, y:t.y},
          range: components.TowerData[t.type].attack.range
				})
			}
			hover.cost.text = ''
      hover.hotkey.text = ''
		}
	}

	function mouseHovering(){
		if(myMouse.creepSelected() && !imageHovering){
			let t = gameCommands.hoverTower();
			imageHovering = true;
			document.getElementById('your-canvas').className += "no-cursor"
			if(t.type === "Biker"){
				hover = components.BikerHover({
					imageCenter: {x:t.x, y:t.y},
					imageSize: {width: 48, height: 48}
				})
			}else if(t.type === "Eyepatch"){
				hover = components.EyepatchHover({
					imageCenter: {x:t.x, y:t.y},
					imageSize: {width: 48, height: 48}
				})
			}else if(t.type === "RocketM"){
				hover = components.RocketMHover({
					imageCenter: {x:t.x, y:t.y},
					imageSize: {width: 48, height: 48}
				})
			}else if(t.type === "Scientist"){
				hover = components.ScientistHover({
					imageCenter: {x:t.x, y:t.y},
					imageSize: {width: 48, height: 48}
				})
			}
			hover.cost.text = ''
      hover.hotkey.text=''
		}
	}

	function buildTower(type, x1, y1){
		gameCommands.getKeyCommands();
		socket.emit('event', {game:room, event: 'build', type: type, center: {x:x1, y:y1}, player: socket.id})
		hover = undefined
		imageHovering = false;
		document.getElementById('my-canvas').className = ''
		console.log('building')
	}

	function sendCreeps(type, x1, y1){
		gameCommands.getKeyCommands();
		socket.emit('event', {game:room, event: 'send', type: type, center: {x:x1, y:y1}, player: socket.id})
		hover = undefined
		imageHovering = false;
		document.getElementById('your-canvas').className = ''
	}

	function selectTowerToEvolve(location){
		let mapX = Math.floor(location.x /50)
		let mapY = Math.floor(location.y /50) - 2;
		console.log('map', mapX, mapY)

		let playerTower  = players[0].map[mapY][mapX];
		if(playerTower === -1){
			console.log('first if')
			myMouse.noTowerFound();
			towerToEvolve = undefined;
			upgrading = false;
			myMouse.setUpgrading(false)
		}else if(players[0].towers[playerTower].typeUpgrade){
			console.log('second if',players[0].towers[playerTower])
			myMouse.setUpgrading(true)
			towerToEvolve = {tower: players[0].towers[playerTower], id: playerTower};
		}

	}

	function upgradeTower(tower){
		gameCommands.getKeyCommands();
		// console.log('sending tower to upgrade', tower.tower.typeUpgrade)
		socket.emit('event', {game:room, event: 'upgrade', type: tower.tower.typeUpgrade, center: {x:tower.tower.center.x, y:tower.tower.center.y}, player: socket.id, tower: tower.id})
		towerToEvolve = undefined;
		upgrading = false;
	}
	// ------------------------------------------------------------------
	//
	// This function is used to update the state of the demo model.
	//
	// ------------------------------------------------------------------
	that.update = function(elapsedTime) {
	  if(!gameVars.gameOver && !gameVars.gamePaused) {
      if (gameVars.gameStarts <= 0) {
        if (!diffed) {
          gameVars.totalTime += elapsedTime
          if (Math.floor(gameVars.totalTime / 1000) % 7 === 0 && Math.floor(gameVars.totalTime / 1000) / 7 !== gameVars.lastIncome) {
            players[0].money += players[0].income
            players[1].money += players[1].income
            gameVars.lastIncome = Math.floor(gameVars.totalTime / 1000) / 7
          }
          for (let p = 0; p < players.length; ++p) {
            resetMap(p)
            for (let i = 0; i < players[p].towers.length; i++) {
              if (players[p].towers[i].type === "deleted") continue
              let attackTarget = players[p].towers[i].update(elapsedTime, players[p].creeps)
              for (let k = players[p].towers[i].center.y / 50 - 3; k <= players[p].towers[i].center.y / 50 - 2; k++) {
                for (let j = players[p].towers[i].center.x / 50 - 1; j <= players[p].towers[i].center.x / 50; j++) {
                  players[p].map[k][j] = i
                }
              }
            }
            for (let i = 0; i < players[p].creeps.length; i++) {
              if (players[p].creeps[i].type === "deleted") continue
              players[p].creeps[i].update(elapsedTime)
              if (players[p].creeps[i].center.y > 100) {
                players[p].map[Math.floor(players[p].creeps[i].center.y / 50) - 2][Math.floor(players[p].creeps[i].center.x / 50)] = (-i) - 2
              } else {
                if (players[p].creeps[i].type !== "deleted")
                  players[p].lives--
                players[p].creeps[i].type = "deleted"
              }
            }
            for (let i = 0; i < players[p].buildTowers.length; i++) {
              players[p].buildTowers[i].update(elapsedTime)
            }
            for (let i = 0; i < players[p].sendCreeps.length; i++) {
              players[p].sendCreeps[i].update(elapsedTime)
            }
            // if(players[p].particles.length > 0) console.log(players[p].particles.length)
            for (let i = 0; i < players[p].particles.length; i++) {
              players[p].particles[i].update(elapsedTime)
              if (players[p].particles[i].getDimensions()) players[p].particles.splice(i, 1)
            }
          }
        }
        if (imageHovering === true) {
          let h = gameCommands.hoverTower()
          if (h) {
            hover.image.center = {x: h.x, y: h.y}
          }
        }

        myMoney.text = players[0].money
        myIncome.text = players[0].income
        nextIncome.text = "in " + (7 - Math.floor(gameVars.totalTime / 1000) % 7) + " sec"

        let seconds = Math.floor(gameVars.totalTime / 1000)
        let minutes = Math.floor(seconds / 60)
        while (seconds >= 60) {
          seconds %= 60
        }
        if (seconds < 10) seconds = "0" + Math.floor(seconds)
        gameTime.text = "Time Elapsed: " + minutes + ":" + seconds

        diffed = false
      } else {
        gameVars.gameStarts -= elapsedTime
        if (gameVars.gameStarts > 0) {
          document.getElementById('start-game-modal').className = "modal"
          document.getElementById('game-timer').innerHTML = "Game Start in " + Math.ceil(gameVars.gameStarts / 1000)
        }
        else {
          document.getElementById('start-game-modal').className = 'hidden'
        }
      }
    }else{
	    if(gameVars.gameOver){
	      that.stop()
      }
    }
	};

	// ------------------------------------------------------------------
	//
	// This function renders the demo model.
	//
	// ------------------------------------------------------------------
	that.render = function(renderer) {

    drawBackground(renderer)

    // for(let i = 0; i < path.length; i++){
    //  renderer.core.drawRectangle('rgba(0,200,50,.5)',path[i].x*50 + 5,(path[i].y + 2)*50 + 5,40,40,false,0)
    // }

		for(let p = 0; p < players.length; ++p) {
      for (let i = 0; i < players[p].towers.length; i++) {
        if(players[p].towers[i].type === "deleted") continue
        renderer.Tower.render(players[p].towers[i],p)
      }


        for (let i = 0; i < players[p].creeps.length; i++) {
          if (players[p].creeps[i].type === "deleted") continue
          for (let j = 0; j < players[p].creeps[i].stats.path.length; j++) {
            renderer.core.drawRectangle('rgba(0,200,50,.5)', players[p].creeps[i].stats.path[j].x * 50 + 5, (players[p].creeps[i].stats.path[j].y + 2) * 50 + 5, 40, 40, false, p)
          }
        }

      for (let i = 0; i < players[p].creeps.length; i++) {
        if(players[p].creeps[i].type === "deleted") continue
        renderer.Creep.render(players[p].creeps[i],p)
      }


			for(let i = 0; i < players[p].buildTowers.length; i++){
				renderer.TowerHover.render(players[p].buildTowers[i],p)
			}
			for(let i = 0; i < players[p].sendCreeps.length; i++){
				renderer.CreepsHover.render(players[p].sendCreeps[i],p)
			}
			for(let i = 0; i < players[p].particles.length; i++){
				renderer.ParticleSystem.render(players[p].particles[i],p)
			}
			if(hover && (myMouse.buildSelected() || myMouse.creepSelected())){
				if(myMouse.buildSelected()){
					renderer.TowerHover.render(hover, 0);
				}else{
					renderer.TowerHover.render(hover, 1);
				}
	    }
    }

    drawHeader(renderer)

	};

	that.diffModels = function(serverModel){
	  var p = 0;
	  var built = false
	  for(var key in serverModel){
	    if(serverModel.hasOwnProperty(key)){

        if(socket.id == key) p = 0
        else p = 1

        if(serverModel[key].hasOwnProperty("towers")) {
          for (let i = 0; i < serverModel[key].towers.length; i++) {
            if (players[p].towers[i] === undefined || players[p].towers[i].type != serverModel[key].towers[i].type) {
              if (serverModel[key].towers[i].type === "deleted") {
                //players[p].towers[i] = {type: "deleted"}
                players[p].towers.splice(i, 1)
                serverModel[key].towers.splice(i, 1)
                i--
              }
              else {
                players[p].towers[i] = createTowerFromServer(serverModel[key].towers[i])
                if (p == 0) built = true
              }
            }
          }
          while (players[p].towers.length > serverModel[key].towers.length) {
            players[p].towers.splice(players[p].towers.length - 1, 1)
          }
        }
        if(serverModel[key].hasOwnProperty("creeps")) {
          for (let i = 0; i < serverModel[key].creeps.length; i++) {
            if (players[p].creeps[i] === undefined || players[p].creeps[i].type != serverModel[key].creeps[i].type) {
              if (serverModel[key].creeps[i].type === "deleted") {
                if(serverModel[key].creeps[i].killed) {
                  let particle = components.ParticleSystem(serverModel[key].creeps[i])
                  particle.create()
                  players[p].particles.push(particle)
                }
                players[p].creeps.splice(i, 1)
                serverModel[key].creeps.splice(i, 1)
                i--
              }
              else {
                players[p].creeps[i] = createCreepFromServer(serverModel[key].creeps[i])
              }
            } else {
              for(var stat in serverModel[key].creeps[i].stats) {
                players[p].creeps[i].stats[stat] = serverModel[key].creeps[i].stats[stat]
              }
              players[p].creeps[i].center = serverModel[key].creeps[i].center
            }

          }
          while (players[p].creeps.length > serverModel[key].creeps.length) {
            players[p].creeps.splice(players[p].creeps.length - 1, 1)
          }
        }

        if(serverModel[key].hasOwnProperty("map")) {
          players[p].map = serverModel[key].map
          paths[p] = serverModel[key].path
        }

        // if(serverModel[key].hasOwnProperty("creep")){
        //   players[p].creeps.push(createCreepFromServer(serverModel[key].creep))
        // }
        if(serverModel[key].hasOwnProperty("money"))
          players[p].money = serverModel[key].money
        if(serverModel[key].hasOwnProperty("income"))
          players[p].income = serverModel[key].income
        if(serverModel[key].hasOwnProperty("lives"))
          players[p].lives = serverModel[key].lives
        if(serverModel[key].hasOwnProperty("kills"))
          players[p].kills = serverModel[key].kills
        if(serverModel[key].hasOwnProperty("sent"))
          players[p].sent = serverModel[key].sent
        if(serverModel[key].hasOwnProperty("totalMoney"))
          players[p].totalMoney = serverModel[key].totalMoney
        if(serverModel[key].hasOwnProperty("totalTowersBuilt"))
          players[p].totalTowersBuilt = serverModel[key].totalTowersBuilt

        if(serverModel[key].hasOwnProperty("totalTime")) {
          gameVars = serverModel[key]
        }


      }
    }
    diffed = true
  }

  function createTowerFromServer(tower){

	  return components.Tower(components.TowerData[tower.type], tower.center)

    // return components[tower.type]({
	   //  spriteCenter: tower.center
    // })
  }

  function createCreepFromServer(creep){
    return components[creep.type]({
      id: creep.id,
      stats: creep.stats,
      spriteCenter: creep.center
    })
  }

  function drawBackground(renderer){
    //draw top row of grass/dirt


    for(let p = 0; p < 2; p++) {
      renderer.core.drawImage(Demo.assets['dirt'], 0, 0, 32, 32, 0, 100, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets['dirt'], 32, 0, 32, 32, j * 50, 100, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets['dirt'], 64, 0, 32, 32, 950, 100, 50, 50, p)

      // draw middle of grass/dirt
      for (let i = 3; i < 16; i++) {
        renderer.core.drawImage(Demo.assets['dirt'], 0, 32, 32, 32, 0, (i * 50), 50, 50, p)
        for (let j = 1; j < 19; j++) {
          renderer.core.drawImage(Demo.assets['dirt'], 32, 32, 32, 32, j * 50, (i * 50), 50, 50, p)
        }
        renderer.core.drawImage(Demo.assets['dirt'], 64, 32, 32, 32, 950, (i * 50), 50, 50, p)
      }

      //draw bottom row of grass/dirt
      renderer.core.drawImage(Demo.assets['dirt'], 0, 64, 32, 32, 0, 800, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets['dirt'], 32, 64, 32, 32, j * 50, 800, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets['dirt'], 64, 64, 32, 32, 950, 800, 50, 50, p)

      // Draw "landing dirt" for creeps
      renderer.core.drawImage(Demo.assets['loadingdirt'], 0, 0, 32, 32, 0, 850, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets['loadingdirt'], 32, 0, 32, 32, j * 50, 850, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets['loadingdirt'], 64, 0, 32, 32, 950, 850, 50, 50, p)


      // Draw Background grass at top under building and fences
      renderer.core.drawImage(Demo.assets['bggrass'], 0, 0, 32, 32, 0, 0, 50, 50, p)
      renderer.core.drawImage(Demo.assets['bggrass'], 0, 64, 32, 32, 0, 50, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets['bggrass'], 32, 0, 32, 32, j * 50, 0, 50, 50, p)
        renderer.core.drawImage(Demo.assets['bggrass'], 32, 64, 32, 32, j * 50, 50, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets['bggrass'], 64, 0, 32, 32, 950, 0, 50, 50, 0)
      renderer.core.drawImage(Demo.assets['bggrass'], 64, 0, 32, 32, 950, 0, 50, 50, 1)
      renderer.core.drawImage(Demo.assets['bggrass'], 64, 64, 32, 32, 950, 50, 50, 50, p)


      // Draw fences
      for (let i = 0; i < 10; i++) {
        renderer.core.drawImage2({image: Demo.assets['fence']}, i * 100, 50, 100, 50, p)
      }

      // Draw green background
      for (let i = 0; i < 10; i++) {
        renderer.core.drawImage2({image: Demo.assets['buildingselectbggreen']}, i * 100, 900, 100, 100, p)
      }
    }

    // Draw building
    renderer.core.drawImage2({image: Demo.assets['bluebuilding']}, 382, -28, 324, 128, 0)
    renderer.core.drawImage2({image: Demo.assets['redbuilding']}, 382, -28, 324, 128, 1)

  }

  function drawHeader(renderer){
    renderer.core.drawImage2({image: Demo.assets['gold']},0,0,50,50,0)
    renderer.Text.render(myMoney,0)
    renderer.core.drawImage2({image: Demo.assets['income']},125,0,50,50,0)
    renderer.Text.render(myIncome,0)
    renderer.Text.render(nextIncome,0)
    renderer.Text.render(gameTime,1)

    for(let p = 0; p < 2; p++) {
      for (let i = 0; i < players[p].lives; i++) {
        renderer.core.drawImage2({image: Demo.assets['egg']},975 - 25*(i+1),0,50,50,p)
      }
    }

  }

  that.setSocket = function(s){
    socket = s;
  }

  function resetMap(p){
    players[p].map = []
    for(let i = 0; i < 16; i++){
      players[p].map.push([])
      for(let j = 0; j < 20; j++){
        players[p].map[i].push(-1)
      }
    }
  }

  that.stop = function(leaver){
    gameVars.gameOver = true
    gameVars.gamePause = true
    if(players[0].lives <= 0){
      document.getElementById("final-score-lost").innerHTML = (players[0].totalMoney + players[0].totalTowersBuilt + players[0].sent.total + (players[0].kills.total * 2) + (players[0].lives*100))

      document.getElementById("your-gold-farmed-loser").innerHTML = players[0].totalMoney
      document.getElementById("enemy-gold-farmed-loser").innerHTML = players[1].totalMoney

      document.getElementById("your-total-income-loser").innerHTML = players[0].income
      document.getElementById("enemy-total-income-loser").innerHTML = players[1].income

      document.getElementById("your-lives-remaining-loser").innerHTML = players[0].lives
      document.getElementById("enemy-lives-remaining-loser").innerHTML = players[1].lives

      document.getElementById("your-towers-built-loser").innerHTML = players[0].totalTowersBuilt
      document.getElementById("enemy-towers-built-loser").innerHTML = players[1].totalTowersBuilt

      document.getElementById("your-creeps-sent-loser").innerHTML = players[0].sent.total
      document.getElementById("enemy-creeps-sent-loser").innerHTML = players[1].sent.total

      document.getElementById("your-rocket-killed-loser").innerHTML = players[0].kills['RocketM']
      document.getElementById("enemy-rocket-killed-loser").innerHTML = players[1].kills['RocketM']

      document.getElementById("your-scientist-killed-loser").innerHTML = players[0].kills['Scientist']
      document.getElementById("enemy-scientist-killed-loser").innerHTML = players[1].kills['Scientist']

      document.getElementById("your-biker-killed-loser").innerHTML = players[0].kills['Biker']
      document.getElementById("enemy-biker-killed-loser").innerHTML = players[1].kills['Biker']

      document.getElementById("your-pirate-killed-loser").innerHTML = players[0].kills['Eyepatch']
      document.getElementById("enemy-pirate-killed-loser").innerHTML = players[1].kills['Eyepatch']

      document.getElementById("your-total-killed-loser").innerHTML = players[0].kills.total
      document.getElementById("enemy-total-killed-loser").innerHTML = players[1].kills.total

      document.getElementById('game-lost').className = 'modal'
    }else{

      document.getElementById("final-score").innerHTML = (players[0].totalMoney + players[0].totalTowersBuilt + players[0].sent.total + (players[0].kills.total * 2) + (players[0].lives*100))

      document.getElementById("your-gold-farmed-winner").innerHTML = players[0].totalMoney
      document.getElementById("enemy-gold-farmed-winner").innerHTML = players[1].totalMoney

      document.getElementById("your-total-income-winner").innerHTML = players[0].income
      document.getElementById("enemy-total-income-winner").innerHTML = players[1].income

      document.getElementById("your-lives-remaining-winner").innerHTML = players[0].lives
      document.getElementById("enemy-lives-remaining-winner").innerHTML = players[1].lives

      document.getElementById("your-towers-built-winner").innerHTML = players[0].totalTowersBuilt
      document.getElementById("enemy-towers-built-winner").innerHTML = players[1].totalTowersBuilt

      document.getElementById("your-creeps-sent-winner").innerHTML = players[0].sent.total
      document.getElementById("enemy-creeps-sent-winner").innerHTML = players[1].sent.total

      document.getElementById("your-rocket-killed-winner").innerHTML = players[0].kills['RocketM']
      document.getElementById("enemy-rocket-killed-winner").innerHTML = players[1].kills['RocketM']

      document.getElementById("your-scientist-killed-winner").innerHTML = players[0].kills['Scientist']
      document.getElementById("enemy-scientist-killed-winner").innerHTML = players[1].kills['Scientist']

      document.getElementById("your-biker-killed-winner").innerHTML = players[0].kills['Biker']
      document.getElementById("enemy-biker-killed-winner").innerHTML = players[1].kills['Biker']

      document.getElementById("your-pirate-killed-winner").innerHTML = players[0].kills['Eyepatch']
      document.getElementById("enemy-pirate-killed-winner").innerHTML = players[1].kills['Eyepatch']

      document.getElementById("your-total-killed-winner").innerHTML = players[0].kills.total
      document.getElementById("enemy-total-killed-winner").innerHTML = players[1].kills.total

      document.getElementById('game-won').className = 'modal'
    }
    audio.stop()
  }

	return that;

}(Demo.input, Demo.components, Demo.audio));

function Player(){
  return{
    buildTowers: [],
    sendCreeps: [],
    towers: [],
    creeps: [],
    map: [],
    particles: [],
    money: 10,
    totalMoney: 10,
    income: 1,
    lives: 10,
    totalTowersBuilt: 0,
    totalTowersUpgraded: 0,
    kills: {
      RocketM: 0,
      Scientist: 0,
      Biker: 0,
      Eyepatch: 0,
      total: 0
    },
    sent: {
      RocketM: 0,
      Scientist: 0,
      Biker: 0,
      Eyepatch: 0,
      total: 0
    }
  }
}