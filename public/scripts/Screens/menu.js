/**
 * Created by Steven on 3/23/2017.
 */
// ------------------------------------------------------------------
//
// The main menu
//
//
// ------------------------------------------------------------------
Game.screens['main-menu'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens
    document.getElementById('id-new-game').addEventListener(
      'click',
      function() {game.showScreen('create-game'); });

    document.getElementById('id-find-game').addEventListener(
      'click',
      function() { game.showScreen('find-game'); });

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
