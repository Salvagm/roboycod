/**
 * Created by javi on 5/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    export class WorldMap extends Phaser.State {

        private background      : Phaser.Image;
        private selectedLogo    : Phaser.Sprite;
        private navMatrix       : any[][];
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private jsonTiles;
        private statesData;
        private kh              : KeyboardHandler;

        //	Constants
        private LOGO_L          : number = 6;

        create() {
            /**
             * Cargamos los datos de juego
             */
            this.statesData = this.game.cache.getJSON('jsonStatesData');
            /**
             * Cargamos los elementos del worldMap
             */
            // con true hacemos una copia del JSON para no modificarlo
            this.jsonTiles = this.game.cache.getJSON('jsonWorldMap', true);
            this.background = this.game.add.image(0,0,'worldMap');

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

            //Vemos si debemos cargar los datos o es la primera partida
            if(this.statesData.worldMap.firstLoad == "false"){
                this.x = this.statesData.worldMap.x;
                this.y = this.statesData.worldMap.y;
            }
            this.statesData.worldMap.firstLoad = "false";

            this.selectedLogo = this.game.add.sprite(
                this.navMatrix[this.x][this.y].x,
                this.navMatrix[this.x][this.y].y,
                'selectedLogo'
            );
            //Aplicamos la porporcion al area de seleccion
            this.selectedLogo.width = this.selectedLogo.width / this.widthRatio;
            this.selectedLogo.height= this.selectedLogo.height / this.heightRatio;

            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new KeyboardHandler(this.game);
            this.kh.setUpWorldMap(this);

        }

        public startStage() {

            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;

            var numStage = this.navMatrix[this.x][this.y].properties.stage;

            if(this.game.cache.checkJSONKey('jsonStage' + numStage)) {
                this.game.state.start(
                    'Stage', false, false, numStage
                );
            }
        }
        public navToInventory() {

            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;

            this.game.state.start('Inventory', true, false, this.key);
        }

        /**
         * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
         * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
         */
        private buildNavigationMatrix() : void{

            this.x = this.y = 0;
            this.navMatrix = [];
            this.navMatrix[0] = [];
            this.navMatrix[1] = [];

            //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
            this.navMatrix[0][0] = this.jsonTiles.layers[this.LOGO_L].objects[0];
            this.navMatrix[0][1] = this.jsonTiles.layers[this.LOGO_L].objects[1];
            this.navMatrix[0][2] = this.jsonTiles.layers[this.LOGO_L].objects[2];
            this.navMatrix[1][0] = this.jsonTiles.layers[this.LOGO_L].objects[3];
            this.navMatrix[1][1] = this.jsonTiles.layers[this.LOGO_L].objects[4];
            this.navMatrix[1][2] = this.jsonTiles.layers[this.LOGO_L].objects[5];


            //Normalizamos la posicion de los logos segun el rescalado
            for(var i : number = 0; i < 2;++i){
                for(var j : number = 0; j < 3;++j){
                    this.navMatrix[i][j].x /= this.widthRatio;
                    this.navMatrix[i][j].y /= this.heightRatio;
                }
            }

        }
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        public moveSelection(key : Phaser.Key, x : number , y : number ) : void{

            if(this.x + x >= 0 && this.x + x <=1){
                if(this.y + y >= 0 && this.y + y <=2){
                    this.x += x;
                    this.y += y;
                }
                this.selectedLogo.x = this.navMatrix[this.x][this.y].x;
                this.selectedLogo.y = this.navMatrix[this.x][this.y].y;
            }
        }
    }

}