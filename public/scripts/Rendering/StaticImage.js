Demo.renderer.StaticImage = (function(core) {
	'use strict';
	var that = {};

	that.render = function(image, p) {
		if(image.range != undefined){
			console.log('hovering')
			core.drawImage2({image:Demo.assets[image.bg]},image.center.x-50,image.center.y-50,100,100,p)

			core.drawText(image.cost,p)
			core.drawText(image.hotkey,p)
			core.drawCircle(
				'#ff0000',
				image.center,
				image.range,
				p
			)
			core.drawImage2(
				image.image ,
				image.center.x - image.image.width / 2,
				image.center.y - image.image.height / 2,
				image.image.width, image.image.height,p);
		}else{

			core.drawImage2({image:Demo.assets[image.bg]},image.center.x-50,image.center.y-50,100,100,p)

			core.drawText(image.cost,p)
			core.drawText(image.hotkey,p)
			core.drawImage2(
				image.image ,
				image.center.x - image.image.width / 2,
				image.center.y - image.image.height / 2,
				image.image.width, image.image.height,p);
			}
	}

	return that;
}(Demo.renderer.core));
