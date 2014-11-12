Bullet = function(game){
	thisBullet = this;

	thisBullet.game = game;
};

Bullet.prototype = {

	preload: function(){
		thisBullet.game.load.atlasJSONHash('bullet1', 'assets/player/bullet1Atlas.png', 'assets/player/bullet1Atlas.json');		
	},
	create: function(){

	    // Define constants
    	thisBullet.SHOT_DELAY = 300; // milliseconds (10 bullets/second)
    	thisBullet.BULLET_SPEED = 500; // pixels/second
    	thisBullet.NUMBER_OF_BULLETS = 9;

    	//-----BULLET POOL -----//
	    thisBullet.bulletPool = thisBullet.game.add.group();
	    for(var i = 0; i < thisBullet.NUMBER_OF_BULLETS; ++i){

	        var bullet = thisBullet.game.add.sprite(146, 15, 'bullet1');  
	        bullet.animations.add('idle', [0, 1, 2, 3], 7, true); 
	        thisBullet.bulletPool.add(bullet);

	        thisBullet.game.physics.enable(bullet, Phaser.Physics.ARCADE);
	        bullet.kill();
	    }

	},
	shoot: function() {
	    // Enforce a short delay between shots by recording
	    // the time that each bullet is shot and testing if
	    // the amount of time since the last shot is more than
	    // the required delay.
	    if (thisBullet.lastBulletShotAt === undefined) thisBullet.lastBulletShotAt = 0;
	    if (thisBullet.game.time.now - thisBullet.lastBulletShotAt < thisBullet.SHOT_DELAY) return;
	    thisBullet.lastBulletShotAt = thisBullet.game.time.now;

	    // Get a dead bullet from the pool
	    var bullet = thisBullet.bulletPool.getFirstDead();

	    // If there aren't any bullets available then don't shoot
	    if (bullet === null || bullet === undefined) return;

	    // Revive the bullet
	    // thisBullet makes the bullet "alive"
	    bullet.revive();

	    bullet.checkWorldBounds = true;
	    bullet.outOfBoundsKill = true;

	    // Set the bullet position to the gun position.
	    bullet.reset(player.sprite.x+(35*player.direction), player.sprite.y+25);

	    // Shoot it
	    bullet.scale.x = player.sprite.scale.x;
	    bullet.body.velocity.x = player.direction*thisBullet.BULLET_SPEED;
	    bullet.body.velocity.y = 0;
	},
	update: function(){
		// thisBullet.sprite.x = player.sprite.x;
		// thisBullet.sprite.y = player.sprite.y;
		// thisBullet.sprite.animations.play('idle');

		  // Shoot a bullet
	    if (thisKeyboard.ArrowRight.isDown) {
	        thisBullet.shoot();	        
	    }
	}
};