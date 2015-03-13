/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
module Roboycod{

    export class Player extends Phaser.Sprite {

        private animState   : string = 'idle';
        private endShot     : boolean = true;
        private kh          : KeyboardHandler;
        gun         : GunBase;
        direction   : number = 1;

        //	Define movement constants
        private MAX_SPEED   : number = 250;
        private GRAVITY     : number = 1800;
        private JUMP_SPEED  : number = -800;
        private ACCELERATION: number = 100;
        private DRAG        : number = 4000;

        constructor(game: Phaser.Game, sheetWidth: number, sheetHeight: number, kh : KeyboardHandler) {

            super(game, sheetWidth, sheetHeight, 'robot', 2);

            this.game.physics.enable(this);
            this.setPosition(0, this.game.height/2);

            // Player physics properties
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG, 0);
            this.body.collideWorldBounds = true;
            this.body.setSize(50, 80, 0, 20);
            this.anchor.setTo(0.5, 0);


            //TODO Salva skizing
            //this.body.center.setTo(50/2, 80/2);

            this.kh = kh;
            this.gun = new GunBase(this.game);


            this.animations.add('idle', [13, 14, 15, 14], 4, true);
            this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9], 8, true);
            this.animations.add('jump', [10], 5, false);
            this.animations.add('shoot', [16, 14], 9, false);
            this.animations.add('jumpShoot', [10], 3, false);
            this.animations.add('getHurt', [11, 12], 8, false);

            this.create();

            game.add.existing(this);
            this.game.camera.follow(this);
        }

        public setPosition(x : number, y : number) : void{
            this.x = x;
            this.y = y;
        }

        create() {

            this.animations.play('idle');

            //callback end shoot
            this.animations.getAnimation('shoot').onStart.add(function(){
                this.endShot = false;
            });
            this.animations.getAnimation('shoot').onComplete.add(function(){
                this.endShot = true;
            });
            this.animations.getAnimation('jumpShoot').onStart.add(function(){
                this.endShot = false;
            });
            this.animations.getAnimation('jumpShoot').onComplete.add(function(){
                this.endShot = true;
            });

        }

        stopMove() : void {
            this.body.velocity.x = 0;
        }
        moveTo(direction : number) : void{
            if(this.direction!=direction){
                this.scale.x *= -1;
                this.direction = direction;
            }
            if(-this.MAX_SPEED < this.body.velocity.x && this.body.velocity.x < this.MAX_SPEED)
                this.body.velocity.x += direction * this.ACCELERATION;
        }
        moveLeft() : void {
            this.moveTo(-1);
        }
        moveRight() : void {
            this.moveTo(1);
        }
        jump() : void {
            if(this.body.onFloor())
                this.body.velocity.y = this.JUMP_SPEED;
        }
        shoot() : void {
            this.gun.shoot(this);
        }

        update() {

            //this.game.debug.bodyInfo(this,20,20);

            //Anim FSM
            if(this.endShot){
                if(this.body.velocity.y != 0){
                    this.animState = 'jump';
                    if(this.kh.arrowRight.isDown)
                        this.animState = 'jumpShoot';
                }
                else if(this.body.velocity.x != 0){
                    this.animState = 'run';
                }
                else if(this.kh.arrowRight.isDown)
                    this.animState = 'shoot';
                else
                    this.animState = 'idle';
            }
            else{
                if(!this.body.onFloor())
                    this.animState = 'jumpShoot';
                else
                    this.animState = 'shoot';
            }

            this.animations.play(this.animState);
        }

    }

}