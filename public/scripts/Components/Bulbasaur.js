/**
 * Created by Steven on 4/11/2017.
 */

Demo.components.Bulbasaur = function(spec) {
  'use strict';
  var tower = null;

  tower = Demo.components.Tower({
    type: 'Bulbasaur',
    spriteSheetFront: Demo.assets['bulbasaur'],
    spriteSheetBack: Demo.assets['bulbasaur-back'],
    spriteCountFront: 19,
    spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19,14,16],
    spriteCountBack: 24,
    spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19,14,16,15,15,15,15,15],
    animationScale: 1.0,
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    attack:{
      damage: 5,
      speed: 300,
      timeSinceAttack: 0,
      range: 200
    }
  });

  spec.orientation = 0;

  return tower;
};
