/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var MatrixContent = (function () {
        function MatrixContent() {
        }
        return MatrixContent;
    })();
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory() {
            _super.apply(this, arguments);
            //	Constants
            this.CDV_L = [4, 5, 6, 7];
            this.ROWS = 4;
            this.COLS = 5;
            this.TWEEN_SCALE = 0.1;
        }
        Inventory.prototype.init = function (lastStage, numStage) {
            this.lastStage = lastStage;
            this.numStage = numStage;
        };
        Inventory.prototype.create = function () {
            /**
             * Cargamos los datos de juego
             */
            this.gameData = this.game.cache.getJSON('gameData');
            if (this.gameData.inventory.firstLoad == "false") {
                this.x = this.gameData.inventory.x;
                this.y = this.gameData.inventory.y;
            }
            else {
                this.x = this.y = 0;
                this.gameData.inventory.firstLoad = "false";
            }
            /**
             * Cargamos la parte grafica
             */
            this.game.stage.backgroundColor = 0x272822;
            this.jsonTiled = this.game.cache.getJSON('jsonInventory', true);
            this.background = this.game.add.image(0, 0, 'inventoryBackground');
            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            /**
             * Cargamos
             */
            this.buildNavigationMatrix();
            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.kh.setupInventory(this);
            //TODO TEST
            var item;
            var numItem = 0;
            this.cdvMatrix = [];
            for (var i = 0; i < this.ROWS; ++i) {
                this.cdvMatrix[i] = [];
                for (var j = 0; j < this.COLS; ++j) {
                    //TODO separar de matriz logica
                    this.cdvMatrix[i][j] = new Roboycod.CdvLogic(Roboycod.CdvLogic.TYPES[i]);
                    item = this.cdvMatrix[i][j];
                    item.cdvType = Roboycod.CdvLogic.TYPES[i];
                    item.id = numItem;
                    item.isCompiled = true;
                    item.code = "print(\"SALTO\")";
                    ++numItem;
                }
            }
            var jsonData = JSON.stringify(this.cdvMatrix);
            console.log(jsonData);
        };
        Inventory.prototype.navToLastState = function () {
            this.gameData.inventory.x = this.x;
            this.gameData.inventory.y = this.y;
            //Guardar CDV
            //Mandar CDVs Equipados al HUD
            this.game.state.start(this.lastStage, true, false, this.numStage);
        };
        Inventory.prototype.buildNavigationMatrix = function () {
            var item;
            var numItem;
            var jsonItem;
            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for (var i = 0; i < this.ROWS; ++i) {
                numItem = 0;
                this.nav[i] = [];
                for (var j = 0; j < this.COLS; ++j) {
                    this.nav[i][j] = new MatrixContent();
                    item = this.nav[i][j];
                    //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
                    jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[numItem];
                    jsonItem.x /= this.widthRatio;
                    jsonItem.y /= this.heightRatio;
                    item.sprite = this.game.add.sprite(jsonItem.x, jsonItem.y, 'inventoryTiles', i);
                    //Escalamos
                    item.sprite.width = item.sprite.width / this.widthRatio;
                    item.sprite.height = item.sprite.height / this.heightRatio;
                    item.sprite.anchor.set(0.5, 0.5);
                    ++numItem;
                }
            }
            //Guardamos la escala general para hacer los tweens
            this.initScale = new Phaser.Point(item.sprite.scale.x, item.sprite.scale.y);
        };
        return Inventory;
    })(Phaser.State);
    Roboycod.Inventory = Inventory;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Inventory.js.map