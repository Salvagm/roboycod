/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    export class CdvBase extends Phaser.Sprite {

        public code     : string;

        constructor(game : Phaser.Game, x : number, y : number){
            super(game, x, y,'tsDynamics', 0);

            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width/2, this.body.height/2, 0, 0);
            this.anchor.setTo(0.4, 0.6);

            //TODO EJEMPLO PROTOTIPO
            this.body.drag.setTo(800, 0);
            this.animations.add('idle', [71, 71, 71, 72, 73, 74, 75, 76, 77, 71, 71, 71], 9, true);
            this.code = "def jump(keyJum):\n    if(keyJum):\n        print(\"SALTO\")\n";
            //TODO editor.setValue(JSON.parse(code)) de code

            this.create();
        }

        create(){
            this.animations.play('idle');
        }
        update(){
            //this.game.debug.body(this);
        }

    }
}