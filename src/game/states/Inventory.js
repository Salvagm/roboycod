/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory() {
            _super.apply(this, arguments);
        }
        Inventory.prototype.create = function () {
            this.game.stage.backgroundColor = 0x272822;
            this.json = this.game.cache.getJSON('jsonINventory');
            this.background = this.game.add.image(0, 0, 'inventoryBackground');
            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.kh.setUpInventory(this);
        };
        Inventory.prototype.navToWorldMap = function () {
            this.game.state.start('WorldMap', true, false);
        };
        return Inventory;
    })(Phaser.State);
    Roboycod.Inventory = Inventory;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Inventory.js.map