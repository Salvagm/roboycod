/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="../cdvs/CdvMatrix.ts"/>
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
            this.TWEEN_SCALE = 0.2;
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
            //TODO TEST
            //this.cm = new CdvMatrix();
            //this.cm.add(new CdvLogic(CdvLogic.TYPES[0]));
            //this.cm.add(new CdvLogic(CdvLogic.TYPES[2]));
            //this.cm.add(new CdvLogic(CdvLogic.TYPES[2]));
            //
            //var cdvMatrix  = JSON.stringify(this.cm);
            //console.log(cdvMatrix);
            //
            //this.gameData.cdvMatrix = this.cm;
            //console.log(this.gameData);
            //TODO FIN TEST
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
            console.log("Aumento la escala de " + this.x + ", " + this.y);
            this.buildNavigationMatrix();
            this.nav[this.x][this.y].icon.scale.x += this.TWEEN_SCALE;
            this.nav[this.x][this.y].icon.scale.y += this.TWEEN_SCALE;
            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.kh.setupInventory(this);
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
            var jsonItem;
            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for (var i = 0; i < this.ROWS; ++i) {
                this.nav[i] = [];
                for (var j = 0; j < this.COLS; ++j) {
                    this.nav[i][j] = new MatrixContent();
                    item = this.nav[i][j];
                    //En la layer CDV_L se encontraran los objetos del Tiled
                    jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[j];
                    jsonItem.x /= this.widthRatio;
                    jsonItem.y /= this.heightRatio;
                    //Si existe un cdvLogico pintamos su sprite
                    if (!(this.cm.data[i][j] === undefined)) {
                        item.icon = this.game.add.sprite(jsonItem.x, jsonItem.y, 'inventoryTiles', i);
                        //Escalamos
                        item.icon.width = item.icon.width / this.widthRatio;
                        item.icon.height = item.icon.height / this.heightRatio;
                        item.icon.anchor.set(0.5, 0.5);
                        //Guardamos la escala general para hacer los tweens
                        this.initScale = new Phaser.Point(item.icon.scale.x, item.icon.scale.y);
                    }
                }
            }
        };
        /**
         * Funcion para resaltar el icono seleccionado
         * @param icono el logo seleccionado
         */
        Inventory.prototype.enlargeTween = function (item) {
            var s = this.game.add.tween(item.icon.scale);
            s.to({ x: this.initScale.x + this.TWEEN_SCALE, y: this.initScale.y + this.TWEEN_SCALE }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Funcion para reducir el icono desseleccionado
         * @param icono el logo desseleccionado
         */
        Inventory.prototype.reduceTween = function (item) {
            var s = this.game.add.tween(item.icon.scale);
            s.to({ x: this.initScale.x, y: this.initScale.y }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        Inventory.prototype.moveSelection = function (key, x, y) {
            var found = false;
            var oldX = this.x;
            var oldY = this.y;
            while (!found && this.x >= 0 && this.x < this.ROWS && this.y >= 0 && this.y < this.COLS) {
                this.x += x;
                this.y += y;
                if (this.nav[this.x] != undefined)
                    if (this.nav[this.x][this.y] != undefined)
                        if (this.nav[this.x][this.y].icon != undefined)
                            found = true;
            }
            if (!found) {
                this.x = oldX;
                this.y = oldY;
            }
            this.reduceTween(this.nav[oldX][oldY]);
            this.enlargeTween(this.nav[this.x][this.y]);
        };
        return Inventory;
    })(Phaser.State);
    Roboycod.Inventory = Inventory;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Inventory.js.map