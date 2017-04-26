Demo.input.GameCommands = function (myMouse, myKeyboard) {
  'use strict'
  var that = {};
  var paused = false

  var lastPauseTime = 0;

  that.hoverTower = function (type, center) {
      let tower = myMouse.getHoverImage();
      return tower
  }

  that.buildTower = function () {
      let build = myMouse.getTowerToBuild();
      // let build = Keyboard.getTowerToBuild();
      return build
  }

  that.buildTower1 = function () {
      myMouse.buildTower(50, 850);
  }

  that.buildTower2 = function () {
      myMouse.buildTower(150, 850);
  }

  that.buildTower3 = function () {
      myMouse.buildTower(250, 850);
  }

  that.evolveTowerSelection = function () {
      let location = myMouse.getClickLocation();
      return location === undefined ? undefined : location;
  }

  that.evolveTower = function () {
      return myMouse.evolveTower();
  }

  that.evolveTowerKeyboard = function () {
      // console.log(myMouse.getUpgrading())
      if (myMouse.getUpgrading()) {
        myMouse.resetSelection();
        return true;
      }
    return false;
  }

  that.sendCreeps = function () {
      let send = myMouse.getCreepToSend();

      // let build = Keyboard.getTowerToBuild();
      return send
  }

  that.sendBiker = function () {
      myMouse.sendCreep(250, 875);
  }

  that.sendPirate = function () {
      myMouse.sendCreep(350, 875);
  }

  that.sendRocket = function () {
      myMouse.sendCreep(50, 875);
  }

  that.sendScientist = function () {
      myMouse.sendCreep(150, 875);
  }

  that.cancel = function () {
      myMouse.resetSelection()
  }

  that.pause = function () {
    if(performance.now() - lastPauseTime > 1000) {
      paused = true
      lastPauseTime = performance.now()
    }
  }

  that.paused = function(){
    var ret = paused;
    paused = false
    return ret
  }

  that.getKeyCommands = function () {
      // myKeyboard.changeCommands();
  }

  return that;
}
