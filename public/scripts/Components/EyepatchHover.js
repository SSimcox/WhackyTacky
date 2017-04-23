Demo.components.EyepatchHover = function(spec) {
  'use strict';
  var creepHover = null;
  // Get our animated bird model and renderer created
  creepHover = Demo.components.CreepsHover({
    image: Demo.assets['eyepatchHover'],
    imageCenter: spec.imageCenter,
    imageSize: spec.imageSize || undefined,
    cost: 50,
    hotkey: Persistance.getControls()['Pirate'].substring(7)
  });

  spec.orientation = 0;

  return creepHover;
};
