Demo.renderer.Particle(){
  function ParticleSystem(){
    var that = {}
    that.particles = []
    that.ParticleEmitter = function(spec,creep){

      for(let i = 0; i < 15; i++){
        let dir;
        dir = {x: ball.direction.x + dir.x, y: ball.direction.y - dir.y}
        normalize(dir)
        let r = Random.nextGaussian(5,1)
        that.particles.push(Graphics.Circle({
          center: {x: Random.nextRange(spec.model.pos.x, spec.model.pos.x + spec.model.height), y: Random.nextRange(spec.model.pos.y, spec.model.pos.y + spec.model.width)},
          radius: r,
          color: colors[Math.floor(spec.model.row/2)],
          speed: ball.speed / r * 2,
          direction: dir
        }))
        that.particles[that.particles.length - 1].timeLeft = Random.nextRange(500, 1000)
      }
    }

    that.update = function(elapsedTime){
      if(that.particles.length > 30){
        console.log(that.particles.length)
      }
      for(let i = 0; i < that.particles.length; i++){
        that.particles[i].timeLeft -= elapsedTime
        if(that.particles[i].timeLeft > 1000){
          console.log(i,":", that.particles[i].timeLeft)
        }
        that.particles[i].update(elapsedTime)
        if(that.particles[i].timeLeft <= 0){
          that.particles.splice(i,1)
          i--
        }
      }
    }

    that.draw = function(){
      for(let i = 0; i < that.particles.length; i++){
        that.particles[i].draw()
      }
    }

    return that;
  }
}(Demo.renderer.core)
