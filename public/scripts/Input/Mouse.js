var myOffset = {x:0,y:0}
var yourOffset = {x:0,y:0}
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
      creepToSend;

  function buildTower(x){
    creepSelected = false;
    if(x < 100.0){
      towerType = 'Bulbasaur'
      buildSelected = true;
    }else if(x < 200){
      towerType = 'Squirtle'
      buildSelected = true;
    }else if(x < 300){
      towerType = 'Charmander'
      buildSelected = true;
    }
    hoverImage.type = towerType
  }

  function sendCreep(x){
    buildSelected = false;
    if(x < 1233.0){
      creepType = 'Biker'
      creepSelected = true;
    }else if(x < 1333){
      creepType = 'Eyepatch'
      creepSelected = true;
    }else if(x < 1433){
      creepType = 'RocketM'
      creepSelected = true;
    }else if(x < 1533){
      creepType = 'Scientist'
      creepSelected = true;
    }
  }

  function onClick(event){
      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      if(y > 900 && y < 1000){
        if(x < 1000 && x > 0){
          hoverImage = {
            x: x,
            y: y,
            type: null
          };
          buildTower(x);
        }else if(x < 2133 && x > 1133){
          hoverImage = {
            x: x,
            y: y,
            type: null
          };
          sendCreep(x);
        }
      }else {
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
          let tX = Math.round(x/50)*50;
          let tY = Math.round(y/50)*50;
          if(tX < 1183){
            if (tX < 1133) return
            tX += 50
          }
          if(tX > 2083){
            if(tX > 2133) return
            tX -= 50
          }
          if(tY < 150){
            if (tY < 100) return
            tY += 50
          }
          if(tY > 850){
            if(tY > 900) return
            tY -= 50
          }

          creepToSend = {
            x: tX,
            y: tY,
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

  that.buildTowerUpdate = function(val){
    buildSelected = true;
    if(val === 1){
      towerType = 'Bulbasaur'
    }else if(val ===2){
      towerType = 'Squirtle'
    }else if(val ===3){
      towerType = 'Charmander'
    }
  }

  that.sendCreepUpdate = function(val){
    creepSelected = true;
    if(val === 1){
      creepType = 'Biker'
    }else if(val === 2){
      creepType = 'EyePatch'
    }else if(val === 3){
      creepType = 'RocketM'
    }else if(val === 4){
      creepType = 'Scientist'
    }
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

  function mouseMove(event){
    if(creepSelected){
      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      hoverImage.x = x;
      hoverImage.y = y;
    }else if(buildSelected){
      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      hoverImage.x = x;
      hoverImage.y = y;
    }

  }

  window.addEventListener('click', onClick);
  window.addEventListener('mousemove', mouseMove);

  return that;

};
