/**
 * Created by Steven on 4/26/2017.
 */

Game.screens['scores'] = (function(game) {
  'use strict';

  let scores = []

  function initialize() {
    //
    // Setup each of menu events for the screens

  fetch('/highScores',{
    method: 'GET',
    headers: {'Accept': 'application/json'}
  }).then(function(data) {
    return data.json()
  }).then(function(body){
    scores = String.fromCharCode(...body.data)
    scores = JSON.parse(scores)
    scores.sort((a,b)=> b.score - a.score)
  })

    document.getElementById('id-scores-back').addEventListener(
      'click',
      function() { game.showScreen('main-menu'); });

  }

  function run() {
    //
    // I know this is empty, there isn't anything to do.
    console.log(scores)
    document.getElementById('score-table').innerHTML = ""
    var table = document.createElement("table")
    table.innerHTML += "<thead><th>Name</th><th>Score</th></thead><tbody>"
    for(let i = 0; i < scores.length; i++){
      table.innerHTML += `<tr><td>${scores[i].name}</td><td>${scores[i].score}</td>`
    }
    table.innerHTML += "</tbody>"
    document.getElementById('score-table').appendChild(table)
  }

  return {
    initialize : initialize,
    run : run
  };
}(Game.game));
