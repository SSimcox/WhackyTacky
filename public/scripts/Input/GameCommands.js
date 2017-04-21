Demo.input.GameCommands = function(myMouse, myKeyboard) {
  'use strict'
  var that = {};

  that.hoverTower = function(type, center){
    let tower = myMouse.getHoverImage();
    return tower
  }

  that.buildTower = function(){
    let build = myMouse.getTowerToBuild();
    // let build = Keyboard.getTowerToBuild();
    return build
  }

  that.buildTower1 = function(){
    myMouse.buildTowerUpdate(1);
  }

  that.buildTower2 = function(){
    myMouse.buildTowerUpdate(2);
  }

  that.buildTower3 = function(){
    myMouse.buildTowerUpdate(3);
  }

  that.evolveTower = function(){
    //sell tower for moneys
  }

  that.sendCreeps = function(){
    let send = myMouse.getCreepToSend();
    // let build = Keyboard.getTowerToBuild();
    return send
  }

  that.sendBiker = function(){
    myMouse.sendCreepUpdate(1);
  }

  that.sendPirate = function(){
    myMouse.sendCreepUpdate(2);
  }

  that.sendRocket = function(){
    myMouse.sendCreepUpdate(3);
  }

  that.sendScientist = function(){
    myMouse.sendCreepUpdate(4);
  }

  that.pause = function(){
    //this will send creep waves
  }

  that.getKeyCommands = function(){
    // myKeyboard.changeCommands();
  }

  return that;
}
