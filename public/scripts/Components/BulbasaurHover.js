Demo.components.BulbasaurHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['bulbasaurHover'],
    imageCenter: spec.imageCenter
  });

  spec.orientation = 0;

  return towerHover;
};