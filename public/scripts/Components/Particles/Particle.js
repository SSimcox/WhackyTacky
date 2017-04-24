Demo.components.Particle = function(spec, center){
  'use strict';
	var image = null;

  image = {
    image: spec.image,
    imageSize: {width: 15, height: 15},
    imageCenter: spec.imageCenter,
    direction: Random.nextCircleVector(),
    speed: Random.nextGaussian(40, 20),
    lifetime: Random.nextGaussian(1, .5),
    alive: spec.alive
  }
  return image;
}
