/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
module roboycod{

    export class  EnemyBase extends Phaser.Sprite{

        constructor(game : Phaser.Game, sheetWidth : number, sheetheight : number, enemyKey : string)
        {
            super(game,sheetWidth,sheetheight,enemyKey,0);
            this.game.physics.enable(this);

            this.body.bounce.y = 0;
            this.body.gravity.y= 1800;

            this.body.collideWorldBounds = true;
            this.x = 300;
            this.y = this.game.height/2;

            game.add.existing(this);
        }




    }
}