Demo.components.IvysaurHover = function(spec) {
  'use strict';
  var towerHover = null;
  // Get our animated bird model and renderer created
  towerHover = Demo.components.TowerHover({
    image: Demo.assets['ivysaurHover'],
    imageCenter: spec.imageCenter,
    cost: 10,
    hotkey: Persistance.getControls()['Bulbasaur'].substring(7),
    range: spec.range || undefined
  });

  spec.orientation = 0;

  return towerHover;
};
