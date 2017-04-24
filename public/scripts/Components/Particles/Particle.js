Demo.components.Particle = function(spec, center){
  'use strict';
	var image = null;

	var size = Random.nextGaussian(15,5)
  size = Math.max(1,size)
  image = {
    image: spec.image,
    imageSize: {width: size, height: size},
    imageCenter: spec.imageCenter,
    direction: Random.nextCircleVector(),
    speed: 200 / size + 40,
    lifetime: Random.nextGaussian(1, .5),
    alive: spec.alive
  }
  return image;
}


// Demo.components.Particle = function(spec, center){
//   'use strict';
//   var image = null;
//
//   image = {
//     image: spec.image,
//     imageSize: {width: 15, height: 15},
//     imageCenter: spec.imageCenter,
//     direction: Random.nextCircleVector(),
//     speed: Random.nextGaussian(40, 20),
//     lifetime: Random.nextGaussian(1, .5),
//     alive: spec.alive
//   }
//   return image;
// }
