/**
 * Created by Steven on 4/24/2017.
 */

Demo.audio = (function(){
  var that = {}

  that.sounds = {}

  function loadSound(source) {
    let sound = new Audio();
    sound.addEventListener('canplay', function() {
       //console.log(`${source} is ready to play`);
    });
    sound.addEventListener('play', function() {
       //console.log(`${source} started playing`);
    });
    sound.addEventListener('canplaythrough', function() {
       //console.log(`${source} can play through`);
    });
    sound.addEventListener('progress', function() {
       //console.log(`${source} progress in loading`);
    });
    sound.addEventListener('timeupdate', function() {
      // console.log(`${source} time update: ${this.currentTime}`);
    });
    sound.src = source;
    return sound;
  }

  that.initialize = function(){
    // that.sounds['audio/sound-1'] = loadSound('audio/sound-1.mp3');
    // that.sounds['audio/sound-2'] = loadSound('audio/sound-2.mp3');
    that.sounds['battle'] = loadSound('/public/assets/audio/song1.ogg');
    that.sounds['battle'].addEventListener('timeupdate', function() {
      // console.log(`${source} time update: ${this.currentTime}`);
      if(Math.abs(this.currentTime - 75) < 1){this.currentTime = 15}
    });

    that.sounds['victory'] = loadSound('/public/assets/audio/victory.mp3')
    that.sounds['victory'].playbackRate = .8
    that.sounds['victory'].addEventListener('timeupdate', function() {
      // console.log(`${source} time update: ${this.currentTime}`);
      if(Math.abs(this.currentTime - 75) < 1){this.currentTime = 15}
    });

    that.sounds['defeat'] = loadSound('/public/assets/audio/defeat.mp3')
    that.sounds['defeat'].addEventListener('timeupdate', function() {
      // console.log(`${source} time update: ${this.currentTime}`);
      if(Math.abs(this.currentTime - 75) < 1){this.currentTime = 15}
    });

  }

  that.playSound = function(whichSound) {

    // that.sounds[whichSound].addEventListener('ended', function() {
    //   that.sounds[whichSound].play();
    // });


    that.sounds[whichSound].play();
  };

  that.playSong = function(whichSong){
    that.stopAll()
    that.sounds[whichSong].play()
  }

  that.stop = function(whichSound){
    that.sounds[whichSound].pause()
  }

  that.stopAll = function(){
    for(var key in that.sounds){
      if(that.sounds.hasOwnProperty(key)){
        that.sounds[key].pause()
      }
    }
  }

  return that
}())

Demo.audio.initialize()
