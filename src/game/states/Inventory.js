/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="../cdvs/CdvMatrix.ts"/>
///<reference path="../states/Game.ts"/>
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
            // Cargamos los datos de juego
            this.gameData = Roboycod.GameManager.getInstance().getData(this.game);
            this.isEmpty = this.gameData.inventory.isEmpty;
            this.x = this.gameData.inventory.x;
            this.y = this.gameData.inventory.y;
            this.cm = new Roboycod.CdvMatrix(this.gameData.cdvMatrix.data);
            // Cargamos la parte grafica
            this.game.stage.backgroundColor = 0x272822;
            this.jsonTiled = this.game.cache.getJSON('jsonInventory', true);
            this.background = this.game.add.image(0, 0, 'inventoryBackground');
            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            //Cargamos la matriz de navegacion
            this.buildNavigationMatrix();
            if (!this.isEmpty) {
                this.nav[this.x][this.y].icon.scale.x += this.TWEEN_SCALE;
                this.nav[this.x][this.y].icon.scale.y += this.TWEEN_SCALE;
            }
            // Definimos y mapeamos las teclas correspondientes
            Roboycod.KeyboardHandler.getInstance().setupInventory(this);
            Inventory._instance = this;
            //Mostramos el editor
            var editor = document.getElementById('editor');
            editor.style.display = 'block';
        };
        Inventory.prototype.navToLastState = function () {
            this.gameData.inventory.x = this.x;
            this.gameData.inventory.y = this.y;
            this.gameData.inventory.isEmpty = this.isEmpty;
            //TODO mirar cuando guardar
            Roboycod.GameManager.getInstance().save();
            //Ocultamos el editor
            var editor = document.getElementById('editor');
            editor.style.display = 'none';
            this.game.state.start(this.lastStage, true, false, this.numStage);
        };
        Inventory.prototype.buildNavigationMatrix = function () {
            var item;
            var jsonItem;
            var compiledFrame = 5;
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
                    if (this.cm.data[i][j] !== undefined) {
                        //TODO quitar codigo
                        this.cm.data[i][j].isCompiled = true;
                        compiledFrame = this.cm.data[i][j].isCompiled ? 6 : 5;
                        item.compiled = this.game.add.sprite(jsonItem.x, jsonItem.y, 'inventoryTiles', compiledFrame);
                        item.icon = this.game.add.sprite(jsonItem.x, jsonItem.y, 'inventoryTiles', i);
                        //Escalamos
                        item.icon.width = item.icon.width / this.widthRatio;
                        item.icon.height = item.icon.height / this.heightRatio;
                        item.icon.anchor.set(0.5, 0.5);
                        item.compiled.width = item.icon.width;
                        item.compiled.height = item.icon.height;
                        item.compiled.anchor.set(0.5, 0.5);
                        //Guardamos la escala general para hacer los tweens
                        this.initScale = new Phaser.Point(item.icon.scale.x, item.icon.scale.y);
                        //Si fuese el primer elemento nos situariamos en el
                        if (this.isEmpty) {
                            this.x = i;
                            this.y = j;
                            this.isEmpty = false;
                        }
                        //Pintamos la seleccion
                        if (this.cm.data[i][j].isSelected) {
                            this.drawSelection(this.nav[i][j]);
                        }
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
            if (!this.isEmpty) {
                this.reduceTween(this.nav[oldX][oldY]);
                this.enlargeTween(this.nav[this.x][this.y]);
                this.cm.data[this.x][this.y].showCode();
            }
        };
        /**
         * Trata de equipar el cdv seleccionado
         */
        Inventory.prototype.equipCdv = function () {
            var item = this.cm.data[this.x][this.y];
            var yFound = -1;
            //Miramos si hay algun otro cdv seleccionado
            if (item.isCompiled == true) {
                for (var j = 0; yFound == -1 && j < this.COLS; j++) {
                    if (this.cm.data[this.x][j] != undefined && this.cm.data[this.x][j].isSelected) {
                        yFound = j;
                    }
                }
                //Eliminamos la seleccion anterior
                if (yFound != -1) {
                    console.log(this.nav[this.x][yFound]);
                    this.cm.data[this.x][yFound].isSelected = false;
                    this.nav[this.x][yFound].selected.kill();
                }
                item.isSelected = true;
                this.drawSelection(this.nav[this.x][this.y]);
            }
        };
        /**
         * Va al editor para escribir en el CDV, al volver guarda
         */
        Inventory.prototype.writeCdv = function () {
            this.input.keyboard.stop();
            //Nos movemos al editor, al final del codigo
            var editor = ace.edit("editor");
            var row = editor.session.getLength() - 1;
            var column = editor.session.getLine(row).length;
            editor.gotoLine(row + 1, column);
            editor.focus();
        };
        /**
         * Esta funcion guarda la edicion actual del editor en el cdv
         */
        Inventory.prototype.saveCdv = function () {
            var editor = ace.edit("editor");
            editor.blur();
            this.cm.data[this.x][this.y].code = editor.getValue();
            Roboycod.GameManager.getInstance().save();
            this.input.keyboard.start();
        };
        /**
         * Esta funcion da acceso a la instancia desde fuera
         */
        Inventory.getInstance = function () {
            return Inventory._instance;
        };
        Inventory.prototype.drawSelection = function (graphicItem) {
            graphicItem.selected = this.game.add.sprite(graphicItem.icon.x, graphicItem.icon.y, 'inventoryTiles', 7);
            graphicItem.selected.width = graphicItem.compiled.width;
            graphicItem.selected.height = graphicItem.compiled.height;
            graphicItem.selected.anchor.set(0.5, 0.5);
        };
        return Inventory;
    })(Phaser.State);
    Roboycod.Inventory = Inventory;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Inventory.js.map