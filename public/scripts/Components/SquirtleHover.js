Demo.components.SquirtleHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['squirtleHover'],
    imageCenter: spec.imageCenter
  });

  spec.orientation = 0;

  return towerHover;
};
