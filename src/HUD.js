
HUD = function(game) {
	tHUD = this;
	tHUD.game = game;
	tHUD.score = 0;
	tHUD.scoreText = null;
};

HUD.prototype = {

	create: function() {
		tHUD.scoreText = tHUD.game.add.text(16, 16, 'score: '+tHUD.score, { fontSize: '32px', fill: '#000' });
	},

	drawScore: function () {
		tHUD.scoreText.text = 'score: '+tHUD.score;
	}

};