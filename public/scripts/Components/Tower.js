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
    let returnTarget = -1

    if (spec.attack.timeSinceAttack > spec.attack.speed) {
      var sameTarget = false
      if (spec.attack.target > 0) {
        for (let i = 0; i < creeps.length; i++) {
          if (creeps[i].id === spec.attack.target && creeps[i].type !== "deleted" && distance(creeps[i].center, spec.spriteCenter) < spec.attack.range) {
            sameTarget = true
            returnTarget = i
          }
        }
      }

      if (!sameTarget) {
        spec.attack.target = -1;
        let shortestCreepPath = 400
        for (let i = 0; i < creeps.length; i++) {
          if (distance(creeps[i].center, spec.spriteCenter) <= spec.attack.range) {
            if (creeps[i].stats.path.length < shortestCreepPath) {
              shortestCreepPath = creeps[i].stats.path.length
              spec.attack.target = creeps[i].id;
              returnTarget = i
            }
          }
        }
      }
    }
    if (returnTarget !== -1) {
      spec.attack.timeSinceAttack = 0
      spriteFront.update(elapsedTime, true);
      spriteBack.update(elapsedTime, true);
    }else{
        spriteFront.update(elapsedTime, false);
        spriteBack.update(elapsedTime, false);
    }


    facingDown = true;
    if (spec.spriteSheetBack !== spec.spriteSheetFront) {
      if (spec.attack.target > 0) {
        for (let i = 0; i < creeps.length; i++) {
          if (creeps[i].id === spec.attack.target && creeps[i].type !== "deleted" && distance(creeps[i].center, spec.spriteCenter) < spec.attack.range) {
            if(creeps[i].center.y < spec.spriteCenter.y)
            facingDown = false;
          }
        }
      }
    }


    return returnTarget
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

function distance(a,b){
  return Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2))
}