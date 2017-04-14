// ------------------------------------------------------------------
//
// Rendering function for a /Components/Text object.
//
// ------------------------------------------------------------------
Demo.renderer.Text = (function(core) {
	'use strict';
	var that = {};

	that.render = function(text, p) {
		core.drawText(text, p);
	};

	return that;
}(Demo.renderer.core));
