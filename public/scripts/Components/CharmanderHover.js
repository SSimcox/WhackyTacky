Demo.components.CharmanderHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['charmanderHover'],
    imageCenter: spec.imageCenter,
    cost: 15
  });

  spec.orientation = 0;

  return towerHover;
};
