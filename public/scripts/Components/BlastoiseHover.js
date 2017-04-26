Demo.components.BlastoiseHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['blastoiseHover'],
    imageCenter: spec.imageCenter,
    cost: 12,
    hotkey: Persistance.getControls()['Squirtle'].substring(7),
    range: spec.range || undefined
  });

  spec.orientation = 0;

  return towerHover;
};
