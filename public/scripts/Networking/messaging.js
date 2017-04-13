/**
 * Created by Steven on 3/23/2017.
 */

var socket = io()
var room
socket.on('connect',function(){console.log(socket.id)})

socket.on('change color',changeYourColor)

function changeYourColor(message){
  socket.emit('send ping')
  var context = document.getElementById("your-canvas").getContext("2d")
  context.save()
  context.fillStyle = message.color
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

  var divisions = 20

  var gridWidth = context.canvas.width / divisions;
  var gridHeight= context.canvas.height / divisions;
  // console.log(document.getElementById("my-canvas").width)
  // console.log(document.getElementById("my-canvas").height)
  context.lineWidth = 1
  context.beginPath()
  for(let i = 0; i < divisions; i++){
    for(let j = 0; j < divisions; j++){

      context.moveTo(j*gridWidth,i*gridHeight)
      context.lineTo((j+1)*gridWidth,i*gridHeight)
      context.lineTo((j+1)*gridWidth,(i+1)*gridHeight)
      context.lineTo(j*gridWidth,(i+1)*gridHeight)
      context.lineTo(j*gridWidth,i*gridHeight)
    }
  }
  context.stroke()
  context.restore()
  socket.emit('change color', {colorString: colorString, id:room})
}

function requestGame(roomName){
  socket.emit('request room', roomName)
}

socket.on('start game', function(roomName){
  Game.game.showScreen("game-play")
  room = roomName
  Demo.main.initialize()
})

socket.on('list games',function(list){
  var element = document.getElementById("available-games")
  element.innerHTML = ""
  for(let i = 0; i < list.length; ++i){
    element.innerHTML += `<li><button id = "${list[i].id}">${list[i].name}</button><input id="${list[i].name}" type="hidden" value="${list[i].id}"></li>`
    document.getElementById(list[i].id).addEventListener('click',function(){
      socket.emit('join game', list[i].id)
    })
  }
})

socket.on('player left', function(){
  Game.game.showScreen('main-menu')
})