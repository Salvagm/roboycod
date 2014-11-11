

Player = function(game) {

	thisPlayer = this;

	thisPlayer.game = game;
	thisPlayer.sprite = null;
	thisPlayer.cursors = null;
	thisPlayer.direction = 1;	
	thisPlayer.animState = 0;
	thisPlayer.vState = [];
	
};

Player.prototype = {

	preload: function () {
		thisPlayer.game.load.atlasJSONHash('robot1', 'assets/player/mega1Atlas.png', 'assets/player/mega1Atlas.json');		
	},

	create: function () {

		// Define movement constants
	    thisPlayer.MAX_SPEED = 250; // pixels/second
	    thisPlayer.ACCELERATION = 1500; // pixels/second/second
	    thisPlayer.DRAG = 600; // pixels/second
	    thisPlayer.GRAVITY = 1800; // pixels/second/second
	    thisPlayer.JUMP_SPEED = -800; // pixels/second (negative y is up)

		thisPlayer.sprite = thisPlayer.game.add.sprite(1024, 512, 'robot1');
		thisPlayer.game.physics.enable(thisPlayer.sprite);

	    //  Player physics properties. Give the little guy a slight bounce.
	    thisPlayer.sprite.body.bounce.y = 0;
	    thisPlayer.sprite.body.gravity.y = thisPlayer.GRAVITY;
	    thisPlayer.sprite.body.collideWorldBounds = true;
		thisPlayer.sprite.body.setSize(58,60);

	    thisPlayer.sprite.animations.add('idle', [2, 3], 2, true);
	    thisPlayer.sprite.animations.add('left', [5, 6, 7], 8, true);
	    thisPlayer.sprite.animations.add('right', [5, 6, 7], 8, true);
	    thisPlayer.sprite.animations.add('jump', [8], 5, false);
	    thisPlayer.sprite.animations.add('shoot', [11], 3, false);

	    thisPlayer.sprite.animations.play('idle');	

	    //Define animation states

	    thisPlayer.vState[0] = ['idle'];
	    thisPlayer.vState[1] = ['left'];
	    thisPlayer.vState[2] = ['right'];
	    thisPlayer.vState[3] = ['jump'];
	    thisPlayer.vState[4] = ['shoot'];

	    //callback end shoot
	    thisPlayer.sprite.animations.getAnimation('shoot').onComplete.add(function(){
	    	thisPlayer.idle();
	    });

	},
	collectStar: function(player, star) {	    
	    star.kill();
	    hud.score += 10;
	    hud.drawScore();
	},

	idle: function(){	
		if(thisPlayer.sprite.body.onFloor()){				
			thisPlayer.animState = 0;	
			thisPlayer.sprite.body.velocity.x = 0;	
		}	
	},

	moveLeft: function () { 
		if(thisPlayer.sprite.body.onFloor())
			thisPlayer.animState = 1;	
		thisPlayer.moveTo(-1); 
	},
	moveRight: function () { 
		if(thisPlayer.sprite.body.onFloor())
			thisPlayer.animState = 2;	
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
		if(thisPlayer.sprite.body.onFloor()){
			thisPlayer.animState = 3;
			thisPlayer.sprite.body.velocity.y = thisPlayer.JUMP_SPEED;
		}
	},
	shoot: function(){
		thisPlayer.animState = 4;
		thisPlayer.sprite.body.velocity.x = 0;
		
		
	},

	update: function() {			    
		thisPlayer.game.physics.arcade.collide(thisPlayer.sprite, level.groundLayer); 
    	thisPlayer.game.physics.arcade.overlap(thisPlayer.sprite, level.stars, thisPlayer.collectStar); 
    	

    	//SACAR MAQUINA DE ESTADOS SOLO PARA ANIMACIONES
    	//ESTA CASA ES UNA RUINA NEED ---> FIX
    	switch(thisPlayer.animState){
    		case 3:
    			if(thisPlayer.sprite.body.onFloor())
    				thisPlayer.idle();
    			break;
    		   			
    	}

	    if (thisPlayer.game.input.activePointer.isDown) 
	        thisPlayer.shoot();	        


    	//play animation state

    	thisPlayer.sprite.animations.play(thisPlayer.vState[thisPlayer.animState]); 	
	}
};