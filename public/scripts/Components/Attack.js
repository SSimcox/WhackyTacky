/**
 * Created by Steven on 4/26/2017.
 */

Demo.components.Attack = function(spec, center) {
  'use strict';
  var sprite = null,
    that = {
      get center() { return sprite.center; },
      get sprite() { return sprite },
      get rotation() { return spec.rotation; },
      get damage() { return spec.damage; },
      get attack() { return spec.attack; },
      get spriteSize() { return spec.spriteSize}
    };
  spec.attacking = false

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime) {
    if(!spec.attacking) {
      spec.attacking = true
      return sprite.update(elapsedTime, true)
    }
    else
      return sprite.update(elapsedTime)
  };

  //
  // Get our animated bird model and renderer created
  sprite = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteHit,
    spriteCount: spec.spriteCountHit,
    spriteTime: spec.spriteTimeHit,
    animationScale: spec.animationScale,
    spriteSize: spec.spriteSize || { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: center,		// Maintain the center on the sprite
    attack: true
  });

  return that;
};