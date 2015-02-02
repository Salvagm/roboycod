/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
module roboycod{

    export class Player extends Phaser.Sprite {

        direction   : number = 1;
        animState   : string = 'idle';
        endShot     : boolean = true;

        //	Define movement constants
        MAX_SPEED   : number = 250;
        GRAVITY     : number = 1800;
        JUMP_SPEED  : number = -800;
        ACCELERATION: number = 100;
        DRAG        : number = 50;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'robot', 0);

            this.game.physics.enable(this);

            // Player physics properties
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;

            this.body.collideWorldBounds = true;
            this.body.setSize(55,60);
            this.x = 0;
            this.y = this.game.height/2;

            this.anchor.setTo(0.5, 0);

            this.animations.add('idle', [2, 2, 2, 2, 3, 2, 2, 2, 2], 4, true);
            this.animations.add('run', [7, 5, 6], 8, true);
            this.animations.add('jump', [8], 5, false);
            this.animations.add('shoot', [11], 3, false);
            this.animations.add('jumpShoot', [15], 3, false);
            this.animations.add('runShoot', [12, 13, 14], 8, false);

            this.animations.play('idle');

            game.add.existing(this);

        }

    }

}