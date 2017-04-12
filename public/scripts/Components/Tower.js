/**
 * Created by Steven on 4/11/2017.
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
Demo.components.Tower = function(spec) {
  'use strict';
  var sprite = null,
    that = {
      get center() { return sprite.center; },
      get sprite() { return sprite; },
      get rotation() { return spec.rotation; },
      get damage() { return spec.damage; },
      get attack() { return spec.attack; }
    };

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime) {
    sprite.update(elapsedTime, true);
  };

  //
  // Get our animated bird model and renderer created
  sprite = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheet,
    spriteCount: spec.spriteCount,
    spriteTime: spec.spriteTime,
    animationScale: spec.animationScale,
    spriteSize: { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter		// Maintain the center on the sprite
  });

  return that;
};
