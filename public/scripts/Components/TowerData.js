/**
 * Created by Steven on 4/23/2017.
 */

Demo.components.TowerData = {}
function load(){
  return
}
Demo.components.TowerData.load = function() {
  Demo.components.TowerData = {
    'Bulbasaur': {
      type: 'Bulbasaur',
      spriteSheetFront: Demo.assets['bulbasaur'],
      spriteSheetBack: Demo.assets['bulbasaur-back'],
      spriteCountFront: 19,
      spriteTimeFront: [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],//[15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 14, 16],
      spriteCountBack: 24,
      spriteTimeBack: [12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5],//[15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 14, 16, 15, 15, 15, 15, 15],
      animationScale: 1.0,
      spriteSize: {width: 75, height: 75},
      attack: {
        damage: 5,
        speed: 600,
        timeSinceAttack: 0,
        range: 200
      },
      typeUpgrade: 'Ivysaur'
    },
    'Ivysaur': {
      type: 'Ivysaur',
      spriteSheetFront: Demo.assets['ivysaur'],
      spriteSheetBack: Demo.assets['ivysaur-back'],
      spriteCountFront: 17,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19],
      spriteCountBack: 10,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180],
      animationScale: 1.0,
      spriteSize: {width: 85, height: 85},
      attack: {
        damage: 15,
        speed: 600,
        timeSinceAttack: 0,
        range: 200
      },
      typeUpgrade: 'Venusaur'
    },
    'Venusaur': {
      type: 'Venusaur',
      spriteSheetFront: Demo.assets['venusaur'],
      spriteSheetBack: Demo.assets['venusaur-back'],
      spriteCountFront: 12,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14],
      spriteCountBack: 18,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15],
      animationScale: 1.0,
      spriteSize: {width: 110, height: 110},
      attack: {
        damage: 45,
        speed: 600,
        timeSinceAttack: 0,
        range: 200
      },
      typeUpgrade: undefined
    },
    'Charmander': {
      type: 'Charmander',
      spriteSheetFront: Demo.assets['charmander'],
      spriteSheetBack: Demo.assets['charmander-back'],
      spriteCountFront: 19,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 14, 16],
      spriteCountBack: 18,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 14],
      animationScale: 1.0,
      spriteSize: {width: 75, height: 75},
      attack: {
        damage: 10,
        speed: 2000,
        timeSinceAttack: 0,
        range: 400
      },
      typeUpgrade: 'Charmeleon'
    },
    'Charmeleon': {
      type: 'Charmeleon',
      spriteSheetFront: Demo.assets['charmeleon'],
      spriteSheetBack: Demo.assets['charmeleon-back'],
      spriteCountFront: 17,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19],
      spriteCountBack: 16,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14],
      animationScale: 1.0,
      spriteSize: {width: 100, height: 100},
      attack: {
        damage: 25,
        speed: 2000,
        timeSinceAttack: 0,
        range: 400
      },
      typeUpgrade: 'Charizard'
    },
    'Charizard': {
      type: 'Charizard',
      spriteSheetFront: Demo.assets['charizard'],
      spriteSheetBack: Demo.assets['charizard-back'],
      spriteCountFront: 30,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 16, 14, 16, 18, 15, 14, 19, 14, 15, 15, 15, 15, 15],
      spriteCountBack: 35,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 16, 14, 16, 18, 15, 14, 19, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15,15],
      animationScale: 1.0,
      spriteSize: {width: 125, height: 125},
      attack: {
        damage: 57,
        speed: 2000,
        timeSinceAttack: 0,
        range: 400
      },
      typeUpgrade: undefined
    },
    'Squirtle': {
      type: 'Squirtle',
      spriteSheetFront: Demo.assets['squirtle'],
      spriteSheetBack: Demo.assets['squirtle-back'],
      spriteCountFront: 24,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19,15,15,15,15,15,15,15],
      spriteCountBack: 19,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15, 15],
      animationScale: 1.0,
      spriteSize: {width: 75, height: 75},
      attack: {
        damage: 5,
        speed: 300,
        timeSinceAttack: 0,
        range: 100
      },
      typeUpgrade: 'Wartortle'
    },
    'Wartortle': {
      type: 'Wartortle',
      spriteSheetFront: Demo.assets['wartortle'],
      spriteSheetBack: Demo.assets['wartortle-back'],
      spriteCountFront: 18,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15],
      spriteCountBack: 27,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      animationScale: 1.0,
      spriteSize: {width: 90, height: 90},
      attack: {
        damage: 15,
        speed: 300,
        timeSinceAttack: 0,
        range: 100
      },
      typeUpgrade: 'Blastoise'
    },
    'Blastoise': {
      type: 'Blastoise',
      spriteSheetFront: Demo.assets['blastoise'],
      spriteSheetBack: Demo.assets['blastoise-back'],
      spriteCountFront: 30,
      spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      spriteCountBack: 26,
      spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18, 15, 14, 19, 15, 15, 15, 15, 15, 15, 15, 15,15],
      animationScale: 1.0,
      spriteSize: {width: 100, height: 100},
      attack: {
        damage: 45,
        speed: 300,
        timeSinceAttack: 0,
        range: 100
      },
      typeUpgrade: undefined
    }
  }
  Demo.components.TowerData.load = this.load
}
