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
  spec.player.push(Components[spec.type]({
    spriteCenter: spec.center
  }))
  return true
}

module.exports = Events;