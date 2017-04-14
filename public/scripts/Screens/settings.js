/**
 * Created by Steven on 4/14/2017.
 */

// ------------------------------------------------------------------
//
// The main menu
//
//
// ------------------------------------------------------------------
Game.screens['settings'] = (function(game) {
  'use strict';

  function initialize() {
    //
    // Setup each of menu events for the screens
    document.getElementById('id-configure').addEventListener(
      'click',
      function() {game.showScreen('configure'); });

    document.getElementById('id-settings-back').addEventListener(
      'click',
      function() { game.showScreen('main-menu'); });

  }

  function run() {
    //
  }

  return {
    initialize : initialize,
    run : run
  };
}(Game.game));
