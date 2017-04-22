Demo.components.RocketM = function(spec) {
  'use strict';
  var creep = null;

  // Get our animated biker model and renderer created
  creep = Demo.components.Creep({
    type: 'RocketM',
    spriteSheet: Demo.assets['rocketM'],
    spriteCount: 4,
    spriteTime: [150, 150, 150, 150],
    animationScale: 1.0,
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    stats: spec.stats
  });

  spec.orientation = 0;

  return creep;
};
