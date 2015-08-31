/**
 * Created by javi on 5/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../utils/GameManager.ts"/>
///<reference path="../../lib/cdvCompiler/src/IOSystem/WeaponBuffer.ts"/>
///<reference path="../../lib/cdvCompiler/src/IOSystem/CoreBuffer.ts"/>
///<reference path="../../lib/cdvCompiler/src/IOSystem/DronBuffer.ts"/>



module Roboycod {

    class MatrixContentW{
        public sprite       : Phaser.Sprite;
        public jsonItem     : any;

        constructor(){}
    }

    export class WorldMap extends Phaser.State {

        private background      : Phaser.Image;
        private nav             : MatrixContentW[][];
        private initScale       : Phaser.Point;
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private jsonTiled       : any;
        private gameData        : any;

        //	Constants
        private ROWS            : number = 2;
        private COLS            : number = 3
        private LOGO_L          : number = 6;
        private TWEEN_SCALE     : number = 0.1;

        create() {
            /**
             * Cargamos los datos de juego
             */
            this.gameData = GameManager.getInstance().getData();

            this.x = parseInt(this.gameData.worldMap.x);
            this.y = parseInt(this.gameData.worldMap.y);



            /**
             * Cargamos los elementos del worldMap
             */
            // con true hacemos una copia del JSON para no modificarlo
            this.jsonTiled = this.game.cache.getJSON('jsonWorldMap', true);
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

            this.nav[this.x][this.y].sprite.scale.x += this.TWEEN_SCALE;
            this.nav[this.x][this.y].sprite.scale.y += this.TWEEN_SCALE;
            this.nav[this.x][this.y].sprite.loadTexture(
                'worldTiles',
                parseInt(this.nav[this.x][this.y].jsonItem.properties.stage) + 6
            );

            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            KeyboardHandler.getInstance().setupWorldMap(this);
            GameManager.getInstance().fadeOut();
            IOSystem.MotionBuffer.getInstance().resetInputs();
            IOSystem.WeaponBuffer.getInstance().resetInputs();
            IOSystem.CoreBuffer.getInstance().resetInputs();
            IOSystem.DronBuffer.getInstance().resetInputs();
        }


        /**
         * La matriz de navegacion indicara a que posiciones y niveles nos podemos mover
         * almacenando la posicion a la que se mueve el cuadro de seleccion y el stage asociado
         */
        private buildNavigationMatrix() : void{
            var item : any;
            var numItem : number  = 0;

            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for(var i = 0; i < this.ROWS;++i){
                this.nav[i] = [];
                for(var j = 0; j < this.COLS;++j){
                    this.nav[i][j] = new MatrixContentW();
                    item = this.nav[i][j];
                    //En la layer LOGO_L se encontraran los objetos del Tiled
                    item.jsonItem = this.jsonTiled.layers[this.LOGO_L].objects[numItem];
                    item.jsonItem.x /= this.widthRatio;
                    item.jsonItem.y /= this.heightRatio;

                    item.sprite = this.game.add.sprite(
                        item.jsonItem.x,
                        item.jsonItem.y,
                        'worldTiles',
                        parseInt(item.jsonItem.properties.stage)
                    );
                    //Escalamos
                    item.sprite.width = item.sprite.width / this.widthRatio;
                    item.sprite.height = item.sprite.height / this.heightRatio;
                    item.sprite.anchor.set(0.5,0.5);
                    ++numItem;
                }
            }
            //Guardamos la escala general para hacer los tweens
            this.initScale = new Phaser.Point(item.sprite.scale.x, item.sprite.scale.y);
        }

        /**
         * Funcion para resaltar el logo seleccionado
         * @param logo el logo seleccionado
         */
        private enlargeTween(item : MatrixContentW) : void {
            var s = this.game.add.tween(item.sprite.scale);
            s.to(
                {   x : this.initScale.x+this.TWEEN_SCALE,
                    y : this.initScale.y+this.TWEEN_SCALE
                },
                50, Phaser.Easing.Linear.None
            );
            s.start();
        }

        /**
         * Funcion para reducir el logo desseleccionado
         * @param logo el logo desseleccionado
         */
        private reduceTween(item : MatrixContentW) : void {
            var s = this.game.add.tween(item.sprite.scale);
            s.to(
                {   x : this.initScale.x,
                    y : this.initScale.y
                },
                50, Phaser.Easing.Linear.None
            );
            s.start();
        }
        /**
         * Comprueba si puede moverse en la matriz dentro de los limites y
         * si puede lo hace
         */
        public moveSelection(key : Phaser.Key, x : number , y : number ) : void {

            if(this.x + x >= 0 && this.x + x <  this.ROWS){
                if(this.y + y >= 0 && this.y + y < this.COLS){
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

            this.gameData.worldMap.x = this.x;
            this.gameData.worldMap.y = this.y;

            var numStage = this.nav[this.x][this.y].jsonItem.properties.stage;

            if(this.game.cache.checkJSONKey('jsonStage' + numStage)) {
                this.game.state.start(
                    'Stage', false, false, numStage
                );
            }
        }
        public navToInventory() {

            this.gameData.worldMap.x = this.x;
            this.gameData.worldMap.y = this.y;

            this.game.state.start('Inventory', true, false, this.key);
        }
    }
}