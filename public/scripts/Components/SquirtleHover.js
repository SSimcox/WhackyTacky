Demo.components.SquirtleHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['squirtleHover'],
    imageCenter: spec.imageCenter,
    cost: 12,
    hotkey: Persistance.getControls()['Squirtle'].substring(7),
    range: spec.range || undefined
  });

  spec.orientation = 0;

  return towerHover;
};
