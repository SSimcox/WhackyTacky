Demo.components.Scientist = function(spec) {
  'use strict';
  var creep = null;

  // Get our animated biker model and renderer created
  creep = Demo.components.Creep({
    type: 'Scientist',
    spriteSheet: Demo.assets['scientist'],
    spriteCount: 4,
    spriteTime: [150, 150, 150, 150],
    animationScale: 1.0,
    spriteCenter: spec.spriteCenter,		// Maintain the center on the sprite
    stats: spec.stats,
    id: spec.id
  });

  spec.orientation = 0;

  return creep;
};
