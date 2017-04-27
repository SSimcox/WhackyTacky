
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
    if(image.range == undefined) {
      core.drawRectangle("rgba(0,0,0,1",
        image.center.x - 50,
        image.center.y - 50,
        100, 100, true, p);
    }
      core.restoreContext(p);

  }

  return that;
}(Demo.renderer.core));
