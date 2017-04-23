Demo.components.TowerHover = function(spec) {
	'use strict';
	var image,
		text,
		hotkey,
		that = {
			get center() { return image.center},
			get image() { return image; },
			get cost() { return text; },
			get hotkey() { return hotkey; }
		};

		that.update = function(elapsedTime){
			//
		}

  text = Demo.components.Text({
    text : spec.cost,
    font : '16px Oswald, sans-serif',
    fill : 'rgba(255, 255, 255, 1)',
    position : { x : spec.imageCenter.x - 50, y : spec.imageCenter.y - 50 }
  })

	hotkey = Demo.components.Text({
    text : spec.hotkey,
    font : '16px Oswald, sans-serif',
    fill : 'rgba(255, 255, 0, 1)',
    position : { x : spec.imageCenter.x + 34, y : spec.imageCenter.y + 28 }
	})

		image = Demo.components.StaticImage({
			image: spec.image,
			imageSize: { width: 75, height: 75},
			imageCenter: spec.imageCenter,
			cost: spec.cost
		});
	return that;
};
