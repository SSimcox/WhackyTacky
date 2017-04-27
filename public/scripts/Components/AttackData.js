/**
 * Created by Steven on 4/26/2017.
 */

/**
 * Created by Steven on 4/23/2017.
 */

Demo.components.AttackData = {}

Demo.components.AttackData.load = function() {
  Demo.components.AttackData = {
    'grass': {
      type: 'grass',
      spriteMove: Demo.assets['grass-hit'],
      spriteHit: Demo.assets['grass-hit'],
      spriteCountMove: 9,
      spriteTimeMove: [20, 20, 20, 20, 20, 20, 20, 20, 20],
      spriteCountHit: 9,
      spriteTimeHit: [20, 20, 20, 20, 20, 20, 20, 20, 20],
      spriteSize: {width: 75, height: 75},
      attack: {
        damage: 5,
        speed: 600,
        direction: {x: 0, y: 0}
      }
    },
    'fire': {
      type: 'fire',
      spriteMove: Demo.assets['fire-hit'],
      spriteHit: Demo.assets['fire-hit'],
      spriteCountMove: 4,
      spriteTimeMove: [50,50,50,50],
      spriteCountHit: 4,
      spriteTimeHit: [50,50,50,50],
      spriteSize: {width: 100, height: 100},
      attack: {
        damage: 5,
        speed: 600,
        direction: {x: 0, y: 0}
      }
    },
    'water': {
      type: 'water',
      spriteMove: Demo.assets['water-hit'],
      spriteHit: Demo.assets['water-hit'],
      spriteCountMove: 6,
      spriteTimeMove: [20, 20, 20, 20, 20, 20],
      spriteCountHit: 6,
      spriteTimeHit: [20, 20, 20, 20, 20, 20],
      spriteSize: {width: 100, height: 100},
      attack: {
        damage: 5,
        speed: 600,
        direction: {x: 0, y: 0}
      }
    },
    'keys': {
      'Bulbasaur': 'grass',
      'Ivysaur': 'grass',
      'Venusaur': 'grass',
      'Charmander': 'fire',
      'Charmeleon': 'fire',
      'Charizard': 'fire',
      'Squirtle': 'water',
      'Wartortle': 'water',
      'Blastoise': 'water'
    }
  }
  Demo.components.AttackData.load = this.load
}
