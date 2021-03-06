Demo.components.StaticImage = function(spec) {
	'use strict';
	var frame = 0,
		that = {
			get image() { return spec.image; },
			get width() { return spec.imageSize.width; },
			get height() { return spec.imageSize.height; },
			get center() { return spec.imageCenter; },
			set center(val) {spec.imageCenter = val;},
			get range () { return spec.range; }
		};

	that.update = function(elapsedTime, center) {
		//spec.imageCenter = center;
  };

	return that;
};
