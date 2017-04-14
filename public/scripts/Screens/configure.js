/**
 * Created by Steven on 4/14/2017.
 */

/**
 * Created by Steven on 4/14/2017.
 */

// ------------------------------------------------------------------
//
// The main menu
//
//
// ------------------------------------------------------------------
Game.screens['configure'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens
    document.getElementById('id-save').addEventListener(
      'click',
      function() {  });

    document.getElementById('id-configure-back').addEventListener(
      'click',
      function() { game.showScreen('main-menu'); });

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
