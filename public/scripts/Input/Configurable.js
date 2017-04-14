var Persistance = (function() {
    var controls = {},
        previousControls = localStorage.getItem('MyControls.playerControls'),
        curControls = [];
    if(previousControls !== null){
      controls = JSON.parse(previousControls);
    }else{
      controls = {
        Bulbasaur: 'DOM_VK_1',
        Charmander: 'DOM_VK_2',
        Squirtle: 'DOM_VK_3',
        Evolve: 'DOM_VK_E',
        Biker: 'DOM_VK_D',
        Pirate: 'DOM_VK_I',
        Rocket: 'DOM_VK_R',
        Scientist: 'DOM_VK_S',
        Pause: 'DOM_VK_D'
      };
  		localStorage['MyControls.playerControls'] = JSON.stringify(controls);
    }
    function update() {
  		controls = {
        Bulbasaur: 'DOM_VK_' + document.getElementById('Bulbasaur').value.toUpperCase(),
        Charmander: 'DOM_VK_' + document.getElementById('Charmander').value.toUpperCase(),
        Squirtle: 'DOM_VK_' + document.getElementById('Squirtle').value.toUpperCase(),
        Evolve: 'DOM_VK_' + document.getElementById('Evolve').value.toUpperCase(),
        Biker: 'DOM_VK_' + document.getElementById('Biker').value.toUpperCase(),
        Pirate: 'DOM_VK_' + document.getElementById('Pirate').value.toUpperCase(),
        Rocket: 'DOM_VK_' + document.getElementById('Rocket').value.toUpperCase(),
        Scientist: 'DOM_VK_' + document.getElementById('Scientist').value.toUpperCase(),
        Pause: 'DOM_VK_' + document.getElementById('Pause').value.toUpperCase()
      };
  		localStorage['MyControls.playerControls'] = JSON.stringify(controls);
  	}

    function getControls(){
      return controls;
    }

  	function report() {
  		document.getElementById('Bulbasaur').value = controls['Bulbasaur'].substring(7)
  		document.getElementById('Charmander').value = controls['Charmander'].substring(7)
  		document.getElementById('Squirtle').value = controls['Squirtle'].substring(7)
  		document.getElementById('Evolve').value = controls['Evolve'].substring(7)
  		document.getElementById('Biker').value = controls['Biker'].substring(7)
  		document.getElementById('Pirate').value = controls['Pirate'].substring(7)
  		document.getElementById('Rocket').value = controls['Rocket'].substring(7)
  		document.getElementById('Scientist').value = controls['Scientist'].substring(7)
  		document.getElementById('Pause').value = controls['Pause'].substring(7)
  	}


    return {
      update: update,
      report : report,
      getControls: getControls
    }
  }())
