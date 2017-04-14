Demo.components.TowerHover = function(spec) {
	'use strict';
	var image,
		that = {
			get center() { return image.center},
			get image() { return image; }
		};

		that.update = function(elapsedTime){
			//
		}

		image = Demo.components.StaticImage({
			image: spec.image,
			imageSize: { width: 75, height: 75},
			imageCenter: spec.imageCenter
		});
	return that;
};
