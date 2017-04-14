Demo.renderer.StaticImage = (function(core) {
	'use strict';
	var that = {};

	that.render = function(image, p) {
    core.drawImage2(
      image.image ,
      image.center.x - image.image.width / 2,
      image.center.y - image.image.height / 2,
      image.image.width, image.image.height,p);
	};

	return that;
}(Demo.renderer.core));
