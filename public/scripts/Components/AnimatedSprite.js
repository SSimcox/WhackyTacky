Demo.components.AnimatedSprite = function(spec) {
	'use strict';
	var frame = 0,
		creep = spec.creep ? 4 : 1,
		direction = spec.creep ? 3:0,
		that = {
		get creep() { return spec.creep ? true : false },
			get spriteSheet() { return spec.spriteSheet; },
			get pixelWidth() { return spec.spriteSheet.width / spec.spriteCount; },
			get pixelHeight() { return spec.spriteSheet.height / creep; },
			get width() { return spec.spriteSize.width; },
			get height() { return spec.spriteSize.height; },
			get center() { return spec.spriteCenter; },
			get sprite() { return spec.sprite; },
			get direction() {return direction; },
			set direction(val) {direction = val;},
			set center(val){spec.spriteCenter = val; }
		};

	//
	// Check to see if the frame animation times need to be scaled, and do so if necessary.
	if (spec.animationScale) {
		for (frame in spec.spriteTime) {
			spec.spriteTime[frame] *= spec.animationScale;
		}
	}

	//
	// Initialize the animation of the spritesheet
	spec.sprite = 0;		// Which sprite to start with
	spec.elapsedTime = 0;	// How much time has occured in the animation for the current sprite

	//------------------------------------------------------------------
	//
	// Update the animation of the sprite based upon elapsed time.
	//
	//------------------------------------------------------------------
	that.update = function(elapsedTime, forward) {
		spec.elapsedTime += elapsedTime;
		//
		// Check to see if we should update the animation frame
		while (spec.elapsedTime >= spec.spriteTime[spec.sprite]) {
			//
			// When switching sprites, keep the leftover time because
			// it needs to be accounted for the next sprite animation frame.
			spec.elapsedTime -= spec.spriteTime[spec.sprite];
			//
			// Depending upon the direction of the animation...
			if (forward === true) {
				spec.sprite += 1;
				//
				// This provides wrap around from the last back to the first sprite
				spec.sprite = spec.sprite % spec.spriteCount;
			} else {
				spec.sprite -= 1;
				//
				// This provides wrap around from the first to the last sprite
				if (spec.sprite < 0) {
					spec.sprite = spec.spriteCount - 1;
				}
			}
		}
	};

	return that;
};
