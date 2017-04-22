Demo.components.ScientistHover = function(spec) {
  'use strict';
  var creepHover = null;
  // Get our animated bird model and renderer created
  creepHover = Demo.components.CreepsHover({
    image: Demo.assets['scientistHover'],
    imageCenter: spec.imageCenter,
    imageSize: spec.imageSize || undefined,
    cost: 10
  });

  spec.orientation = 0;

  return creepHover;
};
