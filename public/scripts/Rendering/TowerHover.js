
// ------------------------------------------------------------------
//
// Rendering function for a TowerHover object.
//
// ------------------------------------------------------------------
Demo.renderer.TowerHover = (function(core) {
  'use strict';
  var that = {};

  that.render = function(image) {
    core.saveContext();
    Demo.renderer.StaticImage.render(image);
    core.restoreContext();
  }

  return that;
}(Demo.renderer.core));
