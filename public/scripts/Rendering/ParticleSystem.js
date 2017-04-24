Demo.renderer.ParticleSystem = (function(core) {
  'use strict';
  var that = {};
  that.render = function(image, p){
    // console.log('image: ', image)
    let particles = image.getParticlesToRender();
    for(let par in particles){
      core.drawImage2(
        particles[par],
        particles[par].imageCenter.x - particles[par].imageSize.width / 2,
        particles[par].imageCenter.y - particles[par].imageSize.height / 2,
        particles[par].imageSize.width, particles[par].imageSize.height, p);
    }
  };

  return that;
}(Demo.renderer.core));
