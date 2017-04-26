/**
 * Created by Steven on 4/12/2017.
 */

let Events = require('./Events')
let Path = require('./pathing')
let Components = require('./Components')
let Towers = require('./towerData')

var count = 0

module.exports = function(player1, player2){
  'use strict';
  let players = {}
  players[player1] = {}
  players[player2] = {}
  players.gameVars = {}


  let that = {};

  // ------------------------------------------------------------------
  //
  // This function initializes the input demo model.  Only thing it
  // does right now is to register the resize event with the renderer.
  //
  // ------------------------------------------------------------------
  that.initialize = function() {
    players.gameVars = GameVars()
    players[player1] = Player()
    players[player2] = Player()

    for(let i = 0; i < 16; i++){
      players[player1].map.push([])
      players[player2].map.push([])
      for(let j = 0; j < 20; j++){
        players[player1].map[i].push(-1)
        players[player2].map[i].push(-1)
      }
    }



    // Debugging check all images
    players[player1].towers.push(Components.Tower(Towers['Ivysaur'],{x:550, y: 350}))
    players[player1].towers.push(Components.Tower(Towers['Venusaur'],{x:150, y: 350}))

    players[player1].towers.push(Components.Tower(Towers['Charmeleon'],{x:550, y: 550}))
    players[player1].towers.push(Components.Tower(Towers['Charizard'],{x:150, y: 550}))

    players[player1].towers.push(Components.Tower(Towers['Wartortle'],{x:550, y: 750}))
    players[player1].towers.push(Components.Tower(Towers['Blastoise'],{x:150, y: 750}))

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
      if(event.player === player1)
        event.opponent = players[player2]
      else
        event.opponent = players[player1]
      event.playerVal = event.player
      event.player = players[event.player]

      event.gameVars = players.gameVars
      var success = Events.process(event,emit)
      if(success) {
        sendUpdate = true
      }
    }
    return sendUpdate
  }

  // ------------------------------------------------------------------
  //
  // This function is used to update the state of the demo model.
  //
  // ------------------------------------------------------------------

  that.update = function(elapsedTime) {
    if(!players.gameVars.gameOver && !players.gameVars.gamePaused) {
      if(players.gameVars.gameStarts <= 0) {
        players.gameVars.totalTime += elapsedTime
        if (Math.floor(players.gameVars.totalTime / 1000) % 7 === 0 && Math.floor(players.gameVars.totalTime / 1000) / 7 !== players.gameVars.lastIncome) {
          players[player1].money += players[player1].income
          players[player2].money += players[player2].income
          players[player1].totalMoney += players[player1].income
          players[player2].totalMoney += players[player2].income
          players.gameVars.lastIncome = Math.floor(players.gameVars.totalTime / 1000) / 7
        }

        for (let key in players) {
          if (key === 'gameVars') continue
          if (players.hasOwnProperty(key)) {
            resetMap(key)
            for (let i = 0; i < players[key].towers.length; i++) {
              if (players[key].towers[i].type === "deleted") continue
              let attackTarget = players[key].towers[i].update(elapsedTime, players[key].creeps)
              for (let k = players[key].towers[i].center.y / 50 - 3; k <= players[key].towers[i].center.y / 50 - 2; k++) {
                for (let j = players[key].towers[i].center.x / 50 - 1; j <= players[key].towers[i].center.x / 50; j++) {
                  players[key].map[k][j] = i
                }
              }
              //do the attack, add update function with projectile component
              if (attackTarget > -1 && players[key].creeps[attackTarget].type !== "deleted") {
                players[key].creeps[attackTarget].curHealth = players[key].towers[i].attack.damage
                if (players[key].creeps[attackTarget].stats.curHealth <= 0) {
                  Events.Kill({
                    player: players[key],
                    creep: players[key].creeps[attackTarget]
                  })
                  players[key].kills[players[key].creeps[attackTarget].type]++
                  players[key].creeps[attackTarget].type = "deleted"
                  players[key].creeps[attackTarget].killed = true
                  players[key].kills.total++
                }
              }
            }
            for (let i = 0; i < players[key].creeps.length; i++) {
              if (players[key].creeps[i].type === "deleted") continue
              players[key].creeps[i].update(elapsedTime)
              if (players[key].creeps[i].center.y > 100) {
                players[key].map[Math.floor(players[key].creeps[i].center.y / 50) - 2][Math.floor(players[key].creeps[i].center.x / 50)] = (-i) - 2
              } else {
                if (players[key].creeps[i].type !== "deleted")
                  players[key].lives--
                players[key].creeps[i].type = "deleted"
                console.log(players[key].lives)
                if (players[key].lives === 0) players.gameVars.gameOver = true
              }
            }
            players[key].path = Path(players[key].map)
          }
        }
      }
      else{
        players.gameVars.gameStarts -= elapsedTime
        if(players[player1].gameStart && players[player2].gameStart && players.gameVars.gameStarts > 3000){
          players.gameVars.gameStarts = 3000
        }
      }
    }
    if(players.gameVars.gamePaused){
        players[players.gameVars.playerPause].pauseTime -= elapsedTime
        if(players[players.gameVars.playerPause].pauseTime <= 0) players.gameVars.gamePaused = false
    }
  };

  that.isPaused = function(){
    return players.gameVars.gamePaused || players.gameVars.gameOver
  }

  that.isGameOver = function(){
    return players.gameVars.gameOver
  }

  that.timeTilStarted = function(){
    return players.gameVars.gameStarts
  }

  that.getModel = function(){
    return players
  }

  that.sendPaths = function(){
    return players
  }

  that.sendLastCreep = function(player){
    var ret = {}
    ret[player] = { creep: players[player].creeps[players[player].creeps.length - 1]}
    ret[player].creep.stats.path = players[player].paths[players[player].paths-1]
    return ret
  }

  that.cleanseModel = function(){
    for(var key in players){
      if(key === "gameVars") continue
      // for(let i = 0; i < players[key].towers.length; i++){
      //   if(players[key].towers[i].type === "deleted") {
      //     players[key].towers.splice(i, 1)
      //     i--
      //   }
      // }
      for(let i = 0; i < players[key].creeps.length; i++){
        if(players[key].creeps[i].type === "deleted") {
          players[key].creeps.splice(i, 1)
          i--
        }
      }
    }
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

  return that;
}

function Player(){
  return{
    towers: [],
    creeps: [],
    map: [],
    money: 250,
    totalMoney: 250,
    income: 1,
    lives: 10,
    path: [],
    creepId: 1,
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

function GameVars(){
  return{
    totalTime: 0,
    lastIncome: 0,
    gameOver: false,
    gamePaused: false,
    gameStarts: 30000,
    playerPause: 0
  }
}
