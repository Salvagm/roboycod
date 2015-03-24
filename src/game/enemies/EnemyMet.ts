/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="EnemyBase.ts"/>

module Roboycod {

    export class EnemyMet extends EnemyBase
    {
        private LIVES   : number = 3;
        private GRAVITY : number = 2000;
        private DRAG    : number = 3000;

        constructor(game : Phaser.Game, x : number, y : number)
        {
            super(game, x, y,'tsDynamics');

            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG,0);
            //this.body.setSize(40,40,0,0);

            this.anchor.setTo(0.5,0.5);
            this.x = x;
            this.y = y;
            this.health = this.LIVES;

            this.animations.add('idle', [0, 3], 3, true);

            this.create();

        }
        create(){
            this.animations.play('idle');
        }

        update()
        {

            this.game.debug.body(this);
        }
    }
}