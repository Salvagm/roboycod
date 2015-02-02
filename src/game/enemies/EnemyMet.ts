/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="EnemyBase.ts"/>
module roboycod
{
    export class EnemyMet extends EnemyBase
    {
        LIVES   : number = 5;
        GRAVITY : number = 1800;

        constructor(game : Phaser.Game)
        {
            super(game,128,128,'Met');
            this.body.health = this.LIVES;
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.setSize(40,40,5,5);
        }
    }
}