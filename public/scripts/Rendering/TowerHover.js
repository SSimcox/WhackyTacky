
// ------------------------------------------------------------------
//
// Rendering function for a TowerHover object.
//
// ------------------------------------------------------------------
Demo.renderer.TowerHover = (function(core) {
  'use strict';
  var that = {};

  that.render = function(image, p) {
//    console.log(image)
    core.saveContext(p);
    image.bg = 'buildingselectbgblue'
    Demo.renderer.StaticImage.render(image,p);
    core.restoreContext(p);
  }

  return that;
}(Demo.renderer.core));
