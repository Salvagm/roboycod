KeyboardHandler = function(game) {

	tKeyboard = this;

	tKeyboard.game = game;		
};

KeyboardHandler.prototype = {

	//TODO: Trap all combination of shorcuts and make sure it doesnt get handled by the browser
	create: function() {               

		//TODO Pasar a Keyboard.cfg
		//Key Map		
		tKeyboard.Up    = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.W);
        tKeyboard.Left  = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.A);
        tKeyboard.Down  = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.S);
        tKeyboard.Right = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.D);

        tKeyboard.ArrowUp = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        tKeyboard.ArrowLeft = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        tKeyboard.ArrowDown = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        tKeyboard.ArrowRight = tKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);



        //Key Function
       	tKeyboard.Left.onHoldCallback = player.moveLeft;
        tKeyboard.Right.onHoldCallback = player.moveRight;    
        tKeyboard.Up.onHoldCallback = player.jump;
        //Cambiar por onDownCallback (no funciona)
        tKeyboard.ArrowRight.onHoldCallback = player.shoot;        


        tKeyboard.game.input.keyboard.onUpCallback = player.stopMove;        
        

	}
};