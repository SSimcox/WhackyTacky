Demo.input.GameCommands = function(myMouse, myKeyboard) {
  'use strict'
  var that = {};

  that.upgradeTower = function(type, center){
    // upgrades a tower
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

  that.removeTower = function(){
    //sell tower for moneys
  }

  that.sendCreeps = function(){
    //this will send creep waves
  }

  that.getKeyCommands = function(){
    // myKeyboard.changeCommands();
  }

  return that;
}
