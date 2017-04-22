/**
 * Created by Steven on 4/12/2017.
 */

let Events = {}
let Components = require('./Components')
let Path = require('./pathing')
let towerCost = {
  Bulbasaur: 10,
  Squirtle: 12,
  Charmander: 15,
  Ivysaur: 30,
  Wartortle: 30,
  Charmeleon: 30,
  Venosaur: 120,
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
    //if(towerCost[event.type] > event.player.money) return false
    if(!Events.AddTower(
      {
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
      return true
    }
  }
  else if(event.event === 'send'){
    //if(creepCost[event.type][0] > event.player.money) return false

    if(!Events.AddCreep({
        type: event.type,
        center: event.center,
        creeps: event.opponent.creeps,
        map: event.opponent.map
      })){
      emit('send failed')
      return false
    }
    else{
      event.player.money -= creepCost[event.type][0]
      event.player.interest += creepCost[event.type][1]
      return true
    }
  }
  else if(event.event === 'upgrade'){
    //if(towerCost[event.type] > event.player.money) return false
    if(!Events.UpgradeTower(
        {
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

  //console.log(x, y)
  //console.log(spec.map)
  for(let i = y-1; i <= y; i++){
    for(let j = x-1; j <=x ; j++){
      if(spec.map[i][j] > -1) return false
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

  spec.player.push(Components[spec.type]({
    spriteCenter: spec.center
  }))
  return true
}

Events.AddCreep = function(spec){

  var path = Path(spec.map,spec.center)

  spec.creeps.push(Components[spec.type]({
    center: spec.center,
    path: path
  }))
  return true
}

Events.UpgradeTower = function(spec){}

module.exports = Events;
