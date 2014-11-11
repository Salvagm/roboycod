KeyboardHandler = function(game) {

	thisKeyboard = this;

	thisKeyboard.game = game;		
};

KeyboardHandler.prototype = {

	//TODO: Trap all combination of shorcuts and make sure it doesnt get handled by the browser
	create: function() {               

		//TODO Pasar a Keyboard.cfg
		//Key Map		
		thisKeyboard.Up    = thisKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.W);
        thisKeyboard.Left  = thisKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.A);
        thisKeyboard.Down  = thisKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.S);
        thisKeyboard.Right = thisKeyboard.game.input.keyboard.addKey(Phaser.Keyboard.D);

        //Key Function
       	thisKeyboard.Left.onHoldCallback = player.moveLeft;        
        thisKeyboard.Right.onHoldCallback = player.moveRight;        
        thisKeyboard.Up.onHoldCallback = player.jump;

        thisKeyboard.game.input.keyboard.onUpCallback = player.idle;        
        

	}
};