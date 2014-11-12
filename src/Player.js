

Player = function(game) {

	thisPlayer = this;

	thisPlayer.game = game;
	thisPlayer.sprite = null;
	thisPlayer.cursors = null;
	thisPlayer.direction = 1;	
	thisPlayer.animState = 0;
	thisPlayer.vState = [];
	thisPlayer.endShot = true;
	
};

Player.prototype = {

	preload: function () {
		thisPlayer.game.load.atlasJSONHash('robot1', 'assets/player/mega1Atlas.png', 'assets/player/mega1Atlas.json');		
	},

	create: function () {

		//	Define movement constants
	    thisPlayer.MAX_SPEED = 250; // pixels/second
	    thisPlayer.GRAVITY = 1800; // pixels/second/second
	    thisPlayer.JUMP_SPEED = -800; // pixels/second (negative y is up)
	    // thisPlayer.ACCELERATION = 1500; // pixels/second/second
	    // thisPlayer.DRAG = 600; // pixels/second

		thisPlayer.sprite = thisPlayer.game.add.sprite(1024, 512, 'robot1');
		thisPlayer.game.physics.enable(thisPlayer.sprite);

	    //	Player physics properties
	    thisPlayer.sprite.body.bounce.y = 0;
	    thisPlayer.sprite.body.gravity.y = thisPlayer.GRAVITY;
	    thisPlayer.sprite.body.collideWorldBounds = true;
		thisPlayer.sprite.body.setSize(58,60);

	    thisPlayer.sprite.animations.add('idle', [2, 2, 2, 2, 3, 2, 2, 2, 2], 4, true);
	    thisPlayer.sprite.animations.add('run', [5, 6, 7], 8, true);
	    thisPlayer.sprite.animations.add('jump', [8], 5, false);
	    thisPlayer.sprite.animations.add('shoot', [11], 3, false);

	    thisPlayer.sprite.animations.play('idle');	

	    //	Define animation states

	    thisPlayer.vState[0] = ['idle'];
	    thisPlayer.vState[1] = ['run'];	    
	    thisPlayer.vState[2] = ['jump'];
	    thisPlayer.vState[3] = ['shoot'];

	    //callback end shoot
	    thisPlayer.sprite.animations.getAnimation('shoot').onStart.add(function(){
	    	thisPlayer.endShot = false;	    	
	    });
	    thisPlayer.sprite.animations.getAnimation('shoot').onComplete.add(function(){
	    	thisPlayer.endShot = true;
	    });

	},
	collectStar: function(player, star) {	    
	    star.kill();
	    hud.score += 10;
	    hud.drawScore();
	},

	stopMove: function(){									
		thisPlayer.sprite.body.velocity.x = 0;	
	},

	moveLeft: function () { 		
		thisPlayer.moveTo(-1); 
	},
	moveRight: function () { 		
		thisPlayer.moveTo(1);
	},

	moveTo: function(direction, anim){				
		if(thisPlayer.direction!=direction){			
    		thisPlayer.sprite.anchor.setTo(.5,.0);
	    	thisPlayer.sprite.scale.x *= -1;
	    	thisPlayer.direction = direction;	    	
	    }
    	thisPlayer.sprite.body.velocity.x = direction*thisPlayer.MAX_SPEED;    	
	},
	jump: function(){
		if(thisPlayer.sprite.body.onFloor())
			thisPlayer.sprite.body.velocity.y = thisPlayer.JUMP_SPEED;		
		thisPlayer.sprite.body.velocity.x=0;
	},
	shoot: function(){
		thisPlayer.sprite.body.velocity.x = 0;	
		bullet.shoot();			
	},

	update: function() {			    
		thisPlayer.game.physics.arcade.collide(thisPlayer.sprite, level.groundLayer); 
    	thisPlayer.game.physics.arcade.overlap(thisPlayer.sprite, level.stars, thisPlayer.collectStar); 
    	
    	//Anim FSM
    	if(thisPlayer.endShot){
    		if(thisPlayer.sprite.body.velocity.y != 0)
    			thisPlayer.animState = 2;
    		else if(thisPlayer.sprite.body.velocity.x != 0)
    			thisPlayer.animState = 1;
    		else if(thisKeyboard.ArrowRight.isDown)
    			thisPlayer.animState = 3;
    		else 
    			thisPlayer.animState = 0;
    	}

    	thisPlayer.sprite.animations.play(thisPlayer.vState[thisPlayer.animState]); 	
	}
};