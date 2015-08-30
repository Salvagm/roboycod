/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="../cdvs/CdvMatrix.ts"/>
///<reference path="../states/Game.ts"/>
/// <reference path="../../lib/jquery/jquery.d.ts"/>

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

        //Graficos
        private background      : Phaser.Image;
        private avatar          : Phaser.Image[];
        private blackMask       : Phaser.Graphics;
        private initScale       : Phaser.Point;
        private widthRatio      : number;
        private heightRatio     : number;
        //Navegacion
        private nav             : MatrixContent[][];
        private cm              : CdvMatrix;
        private x               : number;
        private y               : number;
        private lastStage       : string;
        private numStage        : string;
        private isEmpty         : boolean;
        //Datos
        private jsonTiled       : any;
        private gameData        : any;
        //Informacion textual
        private titleText       : Phaser.BitmapText;
        private actionsText     : Phaser.BitmapText;
        private queryText       : Phaser.BitmapText;

        //	Constants
        private CDV_L           : number[] = [3,4,5,6,7];
        private ROWS            : number = 4;
        private COLS            : number = 5;
        private TWEEN_SCALE     : number = 0.2;

        init(lastStage : string, numStage : string){
            this.lastStage = lastStage;
            this.numStage = numStage;
        }
        create() {
            // Cargamos los datos de juego
            this.gameData = GameManager.getInstance().getData();

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

            this.loadText();

            //Cargamos la matriz de navegacion

            this.buildNavigationMatrix();

            if(!this.isEmpty){
                this.nav[this.x][this.y].icon.scale.x += this.TWEEN_SCALE;
                this.nav[this.x][this.y].icon.scale.y += this.TWEEN_SCALE;
                this.cm.data[this.x][this.y].showCode();
                this.switchText();
            }

            //Cargamos avatares y mascara
            this.loadAvatar();
            this.switchAvatar();
            this.initMask();

            // Definimos y mapeamos las teclas correspondientes

            KeyboardHandler.getInstance().setupInventory(this);

            Inventory._instance = this;

            //Cambiamos la vista lateral
            $('#buffers').hide();
            $('#inventoryUtils').show();

            GameManager.getInstance().fadeOut();
        }
        public navToLastState(){

            this.gameData.inventory.x = this.x;
            this.gameData.inventory.y = this.y;
            this.gameData.inventory.isEmpty = this.isEmpty;

            //TODO mirar cuando guardar
            GameManager.getInstance().save();

            //Cambiamos la lista lateral
            $('#buffers').show();
            $('#inventoryUtils').hide();

            this.game.state.start(this.lastStage, true, false, this.numStage);

        }
        private buildNavigationMatrix() : void{
            var jsonItem: any;

            //Normalizamos la posicion de los logos segun el rescalado,
            //creamos sprites, etc
            this.nav = [];
            for(var i = 0; i < this.ROWS;++i){
                this.nav[i] = [];
                for(var j = 0; j < this.COLS;++j){
                    this.nav[i][j] = new MatrixContent();
                    //En la layer CDV_L se encontraran los objetos del Tiled
                    jsonItem = this.jsonTiled.layers[this.CDV_L[i]].objects[j];
                    jsonItem.x /= this.widthRatio;
                    jsonItem.y /= this.heightRatio;

                    //Si existe un cdvLogico pintamos su sprite
                    if(this.cm.data[i][j] !== undefined){
                        this.drawCdv(i,j, jsonItem.x, jsonItem.y);
                    }
                }
            }
        }
        private drawCdv(i : number, j : number, x: number, y : number) : void{
            var item    : any = this.nav[i][j];
            var compiledFrame : number;

            compiledFrame = this.cm.data[i][j].isCompiled? 6 : 5;
            item.compiled = this.game.add.sprite(
                x, y,
                'inventoryTiles',
                compiledFrame
            );
            item.icon = this.game.add.sprite(
                x, y,
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

        /**
         * Funcion para resaltar el icono seleccionado
         * @param item el logo seleccionado
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
         * @param item el logo desseleccionado
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
            if(this.x != oldX){
                this.switchText();
                this.switchAvatar(oldX);
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
            if(!this.isEmpty){
                this.enableMask();
                this.input.keyboard.stop();

                //Nos movemos al editor, al final del codigo
                var editor = ace.edit("editor");
                var row = editor.session.getLength() - 1;
                var column = editor.session.getLine(row).length;
                editor.gotoLine(row + 1, column);
                editor.focus();
            }
        }

        /**
         * Esta funcion guarda la edicion actual del editor en el cdv
         */
        public saveCdv() : void{
            var editor = ace.edit("editor");
            editor.blur();
            if(!this.isEmpty) {

                var cdv = this.cm.data[this.x][this.y];
                cdv.code = editor.getValue();
                cdv.compile();
            }
            this.disableMask();
            this.input.keyboard.start();
        }

        /**
         * Actualiza graficamente un cdv en concreto
         * Si estuviese equipado y ya no compila se desequipa
         * @param x la posicion x del cdv complado
         * @param y la posicion y del cdv complado
         */
        public refreshCdv(x : number, y : number){
            var sprite = this.nav[x][y];
            var logic = this.cm.data[x][y];
            if(sprite !==undefined){
                this.drawCdv(x,y,sprite.compiled.x, sprite.compiled.y);
                if(this.x === x, this.y ==y){
                    this.enlargeTween(this.nav[x][y]);
                }
                //Si estaba equipado y ya no compila lo deseleccionamos
                if(!logic.isCompiled && logic.isSelected){
                    logic.isSelected = false;
                    sprite.selected.kill();
                }
            }
        }

        /**
         * Este metodo sirve para actualizar la parte grafica desde el Birdge
         * tras compilar, ya se que la compilacion se realiza de forma concurrente
         * @param id el id del cdv a actualizar
         */
        public refreshCdvById(id : number) : void{
            var found : boolean = false;
            var cdv   : CdvLogic;
            for(var i = 0; i < this.ROWS && !found; ++i){
                for(var j = 0; j < this.COLS; ++j){
                    cdv = this.cm.data[i][j];
                    if(cdv !== undefined && cdv.id == id) {
                        this.refreshCdv(i, j);
                        found = true;
                    }
                }
            }
            if(!found){
                console.log("No se ha encontrado el CDV buscando por ID");
            }

            GameManager.getInstance().save();
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
        private loadAvatar() : void{

            var item : any = this.jsonTiled.layers[this.CDV_L[4]].objects[3];
            var x  = item.x / this.widthRatio;
            var y  = item.y / this.heightRatio;

            this.avatar = [];

            this.avatar[0] = this.game.add.image(x, y,'iAvatarW');
            this.avatar[1] = this.game.add.image(x, y,'iAvatarC');
            this.avatar[2] = this.game.add.image(x, y,'iAvatarM');
            this.avatar[3] = this.game.add.image(x, y,'iAvatarD');

            for(var i = 0 ; i< 4; ++i){
                this.avatar[i].width  /= this.widthRatio;
                this.avatar[i].height /= this.heightRatio;
                this.avatar[i].kill();
            }
        }
        private switchAvatar(oldX? : number) : void {
            if(oldX !== undefined){
                this.avatar[oldX].kill();
            }
            this.avatar[this.x].revive();
        }

        /**
         * Carga el mensaje inicial de textos
         */
        private loadText(){
            var title       : any = this.jsonTiled.layers[this.CDV_L[4]].objects[0];
            var actions     : any = this.jsonTiled.layers[this.CDV_L[4]].objects[1];
            var querys      : any = this.jsonTiled.layers[this.CDV_L[4]].objects[2];
            var titleX      = title.x / this.widthRatio;
            var titleY      = title.y / this.heightRatio;
            var actionsX    = actions.x / this.widthRatio;
            var actionsY    = actions.y / this.heightRatio;
            var querysX     = querys.x / this.widthRatio;
            var querysY     = querys.y / this.heightRatio;

            this.titleText  = this.game.add.bitmapText(titleX, titleY, 'gemFont', "NO CDV", 32);
            this.actionsText= this.game.add.bitmapText(actionsX, actionsY, 'gemFont', "ACCIONES:", 20);
            this.queryText  = this.game.add.bitmapText(querysX, querysY, 'gemFont', "PREGUNTAS:", 20)
        }
        private switchText() : void{

            var sType   : string;
            var sActons : string[];
            var sQuerys : string[];
            switch (this.cm.data[this.x][this.y].type){
                case CdvLogic.TYPES[0] :
                    sType = 'ARMA';
                    sActons = CdvCommon.wActs;
                    sQuerys = CdvCommon.weaponQuerys;
                    break;
                case CdvLogic.TYPES[1] :
                    sType = 'CORE';
                    sActons = CdvCommon.cActs;
                    sQuerys = CdvCommon.coreQuerys;
                    break;
                case CdvLogic.TYPES[2] :
                    sType = 'MOVIL';
                    sActons = CdvCommon.mActs;
                    sQuerys = CdvCommon.motionQuerys;
                    break;
                case CdvLogic.TYPES[3] :
                    sType = 'DRON';
                    sActons = CdvCommon.dActs;
                    sQuerys = CdvCommon.dronQuerys;
                    break;
                default :
                    console.log("No existe el tipo de cdv al cambiar el texto del inventario");
            }
            this.titleText.text = 'CDV ' + sType;
            this.actionsText.text = 'ACCIONES: \n\n';
            for(var i = 0; i < sActons.length; ++i){
                this.actionsText.text += sActons[i] +'\n';
            }
            this.queryText.text = 'PREGUNTAS: \n\n';
            for(var i = 0; i < sQuerys.length; ++i){
                this.queryText.text += sQuerys[i] +'\n';
            }
        }
        private initMask() : void{
            this.blackMask = this.game.add.graphics(0, 0);
            this.blackMask.beginFill(0, 1);
            this.blackMask.drawRect(0, 0, this.game.width, this.game.height);
            this.blackMask.alpha = 0;
            this.blackMask.endFill();
        }
        private enableMask(){
            this.initMask();
            this.blackMask.alpha = 0.5;
        }
        private disableMask(){
            this.blackMask.alpha = 0;
        }
        /**
         * Esta funcion da acceso a la instancia desde fuera
         */
        public static getInstance() : Inventory{
            return Inventory._instance;
        }
    }
}