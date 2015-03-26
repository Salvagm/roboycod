/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="EnemyBase.ts"/>

module Roboycod {

    /**
     * Este enemigo puede ser eliminado disparandole o saltandole encima
     * Inflige danyo al golpear por los lados
     */
    export class Enemy01 extends EnemyBase
    {
        private isAlive  : boolean = true;

        private GRAVITY : number = 2000;
        private DRAG    : number = 3000;

        constructor(game : Phaser.Game, x : number, y : number)
        {
            super(game, x, y);

            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG,0);

            this.x = x;
            this.y = y;
            this.health = 3;

            this.body.setSize(this.body.width - 10, this.body.height - 20, 0, 0);
            this.anchor.setTo(0.5,1);

            this.animations.add('idle', [25, 25, 25, 25, 26, 25, 25, 25, 25,], 5, true);
            this.animations.add('die', [35], 3, false);

            this.create();

        }
        create(){
            this.animations.play('idle');

            this.animations.getAnimation('die').onComplete.add(function(){
                this.kill();
            }, this);
        }

        update(){

            //this.game.debug.body(this);
        }

        public collide(player : Player, enemy : EnemyBase){

            if (enemy.body.touching.up){
                player.body.velocity.y = -400;
                this.body.enable = false;
                this.animations.play('die');
            }
            else
            {
                player.knockBack(this);
            }
        }
    }
}