/**
 * Created by Steven on 4/12/2017.
 */

let Events = {}
let Components = require('./Components')


Events.process = function(event, emit){
  if(event.event == 'build'){

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
    else return true
  }
  else if(event.event == 'send'){

  }
  else if(event.event == 'upgrade'){

  }
  else if(event.event == 'sell'){

  }
  return true;
}

Events.AddTower = function(spec){
  var x = (spec.center.x - 100) / 50
  var y = (spec.center.y - 100) / 50

  console.log(x, y)
  console.log(spec.map)
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
  console.log(spec.map)
  spec.player.push(Components[spec.type]({
    spriteCenter: spec.center
  }))
  return true
}

module.exports = Events;