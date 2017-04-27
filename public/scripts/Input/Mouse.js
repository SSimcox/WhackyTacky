var scaleOffset = 1

Demo.input.Mouse = function() {
  'use strict';
  var that = {},
      towerType = {},
      creepType = {},
      hoverImage = {};
  let buildSelected = false,
      creepSelected = false,
      creep = false,
      building = false,
      towerToBuild,
      creepToSend,
      location,
      upgrading = false,
      selling = false,
      towerTypes = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise']

  that.buildTower = function(x, y){
    creepSelected = false;
    if(x < 100.0){
      towerType = towerTypes[0];
      buildSelected = true;
    }else if(x < 200){
      towerType = towerTypes[3]
      buildSelected = true;
    }else if(x < 300){
      towerType = towerTypes[6]
      buildSelected = true;
    }
    hoverImage = {
      x: x,
      y: y,
      type: towerType
    };
    // hoverImage.type = towerType
  }

  that.evolveTower = function(){
    if(upgrading){
      upgrading = false;
      return true;
    }
  }

  that.sellTower = function(){
    if(selling){
      selling = false;
      return true;
    }
  }

  // that.evolveTowerKey = function(){
  //   upgrading = false;
  // }

  that.sendCreep = function(x, y){
    buildSelected = false;
    if(x < 100){
      creepType = 'RocketM'
      creepSelected = true;
    }else if(x < 200){
      creepType = 'Scientist'
      creepSelected = true;
    }else if(x < 300){
      creepType = 'Biker'
      creepSelected = true;
    }else if(x < 400){
      creepType = 'Eyepatch'
      creepSelected = true;
    }
    hoverImage = {
      x: x,
      y: y,
      type: creepType
    };
  }

  function componentPrepAndHover(x, y){
    if(x < 600 && x > 0){
      that.buildTower(x, y);
    }else if(x > 800 && x < 1000){
      upgrading = true;
      //Going to upgrade
    }else if(x > 600 && x < 800){
      selling = true;
    }else{
      x = (event.pageX - yourOffset.x) / scaleOffset;
      if(x < 400 && x > 0) {
        hoverImage = {
          x: x,
          y: y,
          type: null
        };
        that.sendCreep(x);
      }
    }
  }

  function sendBuildAndSendInfo(x, y){
    if(buildSelected){
      let tX = Math.round(x/50)*50;
      let tY = Math.round(y/50)*50;
      if(tX < 50){
        if (tX < 0) return
        tX += 50
      }
      if(tX > 950){
        if(tX > 1000) return
        tX -= 50
      }
      if(tY < 150){
        if (tY < 100) return
        tY += 50
      }
      if(tY > 800){
        if(tY > 850) return
        tY -= 50
      }

      towerToBuild = {
        x: tX,
        y: tY,
        type: towerType
      };

      creepToSend = {};
      creep = false;
      building = true;
    }
    else if(creepSelected){
      x = (event.pageX - yourOffset.x) / scaleOffset;
      y = (event.pageY - yourOffset.y) / scaleOffset;
      let tX = Math.round(x/25)*25;
      let tY = Math.round(y/25)*25;
      if(tX < 25){
        if (tX < 0) return
        tX += 24
      }
      if(tX > 975){
        if(tX > 1000) return
        tX -= 256
      }
      if(tY < 875){
        if (tY < 100) return
        tY += 25
      }
      if(tY > 875){
        if(tY > 900) return
        tY -= 25
      }
      console.log("x:", tX,"y:",tY)

      creepToSend = {
        x: tX,
        y: 875,
        type: creepType
      };
      hoverImage = {
        x: tX,
        y: tY
      }
      towerToBuild = {};
      building = false;
      creep = true;
    }
  }

  function onClick(event){
      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      if(y > 900 && y < 1000){
        componentPrepAndHover(x, y);
        location = undefined;
      }else {
        if(buildSelected || creepSelected){
          sendBuildAndSendInfo(x,y);
          upgrading = false;
          selling = false;
          location = undefined;
        }else{
          if(x > 1000 || x < 0 || y > 850 || y < 100) return location = undefined
          location = {x: x, y: y}
        }
      }
  }

  that.resetSelection = function(){
    buildSelected = false;
    building = false;
    creepSelected = false;
    creep = false;
    hoverImage = {};
    location = undefined;
    upgrading = false;
    selling = false;
  }

  that.buildSelected = function(){
    return buildSelected
  }

  that.getBuilding = function(){
    return building;
  }

  that.creepSelected = function(){
    return creepSelected;
  }

  that.getCreep = function(){
    return creep;
  }

  that.noTowerFound = function(){
    location = undefined;
  }

  that.getUpgrading = function(){
    return upgrading;
  }

  that.getSelling = function(){
    return selling;
  }

  that.getTowerToBuild = function(){
    if(buildSelected && building){
      buildSelected = false;
      building = false;
      return towerToBuild;
    }
    return;
  }

  that.getCreepToSend = function(){
    if(creepSelected && creep){
      creepSelected = false;
      creep = false;
      return creepToSend;
    }
    return;
  }

  that.getHoverImage = function(){
    return hoverImage;
  }

  that.getClickLocation = function(){
    return location
  }

  that.setUpgrading = function(val){
    upgrading = val;
  }

  that.setSelling = function(val){
    selling = val;
  }

  function mouseMove(event){
    if(creepSelected){
      let x = (event.pageX - yourOffset.x) / scaleOffset;
      let y = (event.pageY - yourOffset.y) / scaleOffset;
      x = Math.round(x/25)*25;
      y = 875;
      if(x < 25) x = 25;
      if(x > 975) x = 975;
      hoverImage.x = x;
      hoverImage.y = y;
    }else if(buildSelected){
      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      x = Math.round(x/50) * 50;
      y = Math.round(y/50) * 50;
      if(y > 800) y = 800;
      if(y < 150) y = 150;
      if(x < 50)x = 50;
      if(x > 950)x=950;
      hoverImage.x = x;
      hoverImage.y = y;
    }

  }

  function mouseDown(event){
    if(event.button == 2){
      that.resetSelection();
    }
  }

  window.addEventListener('click', onClick);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('contextmenu', event => event.preventDefault());

  return that;

};
