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
            this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.tab = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        }
        KeyboardHandler.prototype.setupStage = function (stage, player) {
            this.tab.onDown.add(stage.navToInventory, stage);
            this.setupPlayer(player);
        };
        KeyboardHandler.prototype.setupPlayer = function (player) {
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
        KeyboardHandler.prototype.setupWorldMap = function (worldMap) {
            this.arrowUp.onDown.add(worldMap.moveSelection, worldMap, null, -1, 0);
            this.arrowDown.onDown.add(worldMap.moveSelection, worldMap, null, 1, 0);
            this.arrowLeft.onDown.add(worldMap.moveSelection, worldMap, null, 0, -1);
            this.arrowRight.onDown.add(worldMap.moveSelection, worldMap, null, 0, 1);
            this.tab.onDown.add(worldMap.navToInventory, worldMap);
            this.enter.onDown.add(worldMap.startStage, worldMap);
        };
        KeyboardHandler.prototype.setupInventory = function (inventory) {
            this.arrowUp.onDown.add(inventory.moveSelection, inventory, null, -1, 0);
            this.arrowDown.onDown.add(inventory.moveSelection, inventory, null, 1, 0);
            this.arrowLeft.onDown.add(inventory.moveSelection, inventory, null, 0, -1);
            this.arrowRight.onDown.add(inventory.moveSelection, inventory, null, 0, 1);
            this.tab.onDown.add(inventory.navToLastState, inventory);
        };
        return KeyboardHandler;
    })(Phaser.Keyboard);
    Roboycod.KeyboardHandler = KeyboardHandler;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=KeyboardHandler.js.map