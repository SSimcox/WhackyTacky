/**
 * Created by Steven on 4/12/2017.
 */

let Events = require('./Events')
let Path = require('./pathing')

module.exports = function(player1, player2){
  'use strict';
  let players = {}
  players[player1] = {
    towers: [],
    creeps: [],
    map: [],
    money: 15,
    income: 1,
    lives: 10,
    path: []
  }
  players[player2] = {
    towers: [],
    creeps: [],
    map: [],
    money: 15,
    income: 1,
    lives: 10,
    path: []
  }

  let gameVars = {
    totalTime: 0,
    lastIncome: 0
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
      if(event.player === player1)
        event.opponent = players[player2]
      else
        event.opponent = players[player1]
      event.player = players[event.player]
      var success = Events.process(event,emit)
      if(success) {
        //if (event.type === 'build')
          sendUpdate = true

        // if (event.type === 'send') {
        //   if (event.player === player1)
        //     emit(JSON.stringify(that.sendCreepUpdate(player2)))
        //   else
        //     emit(JSON.stringify(that.sendCreepUpdate(player1)))
        // }
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
    gameVars.totalTime += elapsedTime
    if(Math.floor(gameVars.totalTime / 1000) % 7 === 0 && Math.floor(gameVars.totalTime / 1000) / 7 !== gameVars.lastIncome){
      players[player1].money += players[player1.income]
      players[player2].money += players[player2.income]
      gameVars.lastIncome = Math.floor(gameVars.totalTime / 1000) / 7
    }

    for(let key in players) {
      if(players.hasOwnProperty(key)) {
        resetMap(key)
        for (let i = 0; i < players[key].towers.length; i++) {
          if(players[key].towers[i] === "deleted") continue
          players[key].towers[i].update(elapsedTime, players[key].creeps)
          for(let k = players[key].towers[i].center.y/50-3; k <= players[key].towers[i].center.y/50-2; k++){
            for(let j = players[key].towers[i].center.x/50-1; j <= players[key].towers[i].center.x/50; j++){
              players[key].map[k][j] = i
            }
          }
          //do the attack, add update function with projectile component
        }
        for (let i = 0; i < players[key].creeps.length; i++) {
          if(players[key].creeps[i] === "deleted") continue
          players[key].creeps[i].update(elapsedTime)
          if(players[key].creeps[i].center.y > 100) {
            players[key].map[Math.floor(players[key].creeps[i].center.y / 50)-2][Math.floor(players[key].creeps[i].center.x / 50)] = (-i) - 2
          }else{
            players[key].lives--
            players[key].creeps[i].type = "deleted"
          }
        }
        players[key].path = Path(players[key].map)
      }
    }
    //if(update %1000 == 0) console.log(players[player1].map)
  };

  that.getModel = function(){
    // var ret = {}
    // for(var key in players){
    //   ret[key] = {
    //     towers: players[key].towers,
    //     creeps: players[key].creeps,
    //     map: players[key].map,
    //     money: players[key].money,
    //     income:players[key].income,
    //     lives: players[key].lives,
    //     path: players[key].path
    //   }
    // }
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
      for(let i = 0; i < players[key].towers.length; i++){
        if(players[key].towers[i].type === "deleted") {
          players[key].towers.splice(i, 1)
          i--
        }
      }
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
