
Level = function(game) {

	tLevel = this;
	tLevel.game = game;
	tLevel.ground = null;
	tLevel.groundLayer=null;
	

	tLevel.stars = null;
};

Level.prototype = {

	preload: function() {
		tLevel.game.load.image('sky', 'assets/sky.png');
    	tLevel.game.load.image('ground', 'assets/platform.png');
    	tLevel.game.load.image('star', 'assets/star.png');
    	//Cargamos ahora el mapa en json del nivel
    	this.game.load.tilemap('level','assets/mapPrueba.json',null,Phaser.Tilemap.TILED_JSON);
    	//Cargamos tiles
    	this.game.load.image('tiles','assets/tiles.png');
	},

	create: function() {



		tLevel.ground= game.add.tilemap('level');

		tLevel.ground.addTilesetImage('tiles');

		tLevel.ground.setCollisionBetween(7, 13);
		tLevel.ground.setCollisionBetween(21,27);

		/// El nombre que le indicamos es el que esta indicado en el valor "name:" del *.json
		tLevel.groundLayer= tLevel.ground.createLayer('ground');
		tLevel.groundLayer.resizeWorld();
		tLevel.groundLayer.debug=true;

	    // create a group for stars
	    tLevel.stars = game.add.group();
	    tLevel.stars.enableBody = true;
	 
	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 12; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = tLevel.stars.create(i * 70, 0, 'star');
	 
	        //  Let gravity do its thing
	        star.body.gravity.y = 600;
	 
	        //  TLevel just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	},

	update: function() {

		tLevel.game.physics.arcade.collide(tLevel.stars, tLevel.groundLayer);
	}

};