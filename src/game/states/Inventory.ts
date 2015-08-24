/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="../cdvs/CdvMatrix.ts"/>
    ///<reference path="../states/Game.ts"/>

module Roboycod {

    class MatrixContent{
        public icon         : Phaser.Sprite;
        public compiled     : Phaser.Sprite;
        public selected     : Phaser.Sprite;

        constructor(){}
    }
    export class Inventory extends Phaser.State {

        /**
         * Variable necesaria para comunicarnos con el editor
         */
        private static _instance: Inventory;

        private background      : Phaser.Image;
        private nav             : MatrixContent[][];
        private cm              : CdvMatrix;
        private initScale       : Phaser.Point;
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private lastStage       : string;
        private numStage        : string;
        private isEmpty         : boolean;
        private jsonTiled       : any;
        private gameData        : any;

        //	Constants
        private CDV_L           : number[] = [4,5,6,7];
        private ROWS            : number = 4;
        private COLS            : number = 5;
        private TWEEN_SCALE     : number = 0.2;

        init(lastStage : string, numStage : string){
            this.lastStage = lastStage;
            this.numStage = numStage;
        }
        create() {

            // Cargamos los datos de juego

            this.gameData = GameManager.getInstance().getData(this.game);

            this.isEmpty = this.gameData.inventory.isEmpty;
            this.x = this.gameData.inventory.x;
            this.y = this.gameData.inventory.y;
            this.cm = new CdvMatrix(this.gameData.cdvMatrix.data);


            // Cargamos la parte grafica

            this.game.stage.backgroundColor = 0x272822;
            this.jsonTiled = this.game.cache.getJSON('jsonInventory', true);
            this.background = this.game.add.image(0,0,'inventoryBackground');

            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;

            this.background.width = this.game.width;
            this.background.height = this.game.height;

            //Cargamos la matriz de navegacion

            this.buildNavigationMatrix();

            if(!this.isEmpty){
                this.nav[this.x][this.y].icon.scale.x += this.TWEEN_SCALE;
                this.nav[this.x][this.y].icon.scale.y += this.TWEEN_SCALE;
            }


            // Definimos y mapeamos las teclas correspondientes

            KeyboardHandler.getInstance().setupInventory(this);

            Inventory._instance = this;

        }
        public navToLastState(){

            this.gameData.inventory.x = this.x;
            this.gameData.inventory.y = this.y;
            this.gameData.inventory.isEmpty = this.isEmpty;

            //TODO mirar cuando guardar
            GameManager.getInstance().save();

            this.game.state.start(this.lastStage, true, false, this.numStage);

        }
        private buildNavigationMatrix() : void{
            var item    : any;
            var jsonItem: any;
            var compiledFrame : number = 5;

            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for(var i = 0; i < this.ROWS;++i){
                this.nav[i] = [];
                for(var j = 0; j < this.COLS;++j){
                    this.nav[i][j] = new MatrixContent();
                    item = this.nav[i][j];
                    //En la layer CDV_L se encontraran los objetos del Tiled
                    jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[j];
                    jsonItem.x /= this.widthRatio;
                    jsonItem.y /= this.heightRatio;

                    //Si existe un cdvLogico pintamos su sprite
                    if(this.cm.data[i][j] !== undefined){
                        //TODO quitar codigo
                        this.cm.data[i][j].isCompiled = true;
                        compiledFrame = this.cm.data[i][j].isCompiled? 6 : 5;
                        item.compiled = this.game.add.sprite(
                            jsonItem.x,
                            jsonItem.y,
                            'inventoryTiles',
                            compiledFrame
                        );
                        item.icon = this.game.add.sprite(
                            jsonItem.x,
                            jsonItem.y,
                            'inventoryTiles',
                            i
                        );
                        //Escalamos
                        item.icon.width = item.icon.width / this.widthRatio;
                        item.icon.height = item.icon.height / this.heightRatio;
                        item.icon.anchor.set(0.5,0.5);

                        item.compiled.width = item.icon.width;
                        item.compiled.height = item.icon.height;
                        item.compiled.anchor.set(0.5,0.5);

                        //Guardamos la escala general para hacer los tweens
                        this.initScale = new Phaser.Point(item.icon.scale.x, item.icon.scale.y);
                        //Si fuese el primer elemento nos situariamos en el
                        if(this.isEmpty){
                            this.x = i;
                            this.y = j;
                            this.isEmpty = false;
                        }
                        //Pintamos la seleccion
                        if(this.cm.data[i][j].isSelected){
                            this.drawSelection(this.nav[i][j]);
                        }
                    }
                }
            }
        }

        /**
         * Funcion para resaltar el icono seleccionado
         * @param icono el logo seleccionado
         */
        private enlargeTween(item : MatrixContent) : void {
            var s = this.game.add.tween(item.icon.scale);
            s.to(
                {   x : this.initScale.x+this.TWEEN_SCALE,
                    y : this.initScale.y+this.TWEEN_SCALE
                },
                50, Phaser.Easing.Linear.None
            );
            s.start();
        }

        /**
         * Funcion para reducir el icono desseleccionado
         * @param icono el logo desseleccionado
         */
        private reduceTween(item : MatrixContent) : void {
            var s = this.game.add.tween(item.icon.scale);
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

            var found : boolean = false;

            var oldX = this.x;
            var oldY = this.y;

            while(!found && this.x >=0 && this.x < this.ROWS && this.y >=0 && this.y < this.COLS){
                this.x += x;
                this.y += y;
                if(this.nav[this.x]!=undefined)
                    if(this.nav[this.x][this.y]!=undefined)
                        if(this.nav[this.x][this.y].icon != undefined)
                            found = true;
            }
            if(!found){
                this.x = oldX;
                this.y = oldY;
            }
            if(!this.isEmpty) {
                this.reduceTween(this.nav[oldX][oldY]);
                this.enlargeTween(this.nav[this.x][this.y]);
                this.cm.data[this.x][this.y].showCode();
            }

        }

        /**
         * Trata de equipar el cdv seleccionado
         */
        public equipCdv() : void{

            var item = this.cm.data[this.x][this.y];
            var yFound : number = -1;
            //Miramos si hay algun otro cdv seleccionado
            if(item.isCompiled == true){
                for(var j = 0; yFound == -1 && j<this.COLS; j++){
                    if(this.cm.data[this.x][j] != undefined
                        && this.cm.data[this.x][j].isSelected)
                    {
                        yFound = j;
                    }
                }
                //Eliminamos la seleccion anterior
                if(yFound != -1){
                    console.log(this.nav[this.x][yFound]);
                    this.cm.data[this.x][yFound].isSelected = false;
                    this.nav[this.x][yFound].selected.kill();
                }

                item.isSelected = true;
                this.drawSelection(this.nav[this.x][this.y]);
            }
        }

        /**
         * Va al editor para escribir en el CDV, al volver guarda
         */
        public writeCdv() : void{
            this.input.keyboard.stop();
            var editor = ace.edit("editor");
            editor.focus();
            var n = editor.getSession().getValue().split("\n").length;
            editor.gotoLine(n); //Go to end of document
        }

        /**
         * Esta funcion guarda la edicion actual del editor en el cdv
         */
        public saveCdv() : void{
            console.log("GUARDO CDV");
            var editor = ace.edit("editor");
            editor.blur();
            GameManager.getInstance().save();
            this.input.keyboard.start();
            //TODO Bridge.Compile(Cdv id, Cdv code)
        }

        /**
         * Esta funcion da acceso a la instancia desde fuera
         */
        public static getInstance() : Inventory{
            return Inventory._instance;
        }
        private drawSelection(graphicItem : MatrixContent) : void{
            graphicItem.selected = this.game.add.sprite(
                graphicItem.icon.x,
                graphicItem.icon.y,
                'inventoryTiles',
                7
            );
            graphicItem.selected.width = graphicItem.compiled.width;
            graphicItem.selected.height = graphicItem.compiled.height;
            graphicItem.selected.anchor.set(0.5,0.5);
        }
    }
}