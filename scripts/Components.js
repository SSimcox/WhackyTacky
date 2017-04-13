/**
 * Created by Steven on 4/12/2017.
 */

let Components = {}

//------------------------------------------------------------------
//
// Defines an animated model object.  The spec is defined as:
// {
//		spriteSheet: Image,
//		spriteSize: { width: , height: },	// In world coordinates
//		spriteCenter: { x:, y: },			// In world coordinates
//		spriteCount: Number of sprites in the sheet,
//		spriteTime: [array of times (milliseconds) for each frame]
//		animationScale: (optional) Scaling factor for the spriteTime values
// }
//
//------------------------------------------------------------------
Components.AnimatedSprite = function(spec) {
  'use strict';
  var frame = 0,
    that = {
      get spriteSheet() { return spec.spriteSheet; },
      get pixelWidth() { return spec.spriteSheet.width / spec.spriteCount; },
      get pixelHeight() { return spec.spriteSheet.height; },
      get width() { return spec.spriteSize.width; },
      get height() { return spec.spriteSize.height; },
      get center() { return spec.spriteCenter; },
      get sprite() { return spec.sprite; }
    };

  //
  // Check to see if the frame animation times need to be scaled, and do so if necessary.
  if (spec.animationScale) {
    for (frame in spec.spriteTime) {
      spec.spriteTime[frame] *= spec.animationScale;
    }
  }

  //
  // Initialize the animation of the spritesheet
  spec.sprite = 0;		// Which sprite to start with
  spec.elapsedTime = 0;	// How much time has occured in the animation for the current sprite

  //------------------------------------------------------------------
  //
  // Update the animation of the sprite based upon elapsed time.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime, forward) {
    spec.elapsedTime += elapsedTime;
    //
    // Check to see if we should update the animation frame
    if (spec.elapsedTime >= spec.spriteTime[spec.sprite]) {
      //
      // When switching sprites, keep the leftover time because
      // it needs to be accounted for the next sprite animation frame.
      spec.elapsedTime -= spec.spriteTime[spec.sprite];
      //
      // Depending upon the direction of the animation...
      if (forward === true) {
        spec.sprite += 1;
        //
        // This provides wrap around from the last back to the first sprite
        spec.sprite = spec.sprite % spec.spriteCount;
      } else {
        spec.sprite -= 1;
        //
        // This provides wrap around from the first to the last sprite
        if (spec.sprite < 0) {
          spec.sprite = spec.spriteCount - 1;
        }
      }
    }
  };

  return that;
};

//------------------------------------------------------------------
//
// Defines a Tower component.  A tower contains an animated sprite.
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
Components.Tower = function(spec) {
  'use strict';
  var spriteFront = null,
    spriteBack = null,
    facingDown = true,
    that = {
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

Components.Bulbasaur = function(spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Demo.components.Tower({
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
      speed: 80,
      range: 1
    }
  });

  spec.orientation = 0;

  return tower;
};

Components.Charmander = function(spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Demo.components.Tower({
    spriteSheetFront: Demo.assets['charmander'],
    spriteSheetBack: Demo.assets['charmander'],
    spriteCountFront: 19,
    spriteTimeFront: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19,14,16],
    spriteCountBack: 19,
    spriteTimeBack: [15, 17, 16, 16, 170, 150, 160, 160, 160, 180, 16, 14, 16, 18,15,14,19,14,16],
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

Components.Squirtle = function(spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Demo.components.Tower({
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

Components.Creep = function(spec) {
  'use strict';
  var spriteFront = null,
    spriteBack = null,
    spriteLeft = null,
    spriteRight = null,
    facingDown = true,
    that = {
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
    sprite.update(elapsedTime, true);
  };

  //
  // Get our animated bird model and renderer created
  spriteFront = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheetFront,
    spriteCount: spec.spriteCount,
    spriteTime: spec.spriteTime,
    animationScale: spec.animationScale,
    spriteSize: { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter		// Maintain the center on the sprite
  });

  spriteBack = Demo.components.AnimatedSprite({
    spriteSheet: spec.spriteSheetBack,
    spriteCount: spec.spriteCount,
    spriteTime: spec.spriteTime,
    animationScale: spec.animationScale,
    spriteSize: { width: 75, height: 75},			// Maintain the size on the sprite
    spriteCenter: spec.spriteCenter		// Maintain the center on the sprite

  })

  return that;
};

module.exports = Components;