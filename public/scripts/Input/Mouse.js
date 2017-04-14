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
      }else if(x < 950 && x > 50 && y < 900 && y > 150){
        if(buildSelected){
          let tX = Math.round(x/50)*50;
          let tY = Math.round(y/50)*50;
          //model.buildTower(towerToBuild, tX, tY);
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
