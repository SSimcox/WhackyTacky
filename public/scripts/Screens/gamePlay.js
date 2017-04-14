/**
 * Created by Steven on 3/23/2017.
 */

// ------------------------------------------------------------------
//
// Game play page
//
//
// ------------------------------------------------------------------
Game.screens['game-play'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens
    document.getElementById('my-canvas').addEventListener('click', socket.changeMyColor)

  }

  function run() {
    //
    // I know this is empty, there isn't anything to do.
  }

  return {
    initialize : initialize,
    run : run
  };
}(Game.game));