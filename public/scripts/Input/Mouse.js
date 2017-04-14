var myOffset = {x:0,y:0}
var yourOffset = {x:0,y:0}
var scaleOffset = 1

Demo.input.Mouse = function() {
  'use strict';
  var buttons = {},
    handlers = {},
    nextHandlerId = 0;
    that = {};


    that.registerHandler = function(handler, button, repeat, rate){
      if(rate === undefined){
        rate = 0;
      }

    if(!handlers.hasOwnProperty(button)){
      handlers[button] = [];
    }
    handlers[button].push({
      id: nextHandlerId,
      button: button,
      repeat: repeat,
      rate: rate,
      elapsedTime: rate,
      handler: handler
    });

    nextHandlerId += 1;

    return handlers[button][handlers[button].length -1].id;
  };

  that.unregisterHandler = function(button, id){
    var entry = 0;

    if(handlers.hasOwnProperty(button)){
      for (entry = 0; entry < handlers[key].length; entry += 1) {
				if (handlers[key][entry].id === id) {
					handlers[key].splice(entry, 1);
					break;
				}
			}
    }
  };




}
