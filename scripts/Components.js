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
  var facingDown = true,
    that = {
      get type() { return spec.type},
      get center() { return spec.spriteCenter; },
      get attack() { return spec.attack; }
    };

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function(elapsedTime) {

  };

  return that;
};

Components.Bulbasaur = function(spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Components.Tower({
    type: 'Bulbasaur',
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
  tower = Components.Tower({
    type: 'Charmander',
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
  tower = Components.Tower({
    type: 'Squirtle',
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
  var that = {
      get center() { return sprite.center; },
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

  };

  //
  // Get our animated bird model and renderer created
  return that;
};

module.exports = Components;