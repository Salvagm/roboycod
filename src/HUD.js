
HUD = function(game) {
	thisHUD = this;
	thisHUD.game = game;
	thisHUD.score = 0;
	thisHUD.scoreText = null;
};

HUD.prototype = {

	create: function() {
		thisHUD.scoreText = thisHUD.game.add.text(16, 16, 'score: '+thisHUD.score, { fontSize: '32px', fill: '#000' });
	},

	drawScore: function () {
		thisHUD.scoreText.text = 'score: '+thisHUD.score;
	}

};