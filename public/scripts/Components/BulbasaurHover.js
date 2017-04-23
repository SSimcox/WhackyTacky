Demo.components.BulbasaurHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['bulbasaurHover'],
    imageCenter: spec.imageCenter,
    cost: 10,
    hotkey: Persistance.getControls()['Bulbasaur'].substring(7)
  });

  spec.orientation = 0;

  return towerHover;
};
