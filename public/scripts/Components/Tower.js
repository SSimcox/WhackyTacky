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
  var spriteFront = null,
    spriteBack = null,
    facingDown = true,
    that = {
      get type() { return spec.type },
      get center() { return sprite.center; },
      get sprite() { return facingDown ? spriteFront : spriteBack; },
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
    if(spec.spriteSheetBack != spec.spriteSheetFront) facingDown = false;
    spriteFront.update(elapsedTime, true);
    spriteBack.update(elapsedTime, true);
  };

  //
  // Get our animated bird model and renderer created
  spriteFront = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheetFront,
    spriteCount: spec.spriteCountFront,
    spriteTime: spec.spriteTimeFront,
    animationScale: spec.animationScale,
    spriteSize: { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter		// Maintain the center on the sprite
  });

  spriteBack = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheetBack,
    spriteCount: spec.spriteCountBack,
    spriteTime: spec.spriteTimeBack,
    animationScale: spec.animationScale,
    spriteSize: { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter		// Maintain the center on the sprite

  })

  return that;
};
