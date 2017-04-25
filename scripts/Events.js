/**
 * Created by Steven on 4/12/2017.
 */

let Events = {}
let Components = require('./Components')
let Path = require('./pathing')
let Towers = require('./towerData')

let towerCost = {
  Bulbasaur: 10,
  Squirtle: 12,
  Charmander: 15,
  Ivysaur: 30,
  Wartortle: 30,
  Charmeleon: 30,
  Venusaur: 120,
  Blastoise: 120,
  Charizard: 120
}
let creepCost = {
  RocketM: [5,1],
  Scientist: [10,2],
  Biker: [15,2],
  Eyepatch: [50,6]
}

Events.process = function(event, emit){
  if(event.event === 'build'){
    if(towerCost[event.type] > event.player.money) return false
    if(!Events.AddTower({
        type: event.type,
        center: event.center,
        player: event.player.towers,
        map: event.player.map
      })){
      emit('build failed')
      return false
    }
    else{
      event.player.money -= towerCost[event.type]
      event.player.paths = Path(event.player.map)
      for(let i = 0; i < event.player.creeps.length; i++){
        if(event.player.creeps[i].type === "deleted") continue
        //event.player.paths[i] = Path(event.player.map,event.player.creeps[i].center)//,event.player.path)
        event.player.creeps[i].stats.path = Path(event.player.map,event.player.creeps[i].center)
      }

      return true
    }
  }
  else if(event.event === 'send'){
    if(creepCost[event.type][0] > event.player.money) return false

    if(!Events.AddCreep({
        type: event.type,
        center: event.center,
        creeps: event.opponent.creeps,
        map: event.opponent.map,
        paths: event.opponent.paths,
        path: event.opponent.path,
        id: event.opponent.creepId
      })){
      emit('send failed')
      return false
    }
    else{
      event.opponent.creepId += 1
      event.player.money -= creepCost[event.type][0]
      event.player.income += creepCost[event.type][1]
      return true
    }
  }
  else if(event.event === 'upgrade'){
    console.log(towerCost[event.type], event.type, event.player.money)
    if(towerCost[event.type] > event.player.money) return false
    if(!Events.UpgradeTower({
          type: event.type,
          center: event.center,
          player: event.player.towers,
          towerId: event.tower
        })){
      emit('upgrade failed')
      return false
    }
    else{
      event.player.money -= towerCost[event.type]
      return true
    }
  }
  else if(event.event === 'sell'){

  }
  return true;
}

Events.AddTower = function(spec){
  var x = (spec.center.x) / 50
  var y = (spec.center.y - 100) / 50

  for(let i = y-1; i <= y; i++){
    for(let j = x-1; j <=x ; j++){
      if(spec.map[i][j] != -1) return false
    }
  }

  for(let i = y-1; i <= y; i++){
    for(let j = x-1; j <= x; j++){
      spec.map[i][j] = spec.player.length
    }
  }

  let path = Path(spec.map)
  if(!path){
    for(let i = y-1; i <= y; i++){
      for(let j = x-1; j <= x; j++){
        spec.map[i][j] = -1
      }
    }
    return false
  }

  console.log(spec.type)
  spec.player.push(Components.Tower(Towers[spec.type],spec.center))

  // spec.player.push(Components[spec.type]({
  //   spriteCenter: spec.center
  // }))
  return true
}

Events.AddCreep = function(spec){

  let path = Path(spec.map,spec.center)//,spec.path)
  spec.creeps.push(Components[spec.type]({
    id: spec.id,
    path: path,
    center: spec.center
  }))

  return true
}

Events.UpgradeTower = function(spec){
  spec.player[spec.towerId] = Components.Tower(Towers[spec.type], spec.center)
  return true;
}

Events.Kill = function(spec){
  spec.player.money += creepCost[spec.creep.type][1]*2
}

module.exports = Events;
