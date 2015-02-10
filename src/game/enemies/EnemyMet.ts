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

        constructor(game : Phaser.Game)
        {
            super(game,128,128,'megaMet');

            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG,0);
            this.body.setSize(40,40,5,5);
            this.x = 300;
            this.y = this.game.height/2;
            this.health = this.LIVES;


        }


        //update()
        //{
        //
        //}
    }
}