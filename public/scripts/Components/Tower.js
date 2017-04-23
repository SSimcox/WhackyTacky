/**
 * Created by Steven on 4/11/2017.
 */
Demo.components.Tower = function(spec) {
  'use strict';
  var spriteFront = null,
    spriteBack = null,
    facingDown = true,
    that = {
      get type() { return spec.type },
      get center() { return spriteFront.center; },
      get sprite() { return facingDown ? spriteFront : spriteBack; },
      get rotation() { return spec.rotation; },
      get damage() { return spec.damage; },
      get attack() { return spec.attack; },
      get timeSinceAttack() {return spec.timeSinceAttack},
      set timeSinceAttack(val) {spec.timeSinceAttack = val;}
    };
    spec.attack.target = -1

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime, creeps) {
    spec.attack.timeSinceAttack += elapsedTime;
    if(spec.spriteSheetBack != spec.spriteSheetFront) facingDown = false;
    spriteFront.update(elapsedTime, true);
    spriteBack.update(elapsedTime, true);
    if(spec.attack.timeSinceAttack > spec.attack.speed && (spec.attack.target < 0 || Math.sqrt(Math.pow(creeps[spec.attack.target].center.x-spec.spriteCenter.x, 2)+Math.pow(creeps[spec.attack.target].center.y -spec.spriteCenter.y, 2)) > spec.attack.range)){
    for(let i = 0; i < creeps.length; i++){
      // console.log('Distance: ', Math.sqrt(Math.pow(creeps[i].center.x-spec.spriteCenter.x, 2)+Math.pow(creeps[i].center.y -spec.spriteCenter.y, 2)))
      let shortestCreepPath = 400
      target = -1;
      if(Math.sqrt(Math.pow(creeps[i].center.x-spec.spriteCenter.x, 2)+Math.pow(creeps[i].center.y -spec.spriteCenter.y, 2)) <= spec.attack.range){
        console.log('attacking')
        if(creeps[i].stats.path.length < shortestCreep){
          shortestCreepPath = creeps[i].stats.path.length
          target = i;
        }
      }
    }
  }
    if(spec.attack.target !== -1){
      spec.attack.timeSinceAttack = spec.attack.timeSinceAttack - spec.attack.speed
    }
    return creeps[spec.attack.target]
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
