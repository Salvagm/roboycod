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
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.apply(this, arguments);
            //	Constants
            this.LOGO_L = 6;
        }
        WorldMap.prototype.create = function () {
            /**
             * Cargamos los elementos del worldMap
             */
            this.json = this.game.cache.getJSON('jsonWorldMap');
            this.tileMap = this.add.tilemap('tmWorldMap');
            this.background = this.game.add.image(0, 0, 'worldMap');
            //Guardamos la proporcion en la que se escalan los tiles
            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            this.background.fixedToCamera = true;
            /**
             * Creamos la matriz para navegar y poder elegir stage,
             * el area de seleccion y las teclas
             */
            this.x = this.y = 0;
            this.buildNavigationMatrix();
            this.selectedLogo = this.game.add.sprite(this.navMatrix[0][0].x, this.navMatrix[0][0].y, 'selectedLogo');
            //Aplicamos la porporcion al area de seleccion
            this.selectedLogo.width = this.selectedLogo.width / this.widthRatio;
            this.selectedLogo.height = this.selectedLogo.height / this.heightRatio;
            // Definimos las keys para poder movernos
            this.cursors = this.game.input.keyboard.createCursorKeys();
            //this.startStage();
        };
        WorldMap.prototype.update = function () {
            // Update input state
            this.game.input.update();
            if (this.cursors.down.justDown) {
                this.moveSelection(1, 0);
            }
            if (this.cursors.up.justDown) {
                this.moveSelection(-1, 0);
            }
            if (this.cursors.left.justDown) {
                this.moveSelection(0, -1);
            }
            if (this.cursors.right.justDown) {
                this.moveSelection(0, 1);
            }
        };
        WorldMap.prototype.startStage = function () {
            this.game.state.start('Stage', true, false, this.navMatrix[this.x][this.y]);
        };
        /**
         * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
         * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
         */
        WorldMap.prototype.buildNavigationMatrix = function () {
            this.navMatrix = [];
            this.navMatrix[0] = [];
            this.navMatrix[1] = [];
            //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
            this.navMatrix[0][0] = this.json.layers[this.LOGO_L].objects[0];
            this.navMatrix[0][1] = this.json.layers[this.LOGO_L].objects[1];
            this.navMatrix[0][2] = this.json.layers[this.LOGO_L].objects[2];
            this.navMatrix[1][0] = this.json.layers[this.LOGO_L].objects[3];
            this.navMatrix[1][1] = this.json.layers[this.LOGO_L].objects[4];
            this.navMatrix[1][2] = this.json.layers[this.LOGO_L].objects[5];
            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 3; ++j) {
                    this.navMatrix[i][j].x /= this.widthRatio;
                    this.navMatrix[i][j].y /= this.heightRatio;
                }
            }
        };
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        WorldMap.prototype.moveSelection = function (x, y) {
            if (this.x + x >= 0 && this.x + x <= 1) {
                if (this.y + y >= 0 && this.y + y <= 2) {
                    this.x += x;
                    this.y += y;
                }
                this.selectedLogo.x = this.navMatrix[this.x][this.y].x;
                this.selectedLogo.y = this.navMatrix[this.x][this.y].y;
            }
        };
        return WorldMap;
    })(Phaser.State);
    Roboycod.WorldMap = WorldMap;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=WorldMap.js.map