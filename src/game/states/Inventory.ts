/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>

module Roboycod {

    class MatrixContent{
        public cdvSprite    : Phaser.Sprite;
        public selecSprite  : Phaser.Sprite;
        //TODO Pasar a matriz de CDV
        public cdv          : CdvLogic;

        constructor(){}
    }
    export class Inventory extends Phaser.State {

        private background      : Phaser.Image;
        private nav             : MatrixContent[][];
        private cdvMatrix       : CdvLogic[][];
        private initScale       : Phaser.Point;
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private lastStage       : string;
        private numStage        : string;
        private jsonTiled       : any;
        private gameData        : any;

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
            this.gameData = this.game.cache.getJSON('gameData');

            if(this.gameData.inventory.firstLoad == "false"){
                this.x = this.gameData.inventory.x;
                this.y = this.gameData.inventory.y;
            }
            else{
                this.x = this.y = 0;
                this.gameData.inventory.firstLoad = "false";
            }
            /**
             * Cargamos la parte grafica
             */
            this.game.stage.backgroundColor = 0x272822;
            this.jsonTiled = this.game.cache.getJSON('jsonInventory', true);
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

            //TODO TEST
            var item    : any;
            var numItem : number = 0;

            this.cdvMatrix = [];
            for(var i = 0; i < this.ROWS;++i){
                this.cdvMatrix[i] = [];
                for(var j = 0; j < this.COLS;++j) {
                    //TODO separar de matriz logica
                    this.cdvMatrix[i][j] = new CdvLogic(CdvLogic.TYPES[i]);
                    item = this.cdvMatrix[i][j];
                    item.cdvType = CdvLogic.TYPES[i];
                    item.id = numItem;
                    item.isCompiled = true;
                    item.code = "print(\"SALTO\")";
                    ++numItem;
                }
            }
            var jsonData  = JSON.stringify(this.cdvMatrix);
            console.log(jsonData);

        }
        public navToLastState(){
            this.gameData.inventory.x = this.x;
            this.gameData.inventory.y = this.y;
            //Guardar CDV
            //Mandar CDVs Equipados al HUD
            this.game.state.start(this.lastStage, true, false, this.numStage);

        }
        private buildNavigationMatrix() : void{
            var item    : any;
            var numItem : number;
            var jsonItem: any;

            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for(var i = 0; i < this.ROWS;++i){
                numItem = 0;
                this.nav[i] = [];
                for(var j = 0; j < this.COLS;++j){
                    this.nav[i][j] = new MatrixContent();
                    item = this.nav[i][j];
                    //En la layer LOGO_L se encontraran los objetos statelogo del Tiled
                    jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[numItem];
                    jsonItem.x /= this.widthRatio;
                    jsonItem.y /= this.heightRatio;

                    item.sprite = this.game.add.sprite(
                        jsonItem.x,
                        jsonItem.y,
                        'inventoryTiles',
                        i
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