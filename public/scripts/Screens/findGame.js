/**
 * Created by Steven on 3/23/2017.
 */

// ------------------------------------------------------------------
//
// Find a Game Page
//
//
// ------------------------------------------------------------------
Game.screens['find-game'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens

    document.getElementById('id-find-back').addEventListener(
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