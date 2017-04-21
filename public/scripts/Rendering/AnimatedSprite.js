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

		for(let i = sprite.center.y - 50; i <= sprite.center.y; i+= 50){
		  for(let j = sprite.center.x - 50; j <= sprite.center.x; j+= 50){
		    core.drawImage2({image:Demo.assets['grass']},j,i,50,50,p)
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
