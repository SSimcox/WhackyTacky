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
    gameStarts: 30000,
	  obsticles: []
  }

  let paths = []
  let particles
  let bgs = ['brick','dirt','gravel','sand','white'], bg
	let obs = ['rock1', 'rock2','rock3','rock4','rock1']

  var hover,
	    imageHovering = false,
	    towerToEvolve,
	    upgrading = false,
	    selling = false,
	    location,
	    selectedTower = false,
			noBuildFill = 'rgba(255,0,0,.3)',

      selectedStyle = '22px Oswald, sans-serif',
      selectedFill = 'rgba(255, 255, 255, 1)',
			towerValues = {
				Bulbasaur: {cost: 10, range:600, damage:5, speed: .6, font : selectedStyle, fill : selectedFill},
				Ivysaur: {cost: 30, range:600, damage:15, speed: .6, font : selectedStyle, fill : selectedFill},
				Venusaur: {cost: 120, range:600, damage:45, speed: .6, font : selectedStyle, fill : selectedFill},
				Charmander: {cost: 12, range:400, damage:10, speed: 2, font : selectedStyle, fill : selectedFill},
				Charmeleon: {cost: 30, range:400, damage:25, speed: 2, font : selectedStyle, fill : selectedFill},
				Charizard: {cost: 120, range:400, damage:57, speed: 2, font : selectedStyle, fill : selectedFill},
			  Squirtle: {cost: 15, range:300, damage:5, speed: .3, font : selectedStyle, fill : selectedFill},
			  Wartortle: {cost: 30, range:100, damage:15, speed: .3, font : selectedStyle, fill : selectedFill},
				Blastoise: {cost: 120, range:100, damage:45, speed: .3, font : selectedStyle, fill : selectedFill}
			}
	// ------------------------------------------------------------------
	//
	// This function initializes the input demo model.  Only thing it
	// does right now is to register the resize event with the renderer.
	//
	// ------------------------------------------------------------------
	that.initialize = function(renderer) {

    players[0] = Player()
    players[1] = Player()
    myKeyboard = input.Keyboard()
    myMouse = input.Mouse()
    gameCommands = input.GameCommands(myMouse, myKeyboard)

    bg = bgs[Math.floor(Math.random()*bgs.length)]

    gameVars = {
      totalTime: 0,
      lastIncome: 0,
      gameOver: false,
      gamePaused: false,
      gameStarts: 3000
    }

    paths = []

    myMoney.setText = players[0].money
    myIncome.setText = players[0].income
    nextIncome.setText = "in " + 7 +" sec"
    gameTime.setText = "Time Elapsed: " + 0 + ":00"

    imageHovering = false;
    upgrading = false;

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
    components.AttackData.load()

    audio.playSong('battle')
    drawTutorial(renderer)
	};

	// ------------------------------------------------------------------
	//
	// Process all input for the model here.
	//
	// ------------------------------------------------------------------
	that.processInput = function(elapsedTime) {
		myKeyboard.update(elapsedTime);
		if(gameCommands.paused()){
		  pause()
    }
    if(!gameVars.gamePaused && gameVars.gameStarts <= 0) {
      let build = gameCommands.buildTower(myMouse);
      let wave = gameCommands.sendCreeps(myMouse);
      location = gameCommands.evolveTowerSelection(myMouse);
      if (location) {
        selectTowerToEvolve(location);
      }
      if (build || wave) {
        if (build) buildTower(build.type, build.x, build.y);
        if (wave) sendCreeps(wave.type, wave.x, wave.y);
      } else if (selectedTower && towerToEvolve) {
        // do we want to evolve it?

        if (gameCommands.evolveTower(myMouse)) {
          console.log('upgrading Tower')
          upgradeTower(towerToEvolve)
        } else if (gameCommands.sellTower(myMouse)) {
          console.log('selling Tower')
          sellTower(towerToEvolve)
        }
      }
      resetHover();
      buildingHovering();
      mouseHovering();
    }
	}

	function resetHover(){
		if(!myMouse.buildSelected() || !myMouse.creepSelected() && imageHovering){
			hover = null;
			imageHovering = false;
      document.getElementById('my-canvas').className = ''
      document.getElementById('your-canvas').className = ''
		}
	}

	function buildingHovering(){
		if(myMouse.buildSelected() && !imageHovering){
			let t = gameCommands.hoverTower();
			imageHovering = true;
			document.getElementById('my-canvas').className = "no-cursor"
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
			document.getElementById('your-canvas').className = "no-cursor"
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
		// console.log('map', mapX, mapY)

		let playerTower  = players[0].map[mapY][mapX];
		if(playerTower === -1){
			clearAndReset();
		}else if(players[0].towers[playerTower].typeUpgrade){
			towerToEvolve = {tower: players[0].towers[playerTower], id: playerTower};
			// console.log('selecting tower', towerToEvolve.tower)
			selectedTower = true;
		}else if(players[0].towers[playerTower].type){
			towerToEvolve = {tower: players[0].towers[playerTower], id: playerTower};
			// console.log('selecting tower', towerToEvolve.tower)
			selectedTower = true;
		}

	}

	function pause(){
	  socket.emit('event', {game:room, event: 'pause', player: socket.id})
  }

  function ready(){
	  socket.emit('event', {game:room, event: 'ready', player: socket.id})
		clearAndReset();
  }

  function readyHelp(){
    document.getElementById('game-timer').removeEventListener('click', readyHelp)
    ready()
  }

	function upgradeTower(tower){
		if(tower.tower.typeUpgrade){
		gameCommands.getKeyCommands();
			// console.log('Upgrading model')
			socket.emit('event', {game:room, event: 'upgrade', type: tower.tower.typeUpgrade, center: {x:tower.tower.center.x, y:tower.tower.center.y}, player: socket.id, tower: tower.id})
		}
		clearAndReset();
	}

	function sellTower(tower){
		gameCommands.getKeyCommands();
		// console.log('Selling in Model', tower)
		socket.emit('event', {game:room, event: 'sell', type: tower.tower.type, center: {x:tower.tower.center.x, y:tower.tower.center.y}, player: socket.id, tower: tower.id})
		clearAndReset();
	}

	function clearAndReset(){
		myMouse.noTowerFound();
		towerToEvolve = undefined;
		selectedTower = false;
		selling = false;
		myMouse.setUpgrading(false)
		myMouse.setSelling(false)
		selectedTower = false;
		myKeyboard.clearBuffer()
	}
	// ------------------------------------------------------------------
	//
	// This function is used to update the state of the demo model.
	//
	// ------------------------------------------------------------------
	that.update = function(elapsedTime) {
	  if(!gameVars.gameOver && !gameVars.gamePaused) {
	    document.getElementById('mask').className = 'hidden'
      document.getElementById('pause-modal').className = 'hidden'
      if (gameVars.gameStarts <= 0) {
        document.getElementById('start-game-modal').className = 'hidden'
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
              if(attackTarget > -1){
                var data = components.AttackData[components.AttackData.keys[players[p].towers[i].type]]
                players[p].attacks.push(components.Attack({
                  type: data.type,
                  spriteMove: data.spriteMove,
                  spriteHit: data.spriteHit,
                  spriteCountMove: data.spriteCountMove,
                  spriteTimeMove: data.spriteTimeMove,
                  spriteCountHit: data.spriteCountHit,
                  spriteTimeHit: data.spriteTimeHit,
                  spriteSize: data.spriteSize,
                  attack: data.attack,
                },players[p].creeps[attackTarget].center))
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
                let particle = components.ParticleSystem()
                particle.create('egg',{center: {x: 975 - 25 * players[p].lives, y: 25}})
                players[p].particles.push(particle)
                players[p].creeps[i].type = "deleted"
              }
            }
            for (let i = 0; i < players[p].attacks.length; i++){
              if(players[p].attacks[i].update(elapsedTime)){
                players[p].attacks.splice(i,1)
                i--
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
          document.getElementById('mask').className = 'light'
          if(!players[0].gameStart) {
            document.getElementById('game-timer').innerHTML = "Game Start in " + Math.ceil(gameVars.gameStarts / 1000) + " seconds. Click here to skip the tutorial screen..."
            document.getElementById('game-timer').addEventListener('click', readyHelp)
          }
          else{
            document.getElementById('game-timer').innerHTML = "Waiting to start... (" + Math.ceil(gameVars.gameStarts / 1000) +" seconds)"
          }
        }
        else {
          document.getElementById('start-game-modal').className = 'hidden'
          document.getElementById('mask').className = 'hidden'
        }
      }
    }else{
	    if(gameVars.gameOver){
	      that.stop()
      }else{
	      document.getElementById('mask').className = 'dark'
        if(gameVars.playerPause === socket.id){
	        document.getElementById('pause-text').innerHTML = "Game will resume in " + Math.ceil(players[0].pauseTime / 1000) + " seconds. Press the 'Pause' key (" + Persistance.getControl('Pause') + ") to continue..."
        }else{
          document.getElementById('pause-text').innerHTML = "Waiting for other Player to resume the game.\nGame will resume in " + Math.ceil(players[1].pauseTime / 1000) + " seconds."
        }
        document.getElementById('pause-modal').className = 'modal'
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

		for(let p = 0; p < players.length; ++p) {
			drawObsticles(renderer, p)
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

      for (let i = 0; i < players[p].attacks.length; i++){
        renderer.Attack.render(players[p].attacks[i],p)
      }

			for(let i = 0; i < players[p].buildTowers.length; i++){
				renderer.TowerHover.render(players[p].buildTowers[i],p)
			}
			for(let i = 0; i < players[p].sendCreeps.length; i++){
				renderer.CreepsHover.render(players[p].sendCreeps[i],p)
			}
			drawHeader(renderer)
			for(let i = 0; i < players[p].particles.length; i++){
				renderer.ParticleSystem.render(players[p].particles[i],p)
			}
			if(hover && (myMouse.buildSelected() || myMouse.creepSelected())){
				if(hover.center.y <= 800 && hover.center.x > 0){
					if(myMouse.buildSelected() && p === 0 ){
						let blocked = false;
						for(let k = 0; k < players[0].towers.length; ++k){
							if(Math.abs(hover.center.x - players[0].towers[k].center.x) <=50){
								if(Math.abs(hover.center.y - players[0].towers[k].center.y) <=50){
									blocked = true;
									renderer.core.drawRectangle(noBuildFill, hover.center.x - 50, hover.center.y - 50, 100, 100, false, 0)
								}
							}
						}
						if(!blocked){
							let path = buildPathBlocked(hover)
							if(path === false){
								renderer.core.drawRectangle(noBuildFill, hover.center.x - 50, hover.center.y - 50, 100, 100, false, 0)
							}
						}
					}
				}
				if(myMouse.buildSelected()){
					renderer.TowerHover.render(hover, 0);
				}else{
					renderer.TowerHover.render(hover, 1);
				}
	    }
    }

		if(selectedTower && towerToEvolve){

			drawSellUpgrade(renderer, towerToEvolve.tower)
		}



	};

	function buildPathBlocked(hover){
		var x = (hover.center.x) / 50
		var y = (hover.center.y - 100) / 50
		for(let i = y-1; i <= y; i++){
			for(let j = x-1; j <=x ; j++){
				console.log(players[0].map)
				if(players[0].map[i][j] != -1) return false;
			}
		}
		for(let i = y-1; i <= y; i++){
			for(let j = x-1; j <= x; j++){
				players[0].map[i][j] = players[0].towers.length + 1;
			}
		}
		return setPath(players[0])

	}

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
                players[p].towers[i].type = "deleted"
                // players[p].towers.splice(i, 1)
                // serverModel[key].towers.splice(i, 1)
                i--
              }
              else {
                players[p].towers[i] = createTowerFromServer(serverModel[key].towers[i])
                if (p == 0) built = true
              }
            }
          }
          // while (players[p].towers.length > serverModel[key].towers.length) {
          //   players[p].towers.splice(players[p].towers.length - 1, 1)
          // }
        }
        if(serverModel[key].hasOwnProperty("creeps")) {
          for (let i = 0; i < serverModel[key].creeps.length; i++) {
            if (players[p].creeps[i] === undefined || players[p].creeps[i].type != serverModel[key].creeps[i].type) {
              if (serverModel[key].creeps[i].type === "deleted") {
                if(serverModel[key].creeps[i].killed) {
                  let particle = components.ParticleSystem()
                  particle.create('creep',serverModel[key].creeps[i])
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
        if(serverModel[key].hasOwnProperty("pauseTime"))
          players[p].pauseTime = serverModel[key].pauseTime
        if(serverModel[key].hasOwnProperty("gameStart"))
          players[p].gameStart = serverModel[key].gameStart

        if(serverModel[key].hasOwnProperty("totalTime")) {
          gameVars = serverModel[key]
        }


      }
    }
    diffed = true
  }

  function createTowerFromServer(tower){

	  return components.Tower({
			type: components.TowerData[tower.type].type,
			spriteSheetFront:components.TowerData[tower.type].spriteSheetFront,
			spriteSheetBack: components.TowerData[tower.type].spriteSheetBack,
			spriteCountFront: components.TowerData[tower.type].spriteCountFront,
			spriteTimeFront: components.TowerData[tower.type].spriteTimeFront,
			spriteCountBack: components.TowerData[tower.type].spriteCountBack,
      spriteTimeBack: components.TowerData[tower.type].spriteTimeBack,
      animationScale: components.TowerData[tower.type].animationScale,
      spriteSize: components.TowerData[tower.type].spriteSize,
	    attack: {
	      damage: components.TowerData[tower.type].attack.damage,
	      speed: components.TowerData[tower.type].attack.speed,
	      timeSinceAttack: components.TowerData[tower.type].attack.timeSinceAttack,
	      range: components.TowerData[tower.type].attack.range
	    },
			typeUpgrade: components.TowerData[tower.type].typeUpgrade

	  }, tower.center)
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
      renderer.core.drawImage(Demo.assets[bg], 0, 0, 32, 32, 0, 100, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets[bg], 32, 0, 32, 32, j * 50, 100, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets[bg], 64, 0, 32, 32, 950, 100, 50, 50, p)

      // draw middle of grass/dirt
      for (let i = 3; i < 16; i++) {
        renderer.core.drawImage(Demo.assets[bg], 0, 32, 32, 32, 0, (i * 50), 50, 50, p)
        for (let j = 1; j < 19; j++) {
          renderer.core.drawImage(Demo.assets[bg], 32, 32, 32, 32, j * 50, (i * 50), 50, 50, p)
        }
        renderer.core.drawImage(Demo.assets[bg], 64, 32, 32, 32, 950, (i * 50), 50, 50, p)
      }

      //draw bottom row of grass/dirt
      renderer.core.drawImage(Demo.assets[bg], 0, 64, 32, 32, 0, 800, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets[bg], 32, 64, 32, 32, j * 50, 800, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets[bg], 64, 64, 32, 32, 950, 800, 50, 50, p)

      // Draw "landing dirt" for creeps
      renderer.core.drawImage(Demo.assets['loading' + bg], 0, 0, 32, 32, 0, 850, 50, 50, p)
      for (let j = 1; j < 19; j++) {
        renderer.core.drawImage(Demo.assets['loading' + bg], 32, 0, 32, 32, j * 50, 850, 50, 50, p)
      }
      renderer.core.drawImage(Demo.assets['loading' + bg], 64, 0, 32, 32, 950, 850, 50, 50, p)


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

	function drawSellUpgrade(renderer, tower){
		let sellVal = Math.floor(towerValues[tower.type].cost/2);
		let sellStats = towerValues[tower.type]
		sellStats.position = {x:700, y:900}

		let upgradeStats = undefined;
		if(tower.typeUpgrade){
			upgradeStats = towerValues[tower.typeUpgrade];
			upgradeStats.position = {x:900, y:900}
		}

		console.log(tower)
		renderer.core.drawCircle('rgba(255,0,0,.2)',tower.center, tower.attack.range, 0)

		renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 600,900,100,100,0)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 700,900,100,100,0)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 800,900,100,100,0)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 900,900,100,100,0)

    renderer.core.drawRectangle("rgba(0,0,0,1",600,900,200,100,true,0)
    renderer.core.drawRectangle("rgba(0,0,0,1",800,900,200,100,true,0)

		// console.log(sellStats, upgradeStats)

		if(tower.type === 'Bulbasaur'){
			renderer.core.drawImage2({image: Demo.assets['bulbasaurHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['ivysaurHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Ivysaur'){
			renderer.core.drawImage2({image: Demo.assets['ivysaurHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['venusaurHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Venusaur'){
			renderer.core.drawImage2({image: Demo.assets['venusaurHover']}, 600, 900, 100, 100, 0);
		}else if(tower.type === 'Charmander'){
			renderer.core.drawImage2({image: Demo.assets['charmanderHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['charmeleonHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Charmeleon'){
			renderer.core.drawImage2({image: Demo.assets['charmeleonHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['charizardHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Charizard'){
			renderer.core.drawImage2({image: Demo.assets['charizardHover']}, 600, 900, 100, 100, 0);
		}else if(tower.type === 'Squirtle'){
			renderer.core.drawImage2({image: Demo.assets['squirtleHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['wartortleHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Wartortle'){
			renderer.core.drawImage2({image: Demo.assets['wartortleHover']}, 600, 900, 100, 100, 0);
			renderer.core.drawImage2({image: Demo.assets['blastoiseHover']}, 800, 900, 100, 100, 0);
		}else if(tower.type === 'Blastoise'){
			renderer.core.drawImage2({image: Demo.assets['blastoiseHover']}, 600, 900, 100, 100, 0);
		}
		renderer.core.drawTextSell(sellStats, 0)
		if(upgradeStats) renderer.core.drawTextUpgrade(upgradeStats, 0)
	}

	function drawObsticles(renderer,p){
    if(gameVars.obsticles) {
      for (let i = 0; i < gameVars.obsticles.length; i++) {
        renderer.core.drawImage2({image: Demo.assets[obs[gameVars.obsticles[i].img]]}, gameVars.obsticles[i].j * 50, (gameVars.obsticles[i].i + 2) * 50, 50, 50, p)
      }
    }
		// for(let i = 0; i < 15; ++i){
		// 	for(let j = 0; j < 20; ++j){
		// 		if(players[p].map[i][j] === -2)	renderer.core.drawImage2({image: Demo.assets['loadingdirt']}, (j)*50, (i+2)*50,  50, 50, p)
		// 	}
		// }
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
				for(let k = 0; k < gameVars.obsticles.length; k++){
					if(gameVars.obsticles[k].i === i && gameVars.obsticles[k].j === j){
						players[p].map[i][j] = -2;
					}
				}
      }
    }
  }

  that.stop = function(leaver){
    gameVars.gameOver = true
    gameVars.gamePause = true

    document.getElementById('mask').className = 'light'
    if(players[0].lives <= 0){
      audio.playSong('defeat')
      //audio.stopAll()
      document.getElementById("final-score-lost").innerHTML = (players[0].totalMoney + players[0].totalTowersBuilt + players[0].sent.total + (players[0].kills.total * 2) + (players[0].lives*100))

      document.getElementById("your-gold-farmed-loser").innerHTML = players[0].totalMoney
      document.getElementById("enemy-gold-farmed-loser").innerHTML = players[1].totalMoney

      document.getElementById("your-total-income-loser").innerHTML = players[0].income
      document.getElementById("enemy-total-income-loser").innerHTML = players[1].income

      document.getElementById("your-lives-remaining-loser").innerHTML = players[0].lives
      document.getElementById("enemy-lives-remaining-loser").innerHTML = players[1].lives

      document.getElementById("your-towers-built-loser").innerHTML = players[0].totalTowersBuilt
      document.getElementById("enemy-towers-built-loser").innerHTML = players[1].totalTowersBuilt

      document.getElementById("your-towers-upgraded-loser").innerHTML = players[0].totalTowersUpgraded
      document.getElementById("enemy-towers-upgraded-loser").innerHTML = players[1].totalTowersUpgraded

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

      document.getElementById('game-lost-submit').addEventListener('click',function(){returnToMainMenu(audio,socket)})

      document.getElementById('game-lost').className = 'modal'
    }else{
      audio.playSong('victory')
      //audio.stopAll()
      players[0].finalScore = (players[0].totalMoney + players[0].totalTowersBuilt + (players[0].totalTowersUpgraded * 2) + players[0].sent.total + (players[0].kills.total * 2) + (players[0].lives*100))
      document.getElementById("final-score").innerHTML = players[0].finalScore

      document.getElementById("your-gold-farmed-winner").innerHTML = players[0].totalMoney
      document.getElementById("enemy-gold-farmed-winner").innerHTML = players[1].totalMoney

      document.getElementById("your-total-income-winner").innerHTML = players[0].income
      document.getElementById("enemy-total-income-winner").innerHTML = players[1].income

      document.getElementById("your-lives-remaining-winner").innerHTML = players[0].lives
      document.getElementById("enemy-lives-remaining-winner").innerHTML = players[1].lives

      document.getElementById("your-towers-built-winner").innerHTML = players[0].totalTowersBuilt
      document.getElementById("enemy-towers-built-winner").innerHTML = players[1].totalTowersBuilt

      document.getElementById("your-towers-upgraded-winner").innerHTML = players[0].totalTowersUpgraded
      document.getElementById("enemy-towers-upgraded-winner").innerHTML = players[1].totalTowersUpgraded

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

      document.getElementById('game-won-submit').addEventListener('click',function(){saveScore(audio,socket,players)})
      document.getElementById('game-won').className = 'modal'
    }
    //audio.stop()

    // myKeyboard.removeAllListeners()
    // myMouse.removeAllListeners()
  }

  that.gameOver = function(){
    return gameVars.gameOver
  }

  function drawTutorial(renderer){

    let headerText = components.Text({
      text : "Welcome to Whacky Tacky Tower Defense!",
      font : '60px Oswald, sans-serif',
      fill : 'rgba(0, 0, 255, 1)',
      position : { x : 50, y : 0 }
    })

    let towerTut = components.BulbasaurHover({
      imageCenter: {x:100, y: 150}
    })

    let towerText1 = components.Text({
      text : "This is a tower. Build them in your area (the left side) to protect your eggs",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 160, y : 100 }
    })
    let towerText2 = components.Text({
      text : "from being stolen by your enemy!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 160, y : 140 }
    })

    let costText = components.Text({
      text : "This is the cost of a Tower or creep. You can't spend what you don't have!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 50, y : 250 }
    })

    let hotkeyText = components.Text({
      text : "This is a hot-key. You can use it instead of clicking the icon!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 140, y : 200 }
    })

    let creepTut = components.RocketMHover({
      imageCenter: {x: 850, y: 375}
    })

    let creepText1 = components.Text({
      text : "This is a creep. Send them to your enemy to steal their eggs! The",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 50, y : 325 }
    })

    let creepText2 = components.Text({
      text : "more creeps you send, the more money you will make!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 50, y : 365 }
    })

    let sampleGoldText = components.Text({
      text : "123",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 255, 1)',
      position : { x : 100, y : 450 }
    })

    let goldText1 = components.Text({
      text : "This is your gold. You need it to build towers, send creeps, and upgrade. You",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 450 }
    })

    let goldText2 = components.Text({
      text : "earn gold from killing enemy creeps and selling back your towers",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 490 }
    })

    let sampleIncomeText = components.Text({
      text : "17",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 255, 1)',
      position : { x : 100, y : 550 }
    })

    let incomeText1 = components.Text({
      text : "This is your income. Your gold will increase by this amount every",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 550 }
    })

    let incomeText2 = components.Text({
      text : "seven seconds. To raise your income, send more creeps!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 590 }
    })

    let livesText1 = components.Text({
      text : "These are your eggs. There are precious baby pokemon in there! If you let your",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 100, y : 630 }
    })

    let livesText2 = components.Text({
      text : "opponent steal all of them you lose!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 100, y : 670 }
    })


    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 20; j++){
        renderer.core.drawImage2({image: Demo.assets['buildingselectbggreen']},i*50,j*50,50,50,3)
      }
    }

    renderer.Text.render(headerText,3)

    renderer.TowerHover.render(towerTut,3)
    renderer.Text.render(towerText1,3)
    renderer.Text.render(towerText2,3)

    renderer.CreepsHover.render(creepTut,3)
    renderer.Text.render(creepText1,3)
    renderer.Text.render(creepText2,3)

    renderer.core.drawCurve(125,200,125,220,80,220,"rgba(255,0,0,1)",5,3)
    renderer.core.drawCircle2("rgba(255,0,0,1",{x: 137.5,y: 190}, 15,3)
    renderer.core.drawCircle2("rgba(0,0,255,1",{x: 887.5,y: 415}, 15,3)
    renderer.core.drawCurve(800,225,902.5,415,1100,255,"rgba(0,0,255,1)",5,3)
    renderer.Text.render(hotkeyText,3)

    renderer.core.drawCurve2(45,275,50,115,0,270,0,130,"rgba(255,0,0,1)",5,3)
    renderer.core.drawCircle2("rgba(255,0,0,1",{x: 57.5,y: 110}, 15,3)
    renderer.core.drawCircle2("rgba(0,0,255,1",{x: 807.5,y: 335}, 15,3)
    renderer.core.drawCurve(850,275,820,325,875,315,"rgba(0,0,255,1)",5,3)
    renderer.Text.render(costText,3)

    renderer.core.drawImage2({image: Demo.assets['gold']},50,450,50,50,3)
    renderer.Text.render(sampleGoldText,3)
    renderer.Text.render(goldText1,3)
    renderer.Text.render(goldText2,3)

    renderer.core.drawImage2({image: Demo.assets['income']},50,550,50,50,3)
    renderer.Text.render(sampleIncomeText,3)
    renderer.Text.render(incomeText1,3)
    renderer.Text.render(incomeText2,3)

    renderer.core.drawImage2({image: Demo.assets['egg']},50,650,50,50,3)
    renderer.Text.render(livesText1,3)
    renderer.Text.render(livesText2,3)

    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 50,725,100,100,3)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 150,725,100,100,3)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 250,725,100,100,3)
    renderer.core.drawImage2({image: Demo.assets['buildingselectbgpurple']}, 350,725,100,100,3)

    let sellStats = towerValues['Wartortle']
    let upgradeStats = towerValues['Blastoise']
    renderer.core.drawImage2({image: Demo.assets['wartortleHover']}, 50, 725, 100, 100, 3);
    renderer.core.drawImage2({image: Demo.assets['blastoiseHover']}, 250, 725, 100, 100, 3);

    let evolveText = components.Text({
      text : "Make your Towers more powerful by evolving",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 450, y : 715 }
    })

    let sellText = components.Text({
      text : "them so they can better protect the eggs! Sell",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 450, y : 755 }
    })

    let sellText2 = components.Text({
      text : "them if you need some gold!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 450, y : 795 }
    })

    sellStats.position = {x:150, y:725}
    upgradeStats.position = {x:350, y:725}
    renderer.core.drawTextSell(sellStats, 3)
    renderer.core.drawTextUpgrade(upgradeStats, 3)
    renderer.Text.render(evolveText,3)
    renderer.Text.render(sellText,3)
    renderer.Text.render(sellText2,3)

    renderer.core.drawImage2({image: Demo.assets['rock1']},850,875,50,50,3)
    renderer.core.drawImage2({image: Demo.assets['rock2']},900,875,50,50,3)
    renderer.core.drawImage2({image: Demo.assets['rock3']},850,925,50,50,3)
    renderer.core.drawImage2({image: Demo.assets['rock4']},900,925,50,50,3)
    renderer.core.drawImage2({image: Demo.assets['rock5']},800,900,50,50,3)

    let rockText = components.Text({
      text : "Rocks are randomly scattered throughout the map at the",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 865 }
    })

    let rockText2 = components.Text({
      text : "beginning of every game. You can't build towers on them,",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 905 }
    })

    let rockText3 = components.Text({
      text : " but watch out, Creeps can walk right over them!",
      font : '30px Oswald, sans-serif',
      fill : 'rgba(0, 0, 0, 1)',
      position : { x : 150, y : 945 }
    })


    renderer.Text.render(rockText,3)
    renderer.Text.render(rockText2,3)
    renderer.Text.render(rockText3,3)
  }

	return that;

}(Demo.input, Demo.components, Demo.audio));

function Player(){
  return{
    buildTowers: [],
    sendCreeps: [],
    attacks: [],
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
    pauseTime: 30000,
    gameStart: false,
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

function saveScore(audio,socket,players){

  // send score to server
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var myInit = { method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({name: document.getElementById('winner-name').value, score: players[0].finalScore})
  };

  fetch('/highScores',myInit)

  returnToMainMenu(audio,socket)
}

function returnToMainMenu(audio, socket){
  audio.stopAll()
  if(room != socket.id){
    socket.emit('leave room', {room: room})
  }
  var modals = document.getElementsByClassName('modal')
  for(let i = 0; i < modals.length; i++){
    modals[i].className = 'hidden'
  }
  document.getElementById('mask').className = 'hidden'
  location.reload(true)
}
