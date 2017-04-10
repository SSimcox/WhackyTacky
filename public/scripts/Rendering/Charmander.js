/**
 * Created by Steven on 4/10/2017.
 */

// ------------------------------------------------------------------
//
// Rendering function for an /Components/Bird object.
//
// ------------------------------------------------------------------
Demo.renderer.Charmander = (function(core) {
  'use strict';
  var that = {};

  // ------------------------------------------------------------------
  //
  // Renders a Bird model.  Because the model can be rotated, that needs
  // to be done here, because the underlying animated sprite doesn't know
  // anything about rotation.
  //
  // ------------------------------------------------------------------
  that.render = function(sprite) {
    //
    // Do any necessary rotation.
    core.saveContext();
    core.rotateCanvas(sprite.center, sprite.rotation);

    Demo.renderer.AnimatedSprite.render(sprite.sprite);

    //
    // This undoes the rotation very quickly
    core.restoreContext();
  };

  return that;
}(Demo.renderer.core));
