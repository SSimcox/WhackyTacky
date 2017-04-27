// ------------------------------------------------------------------
//
// This namespace provides the core rendering code for the demo.
//
// ------------------------------------------------------------------
Demo.renderer.core = (function() {
	'use strict';
	var canvas = [],
		context = [],
		world = {
			size: 1,
			top: 0,
			left: 0
		},
		resizeHandlers = [];

	//------------------------------------------------------------------
	//
	// Used to set the size of the canvas to match the size of the browser
	// window so that the rendering stays pixel perfect.
	//
	//------------------------------------------------------------------
	function resizeCanvas() {
		var smallestSize = 0,
			handler = null;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		//
		// Have to figure out where the upper left corner of the unit world is
		// based on whether the width or height is the largest dimension.
		if (canvas.width < canvas.height) {
			smallestSize = canvas.width;
			world.size = smallestSize * 0.9;
			world.left = Math.floor(canvas.width * 0.05);
			world.top = (canvas.height - world.size) / 2;
		} else {
			smallestSize = canvas.height;
			world.size = smallestSize * 0.9;
			world.top = Math.floor(canvas.height * 0.05);
			world.left = (canvas.width - world.size) / 2;
		}

		//
		// Notify interested parties of the canvas resize event.
		for (handler in resizeHandlers) {
			resizeHandlers[handler](true);
		}
	}

	//------------------------------------------------------------------
	//
	// Quick to allow other code to be notified when a resize event occurs.
	//
	//------------------------------------------------------------------
	function notifyResize(handler) {
		resizeHandlers.push(handler);
	}

	//------------------------------------------------------------------
	//
	// Toggles the full-screen mode.  If not in full-screen, it enters
	// full-screen.  If in full screen, it exits full-screen.
	//
	//------------------------------------------------------------------
	function toggleFullScreen(element) {
		var	fullScreenElement = document.fullscreenElement ||
								document.webkitFullscreenElement ||
								document.mozFullScreenElement ||
								document.msFullscreenElement;

		element.requestFullScreen = element.requestFullScreen ||
									element.webkitRequestFullscreen ||
									element.mozRequestFullScreen ||
									element.msRequestFullscreen;
		document.exitFullscreen =	document.exitFullscreen ||
									document.webkitExitFullscreen ||
									document.mozCancelFullScreen ||
									document.msExitFullscreen;

		if (!fullScreenElement && element.requestFullScreen) {
			element.requestFullScreen();
		} else if (fullScreenElement) {
			document.exitFullscreen();
		}
	}

	//------------------------------------------------------------------
	//
	// Clear the whole canvas
	//
	//------------------------------------------------------------------
	function clearCanvas() {
		context[0].clearRect(0, 0, canvas.width, canvas.height);
    context[1].clearRect(0, 0, canvas.width, canvas.height);
	}

	//------------------------------------------------------------------
	//
	// This provides initialization of the canvas.  From here the various
	// event listeners we care about are prepared, along with setting up
	// the canvas for rendering.
	//
	//------------------------------------------------------------------
	function initialize() {
		canvas[0] = document.getElementById('my-canvas');
		context[0] = canvas[0].getContext('2d');

    canvas[1] = document.getElementById('your-canvas');
    context[1] = canvas[1].getContext('2d');

    canvas[3] = document.getElementById('tutorial-canvas');
    context[3] = canvas[3].getContext('2d');

		// window.addEventListener('resize', function() {
		// 	resizeCanvas();
		// }, false);
		// window.addEventListener('orientationchange', function() {
		// 	resizeCanvas();
		// }, false);
		// window.addEventListener('deviceorientation', function() {
		// 	resizeCanvas();
		// }, false);

		//
		// Force the canvas to resize to the window first time in, otherwise
		// the canvas is a default we don't want.
		//resizeCanvas();
	}

	//------------------------------------------------------------------
	//
	// Renders the text based on the provided spec.
	//
	//------------------------------------------------------------------
	function drawText(spec, p) {
		context[p].font = spec.font;
		context[p].fillStyle = spec.fill;
		context[p].textBaseline = 'top';

		context[p].fillText(
			spec.text,
			world.left + spec.position.x * world.size,
			world.top + spec.position.y * world.size);
	}

	function drawTextSell(spec, p){
		context[p].font = spec.font;
		context[p].fillStyle = spec.fill;
		context[p].textBaseline = 'top';
		context[p].fillText(
			"Sell: " + Math.floor(spec.cost/2),
			world.left + spec.position.x * world.size,
			world.top + spec.position.y * world.size);
		context[p].fillText(
			"Damage: " + spec.damage,
			world.left + spec.position.x * world.size,
			world.top + (spec.position.y+30) * world.size);
		context[p].fillText(
			"Speed: " + spec.speed + " s",
			world.left + spec.position.x * world.size,
			world.top + (spec.position.y+60) * world.size);
	}

	function drawTextUpgrade(spec, p){
		context[p].font = spec.font;
		context[p].fillStyle = spec.fill;
		context[p].textBaseline = 'top';
		context[p].fillText(
			"Cost: " + spec.cost,
			world.left + spec.position.x * world.size,
			world.top + spec.position.y * world.size);
		context[p].fillText(
			"Damage: " + spec.damage,
			world.left + spec.position.x * world.size,
			world.top + (spec.position.y+30) * world.size);
		context[p].fillText(
			"Speed: " + spec.speed + " s",
			world.left + spec.position.x * world.size,
			world.top + (spec.position.y+60) * world.size);
	}

	//------------------------------------------------------------------
	//
	// This returns the height of the specified font, in world units.
	//
	//------------------------------------------------------------------
	function measureTextHeight(spec, p) {
		var height = 0;
		context[p].save();

		context[p].font = spec.font;
		context[p].fillStyle = spec.fill;

		height = context[p].measureText('m').width / world.size;

		context[p].restore();

		return height;
	}

	//------------------------------------------------------------------
	//
	// This returns the width of the specified font, in world units.
	//
	//------------------------------------------------------------------
	function measureTextWidth(spec, p) {
		var width = 0;
		context[p].save();

		context[p].font = spec.font;
		context[p].fillStyle = spec.fill;

		width = context[p].measureText(spec.text).width / world.size;

		context[p].restore();

		return width;
	}

	//------------------------------------------------------------------
	//
	// Draw a line segment within the unit world.
	//
	//------------------------------------------------------------------
	function drawLine(style, pt1, pt2, p) {
		context[p].strokeStyle = style;
		context[p].beginPath();
		context[p].moveTo(
			0.5 + world.left + (pt1.x * world.size),
			0.5 + world.top + (pt1.y * world.size));
		context[p].lineTo(
			0.5 + world.left + (pt2.x * world.size),
			0.5 + world.top + (pt2.y * world.size));
		context[p].stroke();
	}

	//------------------------------------------------------------------
	//
	// Draw a circle within the unit world.
	//
	//------------------------------------------------------------------
	function drawCircle(lineStyle, center, radius, p) {
		//
		// 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
		var grad = context[p].createLinearGradient(center.x, center.y, 0.5 + world.left + (center.x * world.size), 0.5 + world.left + (center.y * world.size));
		grad.addColorStop(0, lineStyle);
		grad.addColorStop(1, 'rgba(255,255,255,.2)');
		context[p].strokeStyle = lineStyle;
		context[p].fillStyle = grad;
		context[p].beginPath();
		context[p].arc(
			0.5 + world.left + (center.x * world.size),
			0.5 + world.top + (center.y * world.size),
			radius * world.size,
			0, 2 * Math.PI);

		context[p].fill();
		context[p].stroke();
	}

  function drawCircle2(lineStyle, center, radius, p) {
    //
    // 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.

    context[p].strokeStyle = lineStyle;
    context[p].beginPath();
    context[p].arc(
      0.5 + world.left + (center.x * world.size),
      0.5 + world.top + (center.y * world.size),
      radius * world.size,
      0, 2 * Math.PI);

    context[p].stroke();
  }

	//------------------------------------------------------------------
	//
	// Draws a rectangle relative to the 'unit world'.
	//
	//------------------------------------------------------------------
	function drawRectangle(style, left, top, width, height, stroke = true, p) {
		//
		// 0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
		if(stroke) {
      context[p].strokeStyle = style;
      context[p].strokeRect(
        0.5 + world.left + (left * world.size),
        0.5 + world.top + (top * world.size),
        width * world.size,
        height * world.size);
    }
    else{
      context[p].fillStyle = style;
      context[p].fillRect(
        0.5 + world.left + (left * world.size),
        0.5 + world.top + (top * world.size),
        width * world.size,
        height * world.size);
		}
	}

	//------------------------------------------------------------------
	//
	// Pass-through that allows an image to be drawn.
	//
	//------------------------------------------------------------------
	function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, p) {
		//
		// Convert from pixel to world coordinates on a few items
		context[p].drawImage(
			image,
			sx, sy,
			sWidth, sHeight,
			dx * world.size + world.left, dy * world.size + world.top,
			dWidth * world.size, dHeight * world.size);
	}

	function drawImage2(image, dx, dy, dWidth, dHeight, p) {
		//
		// Convert from pixel to world coordinates on a few items
		context[p].drawImage(
			image.image,
			dx * world.size + world.left, dy * world.size + world.top,
			dWidth * world.size, dHeight * world.size);
	}

	//------------------------------------------------------------------
	//
	// Simple pass-through to save the canvas context[p].
	//
	//------------------------------------------------------------------
	function saveContext(p) {
		context[p].save();
	}

	//------------------------------------------------------------------
	//
	// Simple pass-through the restore the canvas context[p].
	//
	//------------------------------------------------------------------
	function restoreContext(p) {
		context[p].restore();
	}

	//------------------------------------------------------------------
	//
	// Perform a rotation of the canvas so that the next things rendered
	// will appear as rotated (after the canvas rotation is undone).
	//
	//------------------------------------------------------------------
	function rotateCanvas(center, rotation, p) {
		context[p].translate(center.x * world.size + world.left, center.y * world.size + world.top);
		context[p].rotate(rotation);
		context[p].translate(-(center.x * world.size + world.left), -(center.y * world.size + world.top));
	}

	function drawCurve(sx,sy,dx,dy,bx,by,linecolor,width,p){
	  context[p].save()
    context[p].strokeStyle = linecolor
    context[p].lineWidth = width
    context[p].beginPath()
    context[p].moveTo(sx,sy)
    context[p].quadraticCurveTo(bx,by,dx,dy)
    context[p].stroke()
    context[p].restore()
  }

  function drawCurve2(sx,sy,dx,dy,b1x,b1y,b2x,b2y,linecolor,width,p){
    context[p].save()
    context[p].strokeStyle = linecolor
    context[p].lineWidth = width
    context[p].beginPath()
    context[p].moveTo(sx,sy)
    context[p].bezierCurveTo(b1x,b1y,b2x,b2y,dx,dy)
    context[p].stroke()
    context[p].restore()
  }

	return {
		initialize: initialize,
		toggleFullScreen: toggleFullScreen,
		clearCanvas: clearCanvas,
		drawText: drawText,
		drawTextSell: drawTextSell,
		drawTextUpgrade: drawTextUpgrade,
		measureTextHeight: measureTextHeight,
		measureTextWidth: measureTextWidth,
		drawLine: drawLine,
		drawRectangle: drawRectangle,
		drawCircle: drawCircle,
    drawCircle2: drawCircle2,
		drawImage: drawImage,
		drawImage2: drawImage2,
    drawCurve: drawCurve,
    drawCurve2: drawCurve2,
		saveContext: saveContext,
		restoreContext: restoreContext,
		rotateCanvas: rotateCanvas,
		notifyResize: notifyResize
	};

}());
