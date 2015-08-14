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
            this.createStageLogos();
            this.selectedLogo = this.game.add.sprite(this.navMatrix[this.x][this.y].jsonItem.x, this.navMatrix[this.x][this.y].jsonItem.y, 'selectedLogo');
            //Aplicamos la porporcion al area de seleccion
            this.selectedLogo.width = this.selectedLogo.width / this.widthRatio;
            this.selectedLogo.height = this.selectedLogo.height / this.heightRatio;
            this.selectedLogo.anchor.set(0.5, 0.5);
            this.selectedLogo.scale.x += 0.1;
            this.selectedLogo.scale.y += 0.1;
            this.enlargeTween(this.stageLogos[this.x][this.y]);
            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.kh.setUpWorldMap(this);
        };
        WorldMap.prototype.startStage = function () {
            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;
            var numStage = this.navMatrix[this.x][this.y].jsonItem.properties.stage;
            if (this.game.cache.checkJSONKey('jsonStage' + numStage)) {
                this.game.state.start('Stage', false, false, numStage);
            }
        };
        WorldMap.prototype.navToInventory = function () {
            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;
            this.game.state.start('Inventory', true, false, this.key);
        };
        /**
             * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
             * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
             */
        WorldMap.prototype.buildNavigationMatrix = function () {
            this.navMatrix = [];
            this.navMatrix[0] = [];
            this.navMatrix[1] = [];
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.navMatrix[i][j] = new MatrixContent();
                }
            }
            //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
            this.navMatrix[0][0].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[0];
            this.navMatrix[0][1].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[1];
            this.navMatrix[0][2].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[2];
            this.navMatrix[1][0].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[3];
            this.navMatrix[1][1].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[4];
            this.navMatrix[1][2].jsonItem = this.jsonTiles.layers[this.LOGO_L].objects[5];
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.navMatrix[i][j].jsonItem.x /= this.widthRatio;
                    this.navMatrix[i][j].jsonItem.y /= this.heightRatio;
                }
            }
        };
        /**
         * Crea los logos de las fases
         */
        WorldMap.prototype.createStageLogos = function () {
            this.stageLogos = [];
            this.stageLogos[0] = [];
            this.stageLogos[1] = [];
            var numSprite = 0;
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.stageLogos[i][j] = this.game.add.sprite(this.navMatrix[i][j].jsonItem.x, this.navMatrix[i][j].jsonItem.y, 'worldTiles', numSprite);
                    this.stageLogos[i][j].width = this.stageLogos[i][j].width / this.widthRatio;
                    this.stageLogos[i][j].height = this.stageLogos[i][j].height / this.heightRatio;
                    this.stageLogos[i][j].anchor.set(0.5, 0.5);
                    console.log("Escala del sprite : " + numSprite + " = " + this.stageLogos[i][j].scale);
                    ++numSprite;
                }
            }
        };
        /**
         * Funcion para resaltar el logo seleccionado
         * @param logo el logo seleccionado
         */
        WorldMap.prototype.enlargeTween = function (logo) {
            var s = this.game.add.tween(logo.scale);
            s.to({ x: logo.scale.x + 0.1, y: logo.scale.y + 0.1 }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Funcion para reducir el logo desseleccionado
         * @param logo el logo desseleccionado
         */
        WorldMap.prototype.reduceTween = function (logo) {
            var s = this.game.add.tween(logo.scale);
            s.to({ x: logo.scale.x - 0.1, y: logo.scale.y - 0.1 }, 50, Phaser.Easing.Linear.None);
            s.start();
        };
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        WorldMap.prototype.moveSelection = function (key, x, y) {
            if (this.x + x >= 0 && this.x + x <= 1) {
                if (this.y + y >= 0 && this.y + y <= 2) {
                    this.reduceTween(this.stageLogos[this.x][this.y]);
                    this.x += x;
                    this.y += y;
                    this.enlargeTween(this.stageLogos[this.x][this.y]);
                }
                this.selectedLogo.x = this.navMatrix[this.x][this.y].jsonItem.x;
                this.selectedLogo.y = this.navMatrix[this.x][this.y].jsonItem.y;
            }
        };
        return WorldMap;
    })(Phaser.State);
    Roboycod.WorldMap = WorldMap;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=WorldMap.js.map