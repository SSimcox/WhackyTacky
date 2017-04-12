/**
 * Created by Steven on 3/23/2017.
 */

// ------------------------------------------------------------------
//
// Starting Point of our game
// Globals and menuing start here
//
// ------------------------------------------------------------------

var myOffset = {x:0,y:0}
var yourOffset = {x:0,y:0}
var scaleOffset = 1

Demo = {
  input: {},
  components: {},
  renderer: {},
  assets: {},
  main: {}
};

let Game = {
  screens: {}
}

Game.game = (function(screens) {
  'use strict';

  //------------------------------------------------------------------
  //
  // This function is used to change to a new active screen.
  //
  //------------------------------------------------------------------
  function showScreen(id) {
    var screen = 0,
      active = null;
    //
    // Remove the active state from all screens.  There should only be one...
    active = document.getElementsByClassName('active');
    for (screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove('active');
    }
    //
    // Tell the screen to start actively running
    screens[id].run();
    //
    // Then, set the new screen to be active
    document.getElementById(id).classList.add('active');
  }

  //------------------------------------------------------------------
  //
  // This function performs the one-time game initialization.
  //
  //------------------------------------------------------------------
  function initialize() {

    var screen = null;
    //
    // Go through each of the screens and tell them to initialize
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize();
      }
    }

    //
    // Make the main-menu screen the active one
    showScreen('main-menu');

    var myCanvas = document.getElementById('my-canvas')
    var yourCanvas = document.getElementById('your-canvas')

    myCanvas.width = yourCanvas.width = 1000;
    myCanvas.height = yourCanvas.height = 1000;
    resizeCanvas(myCanvas, myOffset)
    resizeCanvas(yourCanvas, yourOffset)
    window.onresize = function(){
      resizeCanvas(myCanvas, myOffset)
      resizeCanvas(yourCanvas, yourOffset)
    }
    window.onclick = function(event){
      let x = (event.pageX - myOffset.x) / scaleOffset
      let y = (event.pageY - myOffset.y) / scaleOffset
      console.log(`x: ${x}`)
      console.log(`y: ${y}`)
    }
  }

  return {
    initialize : initialize,
    showScreen : showScreen
  };
}(Game.screens));

function resizeCanvas(canvas, offset){
  var h = window.innerHeight
  var w = window.innerWidth
  if(window.innerHeight * 2 < window.innerWidth){
    canvas.style.height = "90vh";
    canvas.style.width = "90vh";
    offset.x = (w - (2*h*.9))/4
    scaleOffset = window.innerHeight * .9 / 1000
  }
  else{
    canvas.style.height = "45vw";
    canvas.style.width = "45vw";
    offset.x = ((w - (2*w*.45))/4)
    scaleOffset = window.innerWidth * .45 / 1000
  }
  offset.y = .05 * h

}