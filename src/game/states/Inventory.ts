/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    class MatrixContent{
        public cdvSprite    : Phaser.Sprite;
        public selecSprite  : Phaser.Sprite;
        public cdv          : BaseCdv;

        constructor(){}
    }
    export class Inventory extends Phaser.State {

        private background      : Phaser.Image;
        private nav             : MatrixContent[][];
        private initScale       : Phaser.Point;
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private lastStage       : string;
        private numStage        : string;
        private jsonTiled       : any;
        private statesData      : any;

        private kh              : KeyboardHandler;

        //	Constants
        private CDV_L           : number[] = [4,5,6,7];
        private ROWS            : number = 4;
        private COLS            : number = 5;
        private TWEEN_SCALE     : number = 0.1;

        init(lastStage : string, numStage : string){
            this.lastStage = lastStage;
            this.numStage = numStage;
        }
        create() {
            /**
             * Cargamos los datos de juego
             */
            this.statesData = this.game.cache.getJSON('jsonStatesData');

            if(this.statesData.inventory.firstLoad == "false"){
                this.x = this.statesData.inventory.x;
                this.y = this.statesData.inventory.y;
            }
            else{
                this.x = this.y = 0;
                this.statesData.inventory.firstLoad = "false";
            }
            /**
             * Cargamos la parte grafica
             */
            this.game.stage.backgroundColor = 0x272822;
            this.jsonTiled = this.game.cache.getJSON('jsonInventory');
            this.background = this.game.add.image(0,0,'inventoryBackground');

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
            this.kh = new KeyboardHandler(this.game);
            this.kh.setupInventory(this);

        }
        public navToLastState(){
            this.statesData.inventory.x = this.x;
            this.statesData.inventory.y = this.y;
            //Guardar CDV
            //Mandar CDVs Equipados al HUD
            this.game.state.start(this.lastStage, true, false, this.numStage);

        }
        private buildNavigationMatrix() : void{
            var item : any;
            var numItem : number;

            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for(var i = 0; i < this.ROWS;++i){
                numItem = 0;
                this.nav[i] = [];
                for(var j = 0; j < this.COLS;++j){
                    this.nav[i][j] = new MatrixContent();
                    item = this.nav[i][j];
                    console.log("cargo la layer " + this.CDV_L[i]);
                    console.log(this.jsonTiled.layers[this.CDV_L[i]].name);
                    //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
                    item.jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[numItem];
                    item.jsonItem.x /= this.widthRatio;
                    item.jsonItem.y /= this.heightRatio;

                    item.sprite = this.game.add.sprite(
                        item.jsonItem.x,
                        item.jsonItem.y,
                        'inventoryTiles',
                        0
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
    }
}