/**
 * Created by Steven on 4/12/2017.
 */

let Events = {}
let Components = require('./Components')

Events.AddTower = function(spec){
  spec.player.push(Components[spec.type]({
    spriteCenter: spec.center
  }))
}

module.exports = Events;