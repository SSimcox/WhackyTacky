Demo.components.CharmeleonHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['charmeleonHover'],
    imageCenter: spec.imageCenter,
    cost: 15,
    hotkey: Persistance.getControls()['Charmander'].substring(7),
    range: spec.range || undefined
  });

  spec.orientation = 0;

  return towerHover;
};
