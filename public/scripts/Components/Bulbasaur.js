/**
 * Created by Steven on 4/11/2017.
 */
/**
 * Created by Steven on 4/10/2017.
 */

//------------------------------------------------------------------
//
// Defines a Bird component.  A bird contains an animated sprite.
// The sprite is defined as:
//	{
//		size: { width: , height: },	// In world coordinates
//		center: { x: , y: }			// In world coordinates
//		rotation: 					// In Radians
//		moveRate: 					// World units per second
//		rotateRate:					// Radians per second
//		animationScale:				// (optional) Scaling factor for the frame animation times
//	}
//
//------------------------------------------------------------------
Demo.components.Bulbasaur = function(spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Demo.components.Tower({
    spriteSheet: Demo.assets['bulbasaur'],
    spriteCount: 19,
    spriteTime: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19,14,16],
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
