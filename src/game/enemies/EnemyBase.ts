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
            this.physicsEnabled = true;
            this.body.collideWorldBounds = true;

        }

    }


}