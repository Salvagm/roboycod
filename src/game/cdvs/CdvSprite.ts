/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>

module Roboycod {

    export class SpriteCdv extends Phaser.Sprite {

        public cdvType          : string;

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
            //TODO END DEMOCODE

            this.create();
        }

        create(){
            this.animations.play('idle');
        }

    }
}