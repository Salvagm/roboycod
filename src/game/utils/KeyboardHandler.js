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
            this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        }
        KeyboardHandler.prototype.setupStage = function (player) {
            this.arrowLeft.onHoldCallback = player.moveLeft;
            this.arrowLeft.onHoldContext = player;
            this.arrowRight.onHoldCallback = player.moveRight;
            this.arrowRight.onHoldContext = player;
            this.space.onHoldCallback = player.jump;
            this.space.onHoldContext = player;
            this.W.onHoldCallback = player.shoot;
            this.W.onHoldContext = player;
            this.addCallbacks(player, null, player.stopMove, null);
        };
        KeyboardHandler.prototype.setUpWorldMap = function (worldMap) {
            this.arrowUp.onDown.add(worldMap.moveSelection, worldMap, null, -1, 0);
            this.arrowDown.onDown.add(worldMap.moveSelection, worldMap, null, 1, 0);
            this.arrowLeft.onDown.add(worldMap.moveSelection, worldMap, null, 0, -1);
            this.arrowRight.onDown.add(worldMap.moveSelection, worldMap, null, 0, 1);
        };
        return KeyboardHandler;
    })(Phaser.Keyboard);
    Roboycod.KeyboardHandler = KeyboardHandler;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=KeyboardHandler.js.map