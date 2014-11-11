
Level = function(game) {

	thisLevel = this;
	thisLevel.game = game;
	thisLevel.ground = null;
	thisLevel.groundLayer=null;
	

	thisLevel.stars = null;
};

Level.prototype = {

	preload: function() {
		thisLevel.game.load.image('sky', 'assets/sky.png');
    	thisLevel.game.load.image('ground', 'assets/platform.png');
    	thisLevel.game.load.image('star', 'assets/star.png');
    	//Cargamos ahora el mapa en json del nivel
    	this.game.load.tilemap('level','assets/mapPrueba.json',null,Phaser.Tilemap.TILED_JSON);
    	//Cargamos tiles
    	this.game.load.image('tiles','assets/tiles.png');
	},

	create: function() {



		thisLevel.ground= game.add.tilemap('level');

		thisLevel.ground.addTilesetImage('tiles');

		thisLevel.ground.setCollisionBetween(7, 13);
		thisLevel.ground.setCollisionBetween(21,27);

		/// El nombre que le indicamos es el que esta indicado en el valor "name:" del *.json
		thisLevel.groundLayer= thisLevel.ground.createLayer('ground');
		thisLevel.groundLayer.resizeWorld();
		thisLevel.groundLayer.debug=true;

	    // create a group for stars
	    thisLevel.stars = game.add.group();
	    thisLevel.stars.enableBody = true;
	 
	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = thisLevel.stars.create(i * 70, 0, 'star');
	 
	        //  Let gravity do its thing
	        star.body.gravity.y = 600;
	 
	        //  ThisLevel just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	},

	update: function() {

		thisLevel.game.physics.arcade.collide(thisLevel.stars, thisLevel.groundLayer);
	}

};