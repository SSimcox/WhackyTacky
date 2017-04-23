/**
 * Created by Steven on 4/12/2017.
 */

// ------------------------------------------------------------------
//
// Rendering function for an /Components/Tower object.
//
// ------------------------------------------------------------------
Demo.renderer.Creep = (function(core) {
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
  that.render = function(sprite, p) {
    //
    // Do any necessary rotation.
    core.saveContext(p);
    //core.rotateCanvas(sprite.center, sprite.rotation);


      let perHealth = sprite.stats.curHealth / sprite.stats.totalHealth
      let hColor = "rgba(0,255,30,1)"
      if(perHealth < .25)
        hColor = "rgba(255,30,30,1)"
      else if(perHealth < .5)
        hColor = "rgba(255,255,30,1)"
      Demo.renderer.core.drawRectangle(hColor,sprite.center.x - 24,sprite.center.y - 40, 48 * perHealth,10,false,p)
      Demo.renderer.core.drawRectangle("rgba(0,0,0,1)",sprite.center.x - 24,sprite.center.y - 40, 48,10,true,p)


    Demo.renderer.AnimatedSprite.render(sprite.sprite, p);

    //
    // This undoes the rotation very quickly
    core.restoreContext(p);
  };

  return that;
}(Demo.renderer.core));
