/**
 * Created by Steven on 4/12/2017.
 */

// ------------------------------------------------------------------
//
// Rendering function for an /Components/Tower object.
//
// ------------------------------------------------------------------
Demo.renderer.Tower = (function(core) {
  'use strict';
  var that = {};

  // ------------------------------------------------------------------
  //
  // Renders a Tower model.  Because the model can be facing down or up,
  // that needs to be done here, because the underlying animated sprite
  // doesn't know anything about changing the way it faces.
  // Maybe should be done in Tower component update function?
  //
  // ------------------------------------------------------------------
  that.render = function(sprite) {
    //
    // Do any necessary rotation.
    core.saveContext();
    //core.rotateCanvas(sprite.center, sprite.rotation);

    Demo.renderer.AnimatedSprite.render(sprite.sprite);

    //
    // This undoes the rotation very quickly
    core.restoreContext();
  };

  return that;
}(Demo.renderer.core));
