/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="Player.ts"/>

module Roboycod
{
    export class BaseGun extends Phaser.Group {

        private lastGunShotAt       : number;
        private tempBullet          : Phaser.Sprite;

        private SHOT_DELAY          : number = 300;
        private BULLET_SPEED        : number = 600;
        private NUMBER_OF_BULLETS   : number = 3;

        constructor(game : Phaser.Game){
            super(game);

            this.createMultiple(this.NUMBER_OF_BULLETS, 'bullet', 0, false);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);

            this.lastGunShotAt = 0;

        }
        shoot(player : Player) : void {

            if (this.game.time.now - this.lastGunShotAt < this.SHOT_DELAY)
                return;
            this.lastGunShotAt = this.game.time.now;

            //If some bullet are out of view, it must be killed
            this.forEachAlive(function(bullet) {

                if (bullet.body.x > this.game.camera.x + this.game.width){
                    bullet.kill();
                }
            }, this);

            this.tempBullet = this.getFirstDead();

            // If there aren't any bullets available then don't shoot
            if (this.tempBullet === null || this.tempBullet === undefined)
                return;

            this.tempBullet.revive();
            this.tempBullet.checkWorldBounds = true;
            this.tempBullet.outOfBoundsKill = true;

            // Set the bullet position to the gun position.a

            if(player.body.velocity.y != 0) {
                this.tempBullet.reset(player.x + (35 * player.direction), player.y);
            }
            else{
                this.tempBullet.reset(player.x + (35 * player.direction), player.y);
            }

            // Shoot it
            this.tempBullet.scale.x = player.scale.x;
            this.tempBullet.body.velocity.x = player.direction * this.BULLET_SPEED;
            this.tempBullet.body.velocity.y = 0;

        }
    }
}