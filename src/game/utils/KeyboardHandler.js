/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var roboycod;
(function (roboycod) {
    var KeyboardHandler = (function (_super) {
        __extends(KeyboardHandler, _super);
        function KeyboardHandler() {
            _super.apply(this, arguments);
        }
        KeyboardHandler.prototype.create = function () {
            this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            //Key Function
            //this.left.onHoldCallback = roboycod.Player.moveLeft;
            //this.right.onHoldCallback = Player.moveRight;
            //this.up.onHoldCallback = Player.jump;
            ////Cambiar por onDownCallback (no funciona)
            //this.arrowRight.onHoldCallback = Player.shoot;
            //
            //
            //this.game.input.keyboard.onUpCallback = Player.stopMove;
        };
        return KeyboardHandler;
    })(Phaser.Keyboard);
    roboycod.KeyboardHandler = KeyboardHandler;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=KeyboardHandler.js.map