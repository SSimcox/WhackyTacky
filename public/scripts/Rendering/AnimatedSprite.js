// ------------------------------------------------------------------
//
// Rendering function for an /Components/AnimatedSprite object.
//
// ------------------------------------------------------------------
Demo.renderer.AnimatedSprite = (function(core) {
	'use strict';
	var that = {};

	that.render = function(sprite, p) {
		//
		// Pick the selected sprite from the sprite sheet to render
    // var bgColor = p == 0 ? "rgba(0,0,255,.5)" : "rgba(255,0,0,.5)"
    // core.drawRectangle(bgColor,sprite.center.x-50,sprite.center.y-50,100,100,false,p)

    if(!sprite.creep && !sprite.attack) {
      for (let i = sprite.center.y - sprite.height / 2; i <= sprite.center.y; i += sprite.height / 2) {
        for (let j = sprite.center.x - sprite.width / 2; j <= sprite.center.x; j += sprite.width / 2) {
          core.drawImage2({image: Demo.assets['grass']}, j, i, sprite.width / 2, sprite.height/2, p)
        }
      }
    }

		core.drawImage(
			sprite.spriteSheet,
			sprite.pixelWidth * sprite.sprite, sprite.pixelHeight * sprite.direction,	// Which sprite to pick out
			sprite.pixelWidth, sprite.pixelHeight,	// The size of the sprite in the sprite sheet
			sprite.center.x - sprite.width / 2,		// Where to draw the sprite
			sprite.center.y - sprite.height / 2,
			sprite.width, sprite.height,p);

	};


	return that;
}(Demo.renderer.core));
