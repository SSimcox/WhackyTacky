

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
Demo.loader = (function() {
	'use strict';
	var assetOrder = [
	  {
			// Source: http://www.xojo3d.com/tut015.php
			// License: Public domain as noted at the bottom of the page
			key: 'charmander',
			source: '/public/assets/graphics/towers/charmander.png'
		},
    {
      key: 'bulbasaur',
      source: '/public/assets/graphics/towers/bulbasaur.png'
    },
    {
      key: 'bulbasaur-back',
      source: '/public/assets/graphics/towers/bulbasaur-back.png'
    },
    {
      key: 'squirtle',
      source: '/public/assets/graphics/towers/squirtle.png'
    },
		{
			key: 'bulbasaurHover',
			source: '/public/assets/graphics/towerHover/bulbasaurHover.png'
		},
		{
			key: 'squirtleHover',
			source: '/public/assets/graphics/towerHover/squirtleHover.png'
		},
		{
			key: 'charmanderHover',
			source: '/public/assets/graphics/towerHover/charmanderHover.png'
		},
		{
			key: 'biker',
			source: '/public/assets/graphics/creeps/biker.png'
		},
		{
			key: 'eyepatch',
			source: '/public/assets/graphics/creeps/eyepatch.png'
		},
		{
			key: 'rocketM',
			source: '/public/assets/graphics/creeps/rocketM.png'
		},
		{
			key: 'scientist',
			source: '/public/assets/graphics/creeps/scientist.png'
		},{
			key: 'dirt',
			source: '/public/assets/graphics/tiles/dirt.png'
		},
    {
      key: 'fence',
      source: '/public/assets/graphics/tiles/fence.png'
    },
    {
      key: 'grass',
      source: '/public/assets/graphics/tiles/grass.png'
    },
    {
      key: 'pokecenter',
      source: '/public/assets/graphics/tiles/pokecenter.png'
    },
    {
      key: 'bluebuilding',
      source: '/public/assets/graphics/tiles/bluebuilding.png'
    },
    {
      key: 'redbuilding',
      source: '/public/assets/graphics/tiles/redbuilding.png'
    },
    {
      key: 'bggrass',
      source: '/public/assets/graphics/tiles/bggrass.png'
    },
    {
      key: 'loadingdirt',
      source: '/public/assets/graphics/tiles/loadingdirt.png'
    },
    {
      key: 'buildingselectbg',
      source: '/public/assets/graphics/tiles/buildingselectbg.png'
    },
    {
      key: 'buildingselectbgblue',
      source: '/public/assets/graphics/tiles/buildingselectbgblue.png'
    },
    {
      key: 'buildingselectbggreen',
      source: '/public/assets/graphics/tiles/buildingselectbggreen.png'
    },
    {
      key: 'buildingselectbgred',
      source: '/public/assets/graphics/tiles/buildingselectbgred.png'
    },
    {
      key: 'buildingselectbgpurple',
      source: '/public/assets/graphics/tiles/buildingselectbgpurple.png'
    },
    {
      key: 'egg',
      source: '/public/assets/graphics/tiles/egg.png'
    }

  ];

	//------------------------------------------------------------------
	//
	// Helper function used to load scripts in the order specified by the
	// 'scripts' parameter.  'scripts' expects an array of objects with
	// the following format...
	//	{
	//		scripts: [script1, script2, ...],
	//		message: 'Console message displayed after loading is complete',
	//		onComplete: function to call when loading is complete, may be null
	//	}
	//
	//------------------------------------------------------------------
	function loadScripts(scripts, onComplete) {
		var entry = 0;
		//
		// When we run out of things to load, that is when we call onComplete.
		if (scripts.length > 0) {
			entry = scripts[0];
			require(entry.scripts, function() {
				console.log(entry.message);
				if (entry.onComplete) {
					entry.onComplete();
				}
				scripts.splice(0, 1);
				loadScripts(scripts, onComplete);
			});
		} else {
			onComplete();
		}
	}

	//------------------------------------------------------------------
	//
	// Helper function used to load assets in the order specified by the
	// 'assets' parameter.  'assets' expects an array of objects with
	// the following format...
	//	{
	//		key: 'asset-1',
	//		source: 'asset/url/asset.png'
	//	}
	//
	// onSuccess is invoked per asset as: onSuccess(key, asset)
	// onError is invoked per asset as: onError(error)
	// onComplete is invoked once per 'assets' array as: onComplete()
	//
	//------------------------------------------------------------------
	function loadAssets(assets, onSuccess, onError, onComplete) {
		var entry = 0;
		//
		// When we run out of things to load, that is when we call onComplete.
		if (assets.length > 0) {
			entry = assets[0];
			loadAsset(entry.source,
				function(asset) {
					onSuccess(entry, asset);
					assets.splice(0, 1);
					loadAssets(assets, onSuccess, onError, onComplete);
				},
				function(error) {
					onError(error);
					assets.splice(0, 1);
					loadAssets(assets, onSuccess, onError, onComplete);
				});
		} else {
			onComplete();
		}
	}

	//------------------------------------------------------------------
	//
	// This function is used to asynchronously load image and audio assets.
	// On success the asset is provided through the onSuccess callback.
	// Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
	//
	//------------------------------------------------------------------
	function loadAsset(source, onSuccess, onError) {
		var xhr = new XMLHttpRequest(),
			asset = null,
			fileExtension = source.substr(source.lastIndexOf('.') + 1);	// Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

		if (fileExtension) {
			// xhr.open('GET', source, true);
			// xhr.responseType = 'blob';
      //
      // xhr.onload = function() {
				// if (xhr.status === 200) {
					if (fileExtension === 'png' || fileExtension === 'jpg') {
						asset = new Image();
					} else if (fileExtension === 'mp3') {
						asset = new Audio();
					} else {
						if (onError) { onError('Unknown file extension: ' + fileExtension); }
					}
					asset.onload = function() {
						console.log('loaded')
						//window.URL.revokeObjectURL(asset.src);
					};
					asset.src = source//window.URL.createObjectURL(xhr.response);
					if (onSuccess) { onSuccess(asset); }
			// 	} else {
			// 		if (onError) { onError('Failed to retrieve: ' + source); }
			// 	}
			// };
		}
		else {
			if (onError) { onError('Unknown file extension: ' + fileExtension); }
		}

		//xhr.send();
	}

	//------------------------------------------------------------------
	//
	// Called when all the scripts are loaded, it kicks off the demo app.
	//
	//------------------------------------------------------------------
	function mainComplete() {
		console.log('it is all loaded up');
		//Demo.main.initialize();
	}

	//
	// Start with loading the assets, then the scripts.
	console.log('Starting to dynamically load project assets');
	loadAssets(assetOrder,
		function(source, asset) {	// Store it on success
			Demo.assets[source.key] = asset;
		},
		function(error) {
			console.log(error);
		},
		function() {
			console.log('All assets loaded');
			console.log('Starting to dynamically load project scripts');
			//loadScripts(scriptOrder, mainComplete);
		}
	);

}());
