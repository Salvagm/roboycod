

Player = function(game) {

	tPlayer = this;

	tPlayer.game = game;
	tPlayer.sprite = null;
	tPlayer.cursors = null;
	tPlayer.direction = 1;	
	tPlayer.animState = 0;
	tPlayer.vState = [];
	tPlayer.endShot = true;
	
};

Player.prototype = {

	preload: function () {
		tPlayer.game.load.atlasJSONHash('robot1', 'assets/player/mega1Atlas.png', 'assets/player/mega1Atlas.json');		
	},

	create: function () {

		//	Define movement constants
	    tPlayer.MAX_SPEED = 250; // pixels/second
	    tPlayer.GRAVITY = 1800; // pixels/second/second
	    tPlayer.JUMP_SPEED = -800; // pixels/second (negative y is up)
	    // tPlayer.ACCELERATION = 1500; // pixels/second/second
	    // tPlayer.DRAG = 600; // pixels/second

		tPlayer.sprite = tPlayer.game.add.sprite(1024, 512, 'robot1');
		tPlayer.game.physics.enable(tPlayer.sprite);

	    //	Player physics properties
	    tPlayer.sprite.body.bounce.y = 0;
	    tPlayer.sprite.body.gravity.y = tPlayer.GRAVITY;
	    tPlayer.sprite.body.collideWorldBounds = true;
		tPlayer.sprite.body.setSize(58,60);

	    tPlayer.sprite.animations.add('idle', [2, 2, 2, 2, 3, 2, 2, 2, 2], 4, true);
	    tPlayer.sprite.animations.add('run', [5, 6, 7], 8, true);
	    tPlayer.sprite.animations.add('jump', [8], 5, false);
	    tPlayer.sprite.animations.add('shoot', [11], 3, false);

	    tPlayer.sprite.animations.play('idle');	

	    //	Define animation states

	    tPlayer.vState[0] = ['idle'];
	    tPlayer.vState[1] = ['run'];	    
	    tPlayer.vState[2] = ['jump'];
	    tPlayer.vState[3] = ['shoot'];

	    //callback end shoot
	    tPlayer.sprite.animations.getAnimation('shoot').onStart.add(function(){
	    	tPlayer.endShot = false;	    	
	    });
	    tPlayer.sprite.animations.getAnimation('shoot').onComplete.add(function(){
	    	tPlayer.endShot = true;
	    });

	},
	collectStar: function(player, star) {	    
	    star.kill();
	    hud.score += 10;
	    hud.drawScore();
	},

	stopMove: function(){									
		tPlayer.sprite.body.velocity.x = 0;	
	},

	moveLeft: function () { 		
		tPlayer.moveTo(-1); 
	},
	moveRight: function () { 		
		tPlayer.moveTo(1);
	},

	moveTo: function(direction, anim){				
		if(tPlayer.direction!=direction){			
    		tPlayer.sprite.anchor.setTo(.5,.0);
	    	tPlayer.sprite.scale.x *= -1;
	    	tPlayer.direction = direction;	    	
	    }
    	tPlayer.sprite.body.velocity.x = direction*tPlayer.MAX_SPEED;    	
	},
	jump: function(){
		if(tPlayer.sprite.body.onFloor())
			tPlayer.sprite.body.velocity.y = tPlayer.JUMP_SPEED;		
		tPlayer.sprite.body.velocity.x=0;
	},
	shoot: function(){
		tPlayer.sprite.body.velocity.x = 0;	
		bullet.shoot();			
	},

	update: function() {			    
		tPlayer.game.physics.arcade.collide(tPlayer.sprite, level.groundLayer); 
    	tPlayer.game.physics.arcade.overlap(tPlayer.sprite, level.stars, tPlayer.collectStar); 
    	
    	//Anim FSM
    	if(tPlayer.endShot){
    		if(tPlayer.sprite.body.velocity.x != 0)
    			tPlayer.animState = 1;
    		else if(tPlayer.sprite.body.velocity.y != 0)
    			tPlayer.animState = 2;
    		else if(thisKeyboard.ArrowRight.isDown)
    			tPlayer.animState = 3;
    		else 
    			tPlayer.animState = 0;
    	}

    	tPlayer.sprite.animations.play(tPlayer.vState[tPlayer.animState]); 	
	}
};