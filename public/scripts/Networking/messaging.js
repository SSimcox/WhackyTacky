/**
 * Created by Steven on 3/23/2017.
 */

var room
var Socket = function(Main) {
  var socket = io()

  socket.on('connect', function () {
    console.log(socket.id)
  })

  socket.on('change color', changeYourColor)

  socket.on('start game', function (roomName) {
    Game.game.showScreen("game-play")
    room = roomName
    Main.initialize()
  })

  socket.on('list games', function (list) {
    console.log("list games")
    var element = document.getElementById("available-games")
    element.innerHTML = ""
    for (let i = 0; i < list.length; ++i) {
      element.innerHTML += `<li><button id = "${list[i].id}">${list[i].name}</button><input id="${list[i].name}" type="hidden" value="${list[i].id}"></li>`
      document.getElementById(list[i].id).addEventListener('click', function () {
        socket.emit('join game', list[i].id)
      })
    }
  })

  socket.on('player left', function () {
    Game.game.showScreen('main-menu')
  })

  socket.on('update', function(message){
    Demo.model.diffModels(message)
    console.log(message)
  })

  return socket
}