Demo.components.ParticleSystem = function(spec){
  'use strict';
	var that = {},
		nextName = 1,	// unique identifier for the next particle
		particles = {}	// Set of all active particles

	//------------------------------------------------------------------
	//
	// This creates one new particle
	//
	//------------------------------------------------------------------
	that.create = function() {
		console.log('creating particles')
    let image = [Demo.assets['pokeball'], Demo.assets['pokeballred']];
		for(let i = 0; i < 50; ++i){
			var p = Demo.components.Particle({
				image: image[i%2],
				imageCenter: {x: spec.center.x, y: spec.center.y}, // How long the particle should live, in seconds
				alive: 0	// How long the particle has been alive, in seconds
			});
			p.size = Math.max(1, p.size);
			// Same thing with lifetime
			p.lifetime = Math.max(0.01, p.lifetime);
			// Assign a unique name to each particle
			particles[nextName++] = p;

		}
	};

	that.getDimensions = function(){
    for(let x in particles){return false}
    return true
	}

	that.update = function(elapsedTime) {
		var removeMe = [],
			value,
			particle;
		// We work with time in seconds, elapsedTime comes in as milliseconds
		elapsedTime = elapsedTime / 1000;

		for (value in particles) {
			if (particles.hasOwnProperty(value)) {
				particle = particles[value];
				// Update how long it has been alive
				particle.alive += elapsedTime;
				// Update its position
				particle.imageCenter.x += (elapsedTime * particle.speed * particle.direction.x);
				particle.imageCenter.y += (elapsedTime * particle.speed * particle.direction.y);
//				particle.rotation += particle.speed / 500;
				if (particle.alive > particle.lifetime) {
					removeMe.push(value);
				}
			}
		}

		// Remove all of the expired particles
	   for (particle = 0; particle < removeMe.length; particle++) {
			delete particles[removeMe[particle]];
	   }
		removeMe.length = 0;
	};

	that.getParticlesToRender = function() {
    return particles
	};

	that.returnParticles = function(){
		for(var prop in particles){
			if(particles.hasOwnProperty(prop)){
				return true;
			}
		}
		return false;
	}

	return that;
}
