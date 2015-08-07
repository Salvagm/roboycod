/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>

module Roboycod {

    export class BaseCdv extends Phaser.Sprite {

        public code     : string;

        //TODO DEMOCODE
        public expectedOutput   : string = "SALTO";

        private runBtn = document.getElementById("runCode");
        //TODO END DEMOCODE

        constructor(game : Phaser.Game, x : number, y : number){
            super(game, x, y,'tsDynamics', 0);

            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width/2, this.body.height/2, 0, 0);
            this.anchor.setTo(0.4, 0.6);

            //TODO DEMOCODE
            this.body.drag.setTo(800, 0);
            this.animations.add('idle', [71, 71, 71, 72, 73, 74, 75, 76, 77, 71, 71, 71], 9, true);

            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE

            this.create();
        }

        create(){
            this.animations.play('idle');
        }

        public loadCode(){

            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        }
        public checkCode() : Boolean{

            //this.runBtn.click();
            ProcessCode.runit();

            var interpreterOutput = document.getElementById("output");
            var output : string = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if(output == "SALTO"){
                return true;
            }
            return false;

        }

        update(){
            //this.game.debug.body(this);
        }

    }
}