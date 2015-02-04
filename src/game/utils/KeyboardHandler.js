/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var KeyboardHandler = (function (_super) {
        __extends(KeyboardHandler, _super);
        function KeyboardHandler(game) {
            _super.call(this, game);
            this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        }
        KeyboardHandler.prototype.setupLevel = function (player) {
            this.left.onHoldCallback = player.moveLeft;
            this.left.onHoldContext = player;
            this.right.onHoldCallback = player.moveRight;
            this.right.onHoldContext = player;
            this.up.onHoldCallback = player.jump;
            this.up.onHoldContext = player;
            this.arrowRight.onHoldCallback = player.shoot;
            this.arrowRight.onHoldContext = player;
            this.addCallbacks(player, null, player.stopMove, null);
        };
        return KeyboardHandler;
    })(Phaser.Keyboard);
    Roboycod.KeyboardHandler = KeyboardHandler;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=KeyboardHandler.js.map