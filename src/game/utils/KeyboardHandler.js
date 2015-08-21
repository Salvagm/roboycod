/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../states/Stage.ts"/>
///<reference path="../states/Inventory.ts"/>
///<reference path="../states/WorldMap.ts"/>
var Roboycod;
(function (Roboycod) {
    var KeyboardHandler = (function () {
        function KeyboardHandler() {
            if (KeyboardHandler._instance) {
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            KeyboardHandler._instance = this;
        }
        KeyboardHandler.getInstance = function () {
            if (KeyboardHandler._instance === null) {
                KeyboardHandler._instance = new KeyboardHandler();
            }
            return KeyboardHandler._instance;
        };
        KeyboardHandler.prototype.setupStage = function (stage, player) {
            var tab = stage.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            var enter = stage.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            tab.onDown.add(stage.navToInventory, stage);
            enter.onDown.add(stage.navToWorldMap, stage);
            this.setupPlayer(player);
        };
        KeyboardHandler.prototype.setupPlayer = function (player) {
            var space = player.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            var arrowLeft = player.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowRight = player.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            var W = player.game.input.keyboard.addKey(Phaser.Keyboard.W);
            arrowLeft.onHoldCallback = player.moveLeft;
            arrowLeft.onHoldContext = player;
            arrowRight.onHoldCallback = player.moveRight;
            arrowRight.onHoldContext = player;
            space.onHoldCallback = player.jump;
            space.onHoldContext = player;
            W.onHoldCallback = player.shoot;
            W.onHoldContext = player;
            player.game.input.keyboard.addCallbacks(player, null, player.stopMove, null);
        };
        KeyboardHandler.prototype.setupWorldMap = function (worldMap) {
            var enter = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var tab = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            var arrowUp = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            var arrowLeft = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowDown = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            var arrowRight = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            arrowUp.onDown.add(worldMap.moveSelection, worldMap, null, -1, 0);
            arrowDown.onDown.add(worldMap.moveSelection, worldMap, null, 1, 0);
            arrowLeft.onDown.add(worldMap.moveSelection, worldMap, null, 0, -1);
            arrowRight.onDown.add(worldMap.moveSelection, worldMap, null, 0, 1);
            tab.onDown.add(worldMap.navToInventory, worldMap);
            enter.onDown.add(worldMap.startStage, worldMap);
        };
        KeyboardHandler.prototype.setupInventory = function (inventory) {
            var tab = inventory.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            var arrowUp = inventory.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            var arrowLeft = inventory.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowDown = inventory.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            var arrowRight = inventory.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            var E = inventory.game.input.keyboard.addKey(Phaser.Keyboard.E);
            arrowUp.onDown.add(inventory.moveSelection, inventory, null, -1, 0);
            arrowDown.onDown.add(inventory.moveSelection, inventory, null, 1, 0);
            arrowLeft.onDown.add(inventory.moveSelection, inventory, null, 0, -1);
            arrowRight.onDown.add(inventory.moveSelection, inventory, null, 0, 1);
            E.onDown.add(inventory.equipCdv, inventory, null);
            tab.onDown.add(inventory.navToLastState, inventory);
        };
        KeyboardHandler.prototype.setupCdvs = function (stage, cdvList) {
            for (var c in cdvList) {
                var key = stage.game.input.keyboard.addKey(c.keyCode);
                key.onDown.add(function () {
                    console.log("Pulso " + c.keyCode);
                }, c);
            }
        };
        KeyboardHandler._instance = null;
        return KeyboardHandler;
    })();
    Roboycod.KeyboardHandler = KeyboardHandler;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=KeyboardHandler.js.map