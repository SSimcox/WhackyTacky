/**
 * Created by Steven on 3/23/2017.
 */

var socket = io()
var room
socket.on('connect',function(){console.log(socket.id)})



socket.on('change color',changeYourColor)

function changeYourColor(colorString){
  var context = document.getElementById("your-canvas").getContext("2d")
  context.save()
  context.fillStyle = colorString
  context.fillRect(0,0,context.canvas.width,context.canvas.height)
  context.restore()
}

function changeMyColor(){
  var context = document.getElementById("my-canvas").getContext("2d")
  var r = Math.floor(Math.random() * 255)
  var g = Math.floor(Math.random() * 255)
  var b = Math.floor(Math.random() * 255)
  var colorString = `rgb(${r},${g},${b})`
  context.save()
  context.fillStyle = colorString
  context.fillRect(0,0,context.canvas.width,context.canvas.height)
  context.restore()
  socket.emit('change color', {colorString: colorString, id:room})
}

function requestGame(roomName){
  socket.emit('request room', roomName)
  console.log("request Sent")
}

socket.on('start game', function(roomName){
  Game.game.showScreen("game-play")
  room = roomName
})

socket.on('list games',function(list){
  console.log(list)
  var element = document.getElementById("available-games")
  element.innerHTML = ""
  for(let i = 0; i < list.length; ++i){
    element.innerHTML += `<li><button id = "${list[i].id}">${list[i].name}</button><input id="${list[i].name}" type="hidden" value="${list[i].id}"></li>`
    document.getElementById(list[i].id).addEventListener('click',function(){
      socket.emit('join game', list[i].id)
    })
  }
})