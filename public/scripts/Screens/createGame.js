/**
 * Created by Steven on 3/23/2017.
 */

// ------------------------------------------------------------------
//
// Create A game page
//
//
// ------------------------------------------------------------------
Game.screens['create-game'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens
    document.getElementById('id-start-game').addEventListener(
      'click',
      function() {
        requestGame(document.getElementById("room-name").value)
      });

    document.getElementById('id-create-back').addEventListener(
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
