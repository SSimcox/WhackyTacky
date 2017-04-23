Demo.components.RocketMHover = function(spec) {
  'use strict';
  var creepHover = null;
  // Get our animated bird model and renderer created
  creepHover = Demo.components.CreepsHover({
    image: Demo.assets['rocketMHover'],
    imageCenter: spec.imageCenter,
    imageSize: spec.imageSize || undefined,
    cost: 5,
    hotkey: Persistance.getControls()['Rocket'].substring(7)
  });

  spec.orientation = 0;

  return creepHover;
};
