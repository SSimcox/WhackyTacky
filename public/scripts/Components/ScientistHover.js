Demo.components.ScientistHover = function(spec) {
  'use strict';
  var creepHover = null;
  // Get our animated bird model and renderer created
  creepHover = Demo.components.CreepsHover({
    image: Demo.assets['scientistHover'],
    imageCenter: spec.imageCenter,
    imageSize: spec.imageSize || undefined,
    cost: 10,
    hotkey: Persistance.getControls()['Scientist'].substring(7)
  });

  spec.orientation = 0;

  return creepHover;
};
