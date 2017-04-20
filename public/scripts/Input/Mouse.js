var myOffset = {x:0,y:0}
var yourOffset = {x:0,y:0}
var scaleOffset = 1

Demo.input.Mouse = function() {
  'use strict';
  var that = {},
      towerType = {};
  let buildSelected = false,
      building = false,
      towerToBuild;

  function buildTower(x){
    console.log('selecting Tower')
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
  }

  function onClick(event){

      let x = (event.pageX - myOffset.x) / scaleOffset;
      let y = (event.pageY - myOffset.y) / scaleOffset;
      if(x < 1000 && x > 0 && y > 900 && y < 1000){
        buildTower(x);
      }else {//if(x < 950 && x > 50 && y < 900 && y > 150){
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
          building = true;
        }
      }
  }

  that.buildSelected = function(){
    return buildSelected
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

  that.getTowerToBuild = function(){
    if(buildSelected && building){
      buildSelected = false;
      building = false;
      return towerToBuild;
    }
    return;
  }

  window.addEventListener('click', onClick);

  return that;

};
