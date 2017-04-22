Demo.components.BikerHover = function(spec) {
  'use strict';
  var creepHover = null;
  // Get our animated bird model and renderer created
  creepHover = Demo.components.CreepsHover({
    image: Demo.assets['bikerHover'],
    imageCenter: spec.imageCenter,
    imageSize: spec.imageSize || undefined,
    cost: 15
  });

  spec.orientation = 0;

  return creepHover;
};
