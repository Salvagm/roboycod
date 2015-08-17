/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>


module Roboycod {

    export class SpriteCdv extends Phaser.Sprite {

        private timer       : number;

        public logicType    : string;

        // Constants
        private WAIT_TIME   : number = 2000;
        private INIT_FRAME  : number = 71;
        private FRAMES      : number = 7;

        constructor(game : Phaser.Game, x : number, y : number, logicType : string){

            super(game, x, y,'tsDynamics', 0);
            this.logicType = logicType;

            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width/2, this.body.height/2, 0, 0);
            this.anchor.setTo(0.4, 0.6);

            this.body.drag.setTo(800, 0);

            // Definimos las animaciones de cada CDV
            var frameList : number [] = [];
            for(var i : number = 0; i < CdvLogic.TYPES.length ; ++i){
                for(var j = this.INIT_FRAME; j < this.INIT_FRAME + this.FRAMES ; ++j){
                    frameList.push(j)
                }
                this.animations.add(CdvLogic.TYPES[i], frameList, 9, false);
                this.INIT_FRAME+=this.FRAMES;
                frameList = [];
            }

            this.create();
        }

        create(){
            this.timer = this.game.time.time;
            this.animations.play(CdvLogic.TYPES[0]);
        }
        update(){
            //Controlamos el delay de la animacion
            if(this.game.time.time > this.timer + this.WAIT_TIME){
                this.animations.play(CdvLogic.TYPES[0]);
                this.timer = this.game.time.time;
            }
        }


    }
}