/**
 * Created by Steven on 3/23/2017.
 */

var socket = io()

document.getElementById('my-canvas').addEventListener('click',changeMyColor)

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
  socket.emit('change color',colorString)
}