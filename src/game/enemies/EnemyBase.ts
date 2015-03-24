/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/GunBase.ts"/>
module Roboycod{

    export class  EnemyBase extends Phaser.Sprite{

        constructor(game : Phaser.Game, x : number, y : number, enemyKey : string)
        {
            super(game, x, y,enemyKey,0);
            this.game.physics.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }


    }
}