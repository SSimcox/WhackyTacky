Demo.main = (function(renderer, components, model) {
	'use strict';
	var lastTimeStamp = performance.now(),
		frameTimes = [],
		textFPS = components.Text({
			text : 'fps',
			font : '16px Arial, sans-serif',
			fill : 'rgba(255, 0, 0, 1)',
			position : { x : 950, y : 0.00 }
		});

	//------------------------------------------------------------------
	//
	// Process any captured input.
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		model.processInput(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Update the simulation.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		model.update(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Render the simulation.
	//
	//------------------------------------------------------------------
	function render(elapsedTime) {
		var averageTime = 0,
			fps = 0;

		renderer.core.clearCanvas();
		model.render(Demo.renderer);


		//
		// Show FPS over last several frames
		frameTimes.push(elapsedTime);
		if (frameTimes.length > 50) {
			frameTimes = frameTimes.slice(1);
			averageTime = frameTimes.reduce(function(a, b) { return a + b; }) / frameTimes.length;
			//
			// averageTime is in milliseconds, need to convert to seconds for frames per SECOND
			// But also want to preserve 1 digit past the decimal, so multiplying by 10000 first, then
			// truncating, then dividing by 10 to get back to seconds.
			fps = Math.floor((1 / averageTime) * 10000) / 10;
			textFPS.text = 'fps: ' + fps;
			renderer.Text.render(textFPS,1);
		}
	}

	//------------------------------------------------------------------
	//
	// A game loop so we can show some animation with this demo.
	//
	//------------------------------------------------------------------
	function gameLoop(time) {
		var elapsedTime = (time - lastTimeStamp);
		lastTimeStamp = time;

		processInput(elapsedTime);
		update(elapsedTime);
		render(elapsedTime);

		//console.log(performance.now() - time)
		requestAnimationFrame(gameLoop);
	}

	//------------------------------------------------------------------
	//
	// This is the entry point for the demo.  From here the various event
	// listeners we care about are prepared, along with setting up the
	// canvas for rendering, finally starting the animation loop.
	//
	//------------------------------------------------------------------
	function initialize() {
		renderer.core.initialize();
		lastTimeStamp = performance.now()
		textFPS.height = renderer.core.measureTextHeight(textFPS,0);
		textFPS.width = renderer.core.measureTextWidth(textFPS,0);

		model.initialize();

		//
		// Get the gameloop started
		requestAnimationFrame(gameLoop);
	}

	function stop(){
		model.stopMusic()
	}

	return {
		initialize: initialize,
		stop: stop
	};

}(Demo.renderer, Demo.components, Demo.model));

var socket = Socket(Demo.main)

function changeYourColor(message) {
  socket.emit('send ping', message.arr)
  var context = document.getElementById("your-canvas").getContext("2d")
  context.save()
  context.fillStyle = message.color
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  context.restore()
}

function changeMyColor() {
  var context = document.getElementById("my-canvas").getContext("2d")
  var r = Math.floor(Math.random() * 255)
  var g = Math.floor(Math.random() * 255)
  var b = Math.floor(Math.random() * 255)
  var colorString = `rgb(${r},${g},${b})`
  context.save()
  context.fillStyle = colorString
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  var divisions = 20

  var gridWidth = context.canvas.width / divisions;
  var gridHeight = context.canvas.height / divisions;
  // console.log(document.getElementById("my-canvas").width)
  // console.log(document.getElementById("my-canvas").height)
  context.lineWidth = 1
  context.beginPath()
  for (let i = 0; i < divisions; i++) {
    for (let j = 0; j < divisions; j++) {

      context.moveTo(j * gridWidth, i * gridHeight)
      context.lineTo((j + 1) * gridWidth, i * gridHeight)
      context.lineTo((j + 1) * gridWidth, (i + 1) * gridHeight)
      context.lineTo(j * gridWidth, (i + 1) * gridHeight)
      context.lineTo(j * gridWidth, i * gridHeight)
    }
  }
  context.stroke()
  context.restore()
  socket.emit('change color', {colorString: colorString, id: room})
}

function requestGame(roomName) {
  socket.emit('request room', roomName)
}

Demo.model.setSocket(socket)
