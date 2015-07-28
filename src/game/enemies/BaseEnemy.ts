/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/BaseGun.ts"/>
module Roboycod{

    export class  BaseEnemy extends Phaser.Sprite{

        constructor(game : Phaser.Game, x : number, y : number)
        {
            super(game, x, y,'tsDynamics',0);
            this.game.physics.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }

        /**
         * Comprueba la colision con el player, si muere puede anyadir CDVs al grupo en pantalla
         */
        public collide(player : Player, codevices : Phaser.Group){}

    }
}