
// ------------------------------------------------------------------
//
// Rendering function for a TowerHover object.
//
// ------------------------------------------------------------------
Demo.renderer.TowerHover = (function(core) {
  'use strict';
  var that = {};

  that.render = function(image, p) {
    core.saveContext(p);
    Demo.renderer.StaticImage.render(image,p);
    core.restoreContext(p);
  }

  return that;
}(Demo.renderer.core));
