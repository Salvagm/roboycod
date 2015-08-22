/**
 * Created by javi on 5/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    class MatrixContent{
        public sprite       : Phaser.Sprite;
        public jsonItem     : any;

        constructor(){}
    }

    export class WorldMap extends Phaser.State {

        private background      : Phaser.Image;
        private nav             : MatrixContent[][];
        private tweenScale      : any;
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

            if(this.statesData.worldMap.firstLoad == "false"){
                this.x = this.statesData.worldMap.x;
                this.y = this.statesData.worldMap.y;
            }
            else{
                this.x = this.y = 0;
                this.statesData.worldMap.firstLoad = "false";
            }
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

            this.enlargeTween(this.nav[this.x][this.y]);
            this.nav[this.x][this.y].sprite.loadTexture(
                'worldTiles',
                parseInt(this.nav[this.x][this.y].jsonItem.properties.stage) + 6
            );

            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new KeyboardHandler(this.game);
            this.kh.setUpWorldMap(this);

        }


        /**
         * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
         * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
         */
        private buildNavigationMatrix() : void{

            this.nav = [];
            this.nav[0] = [];
            this.nav[1] = [];
            for(var i : number = 0; i < 2;++i){
                for(var j : number = 0; j < 3;++j){
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


            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites y tweens

            for(var i : number = 0; i < 2;++i){
                for(var j : number = 0; j < 3;++j){
                    this.nav[i][j].jsonItem.x /= this.widthRatio;
                    this.nav[i][j].jsonItem.y /= this.heightRatio;

                    this.nav[i][j].sprite = this.game.add.sprite(
                        this.nav[i][j].jsonItem.x,
                        this.nav[i][j].jsonItem.y,
                        'worldTiles',
                        parseInt(this.nav[i][j].jsonItem.properties.stage)
                    );
                    //Escalamos
                    this.nav[i][j].sprite.width = this.nav[i][j].sprite.width / this.widthRatio;
                    this.nav[i][j].sprite.height = this.nav[i][j].sprite.height / this.heightRatio;
                    this.nav[i][j].sprite.anchor.set(0.5,0.5);

                }
            }
            //Guardamos la escala general para hacer los tweens
            this.tweenScale = new Phaser.Point(this.nav[0][0].sprite.scale.x, this.nav[0][0].sprite.scale.y);


        }

        /**
         * Funcion para resaltar el logo seleccionado
         * @param logo el logo seleccionado
         */
        private enlargeTween(item : MatrixContent) {


            var s = this.game.add.tween(item.sprite.scale);
            s.to(
                {x : this.tweenScale.x+0.1, y : this.tweenScale.y+0.1},
                50,
                Phaser.Easing.Linear.None
            );
            s.start();
        }

        /**
         * Funcion para reducir el logo desseleccionado
         * @param logo el logo desseleccionado
         */
        private reduceTween(item : MatrixContent) {
            var s = this.game.add.tween(item.sprite.scale);
            s.to(
                {x : this.tweenScale.x, y : this.tweenScale.y},
                50,
                Phaser.Easing.Linear.None
            );
            s.start();
        }
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        public moveSelection(key : Phaser.Key, x : number , y : number ) : void{

            if(this.x + x >= 0 && this.x + x <=1){
                if(this.y + y >= 0 && this.y + y <=2){
                    //Cambiamos por el sprite sin seleccion
                    this.nav[this.x][this.y].sprite.loadTexture(
                        'worldTiles',
                        parseInt(this.nav[this.x][this.y].jsonItem.properties.stage)
                    );

                    this.reduceTween(this.nav[this.x][this.y]);

                    this.x += x;
                    this.y += y;

                    this.enlargeTween(this.nav[this.x][this.y]);

                    //Cambiamos por el sprite con seleccion
                    this.nav[this.x][this.y].sprite.loadTexture(
                        'worldTiles',
                        parseInt(this.nav[this.x][this.y].jsonItem.properties.stage) + 6
                    );
                }
            }
        }
        public startStage() {

            this.statesData.worldMap.x = this.x;
            this.statesData.worldMap.y = this.y;

            var numStage = this.nav[this.x][this.y].jsonItem.properties.stage;

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
    }
}