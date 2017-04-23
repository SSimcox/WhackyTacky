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
Components.AnimatedSprite = function (spec) {
  'use strict';
  var frame = 0,
    that = {
      get spriteSheet() {
        return spec.spriteSheet;
      },
      get pixelWidth() {
        return spec.spriteSheet.width / spec.spriteCount;
      },
      get pixelHeight() {
        return spec.spriteSheet.height;
      },
      get width() {
        return spec.spriteSize.width;
      },
      get height() {
        return spec.spriteSize.height;
      },
      get center() {
        return spec.spriteCenter;
      },
      get sprite() {
        return spec.sprite;
      }
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
  that.update = function (elapsedTime, forward) {
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
Components.Tower = function (spec) {
  'use strict';
  var facingDown = true,
    that = {
      get type() {
        return spec.type
      },
      get center() {
        return spec.spriteCenter;
      },
      get attack() {
        return spec.attack;
      }
    };

  //------------------------------------------------------------------
  //
  // The only update to do is to tell the underlying animated sprite
  // to update.
  //
  //------------------------------------------------------------------
  that.update = function (elapsedTime, creeps) {
    for(let i = 0; i < creeps.length; i++){
      // console.log('Distance: ', Math.sqrt(Math.pow(creeps[i].center.x-spec.spriteCenter.x, 2)+Math.pow(creeps[i].center.y -spec.spriteCenter.y, 2)))
      if(Math.sqrt(Math.pow(creeps[i].center.x-spec.spriteCenter.x, 2)+Math.pow(creeps[i].center.y -spec.spriteCenter.y, 2)) <= spec.attack.range){
        if(creeps[i].stats.path.length < shortestCreep){
          shortestCreepPath = creeps[i].stats.path.length
          shortestCreep = i;
        }
      }
    }
    //spec.attack.timeSinceAttack += elapsedTime;
  };

  return that;
};

Components.Bulbasaur = function (spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Components.Tower({
    type: 'Bulbasaur',
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    attack: {
      damage: 5,
      speed: 600,
      timeSinceAttack: 0,
      range: 200
    }
  });

  spec.orientation = 0;

  return tower;
};

Components.Charmander = function (spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Components.Tower({
    type: 'Charmander',
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    attack: {
      damage: 5,
      speed: 600,
      range: 200
    }
  });

  spec.orientation = 0;

  return tower;
};

Components.Squirtle = function (spec) {
  'use strict';
  var tower = null;

  // Get our animated bird model and renderer created
  tower = Components.Tower({
    type: 'Squirtle',
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    attack: {
      damage: 5,
      speed: 600,
      range: 200
    }
  });

  spec.orientation = 0;

  return tower;
};

Components.Creep = function (spec) {
  'use strict';
  var that = {
    get type() {
      return spec.type;
    },
    set type(val) {
      spec.type = val
    } ,
    get center() {
      return spec.spriteCenter;
    },
    get stats() {
      return spec.stats;
    },
    set stats(val) {
      spec.stats = val;
    }
    set curHealth(damage){
      spec.stats.curHealth -= damage;
    }
  };

  that.update = function (elapsedTime) {
    let destination = {x: 475, y: 75}

    if (spec.stats.path.length > 0) {
      destination = {x: spec.stats.path[0].x * 50 + 25, y: spec.stats.path[0].y * 50 + 125}
    }

    if (Math.abs(spec.spriteCenter.x - destination.x) < 5 && Math.abs(spec.spriteCenter.y - destination.y) < 5 && spec.stats.path.length > 0) {
      spec.stats.path.shift()
      if (spec.stats.path.length > 0) {
        destination = {x: spec.stats.path[0].x * 50 + 25, y: spec.stats.path[0].y * 50 + 125}
      }else{
        destination = {x: 475, y: 75}
      }
    }

    spec.stats.direction = normalize({x: destination.x - spec.spriteCenter.x, y: destination.y - spec.spriteCenter.y})

    spec.spriteCenter = {
      x: spec.spriteCenter.x + spec.stats.direction.x * (spec.stats.speed / elapsedTime),
      y: spec.spriteCenter.y + spec.stats.direction.y * (spec.stats.speed / elapsedTime)
    }

  };

  return that;
};

Components.RocketM = function (spec) {
  var creep = {}

  creep = Components.Creep({
    type: 'RocketM',
    spriteCenter: spec.center,
    stats: {
      totalHealth: 50,
      curHealth: 50,
      speed: 12,
      direction: {
        x: 0,
        y: 0
      },
      path: spec.path
    }
  })

  return creep
}

Components.Scientist = function (spec) {
  var creep = {}

  creep = Components.Creep({
    type: 'Scientist',
    spriteCenter: spec.center,
    stats: {
      totalHealth: 75,
      curHealth: 75,
      speed: 12,
      direction: {
        x: 0,
        y: 0
      },
      path: spec.path
    }
  })

  return creep
}

Components.Biker = function (spec) {
  var creep = {}

  creep = Components.Creep({
    type: 'Biker',
    spriteCenter: spec.center,
    stats: {
      totalHealth: 80,
      curHealth: 80,
      speed: 20,
      direction: {
        x: 0,
        y: 0
      },
      path: spec.path
    }
  })

  return creep
}

Components.Eyepatch = function (spec) {
  var creep = {}

  creep = Components.Creep({
    type: 'Eyepatch',
    spriteCenter: spec.center,
    stats: {
      totalHealth: 50,
      curHealth: 50,
      speed: 16,
      direction: {
        x: 0,
        y: 0
      },
      path: spec.path
    }
  })

  return creep
}

module.exports = Components;

function normalize(vec) {
  var length = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
  vec.x /= length
  vec.y /= length
  return vec
}
