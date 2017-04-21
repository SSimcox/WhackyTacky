/**
 * Created by Steven on 4/12/2017.
 */

Demo.components.Creep = function(spec) {
  'use strict';
  var sprite = null,

    that = {
      get center() { return sprite.center; },
      get sprite() { return sprite; },
      get damage() { return spec.damage; },
      get stats() { return spec.stats; },
      set stats(val) {
        spec.stats = val;
      }
    };

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime) {
    sprite.center = {x: sprite.center.x + spec.stats.direction.x* (spec.stats.speed/elapsedTime),
                    y: sprite.center.y + spec.stats.direction.y* (spec.stats.speed/elapsedTime)}
    let val = 3;
    if(Math.abs(spec.stats.direction.x) > Math.abs(spec.stats.direction.y)){
      if(spec.stats.direction.x < 0){
        val = 1;
      }else{
        val = 2;
      }
    }else{
      if(spec.stats.direction.y >0){
        val = 0;
      }
    }
    sprite.direction = val;
    sprite.update(elapsedTime, true);
  };

  sprite = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheet,
    spriteCount: spec.spriteCount,
    spriteTime: spec.spriteTime,
    animationScale: spec.animationScale,
    spriteSize: { width: 48, height: 48},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    creep: true
  });

  return that;
};
