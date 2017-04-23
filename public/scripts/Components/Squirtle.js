/**
 * Created by Steven on 4/11/2017.
 */

Demo.components.Squirtle = function(spec) {
  'use strict';
  var tower = null;

  tower = Demo.components.Tower({
    type: 'Squirtle',
    spriteSheetFront: Demo.assets['squirtle'],
    spriteSheetBack: Demo.assets['squirtle'],
    spriteCountFront: 17,
    spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19],
    spriteCountBack: 17,
    spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19],
    animationScale: 1.0,
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    attack:{
      damage: 5,
      speed: 80,
      range: 1
    }
  });

  spec.orientation = 0;

  return tower;
};
