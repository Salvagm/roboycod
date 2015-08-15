/**
 * Created by javi on 5/08/15.
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
    var MatrixContent = (function () {
        function MatrixContent() {
        }
        return MatrixContent;
    })();
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.apply(this, arguments);
            //	Constants
            this.LOGO_L = 6;
        }
        WorldMap.prototype.create = function () {
            /**
             * Cargamos los datos de juego
             */
            this.statesData = this.game.cache.getJSON('jsonStatesData');
            if (this.statesData.worldMap.firstLoad == "false") {
                this.x = this.statesData.worldMap.x;
                this.y = this.statesData.worldMap.y;
            }
            else {
                this.x = this.y = 0;
                this.statesData.worldMap.firstLoad = "false";
            }
            /**
             * Cargamos los elementos del worldMap
             */
            // con true hacemos una copia del JSON para no modificarlo
            this.jsonTiles = this.game.cache.getJSON('jsonWorldMap', true);
            this.background = this.game.add.image(0, 0, 'worldMap');
            //Guardamos la proporcion en la que se escalan los tiles
            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            /**
             * Creamos la matriz para navegar y poder elegir stage,
             * el area de seleccion y las teclas
             */
            this.buildNavigationMatrix();
            this.enlargeTween(this.nav[this.x][this.y]);
            this.nav[this.x][this.y].sprite.loadTexture('worldTiles', parseInt(this.nav[this.x][this.y].jsonItem.properties.stage) + 6);
            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.kh.setUpWorldMap(this);
        };
        /**
         * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
         * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
         */
        WorldMap.prototype.buildNavigationMatrix = function () {
            this.nav = [];
            this.nav[0] = [];
            this.nav[1] = [];
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.nav[i][j] = new MatrixContent();
                }
            }
            //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
            this.nav[0][0].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[0];
            this.nav[0][1].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[1];
            this.nav[0][2].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[2];
            this.nav[1][0].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[3];
            this.nav[1][1].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[4];
            this.nav[1][2].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[5];
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.nav[i][j].jsonItem.x /= this.widthRatio;
                    this.nav[i][j].jsonItem.y /= this.heightRatio;
                    this.nav[i][j].sprite = this.game.add.sprite(this.nav[i][j].jsonItem.x, this.nav[i][j].jsonItem.y, 'worldTiles', parseInt(this.nav[i][j].jsonItem.properties.stage));
                    //Escalamos
                    this.nav[i][j].sprite.width = this.nav[i][j].sprite.width / this.widthRatio;
                    this.nav[i][j].sprite.height = this.nav[i][j].sprite.height / this.heightRatio;
                    this.nav[i][j].sprite.anchor.set(0.5, 0.5);
                }
            }
            //Guardamos la escala general para hacer los tweens
            this.tweenScale = new Phaser.Point(this.nav[0][0].sprite.scale.x, this.nav[0][0].sprite.scale.y);
        };
        /**
         * Funcion para resaltar el logo seleccionado
         * @param logo el logo seleccionado
         */
        WorldMap.prototype.enlargeTween = function (item) {
            var s = this.game.add.tween(item.sprite.scale);
            s.to({ x: this.tweenScale.x + 0.1, y: this.tweenScale.y + 0.1 }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Funcion para reducir el logo desseleccionado
         * @param logo el logo desseleccionado
         */
        WorldMap.prototype.reduceTween = function (item) {
            var s = this.game.add.tween(item.sprite.scale);
            s.to({ x: this.tweenScale.x, y: this.tweenScale.y }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        WorldMap.prototype.moveSelection = function (key, x, y) {
            if (this.x + x >= 0 && this.x + x <= 1) {
                if (this.y + y >= 0 && this.y + y <= 2) {
                    //Cambiamos por el sprite sin seleccion
                    this.nav[this.x][this.y].sprite.loadTexture('worldTiles', parseInt(this.nav[this.x][this.y].jsonItem.properties.stage));
                    this.reduceTween(this.nav[this.x][this.y]);
                    this.x += x;
                    this.y += y;
                    this.enlargeTween(this.nav[this.x][this.y]);
                    //Cambiamos por el sprite con seleccion
                    this.nav[this.x][this.y].sprite.loadTexture('worldTiles', parseInt(this.nav[this.x][this.y].jsonItem.properties.stage) + 6);
                }
            }
        };
        WorldMap.prototype.startStage = function () {
            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;
            var numStage = this.nav[this.x][this.y].jsonItem.properties.stage;
            if (this.game.cache.checkJSONKey('jsonStage' + numStage)) {
                this.game.state.start('Stage', false, false, numStage);
            }
        };
        WorldMap.prototype.navToInventory = function () {
            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;
            this.game.state.start('Inventory', true, false, this.key);
        };
        return WorldMap;
    })(Phaser.State);
    Roboycod.WorldMap = WorldMap;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=WorldMap.js.map