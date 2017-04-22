
// ------------------------------------------------------------------
//
// Rendering function for a TowerHover object.
//
// ------------------------------------------------------------------
Demo.renderer.CreepsHover = (function(core) {
  'use strict';
  var that = {};

  that.render = function(image, p) {
    core.saveContext(p);
    image.bg = 'buildingselectbgred'
    Demo.renderer.StaticImage.render(image,p);
    core.restoreContext(p);
  }

  return that;
}(Demo.renderer.core));
