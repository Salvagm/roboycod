/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../cdvs/CdvSprite.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="BaseGun.ts"/>

module Roboycod{

    export class Player extends Phaser.Sprite {

        //TODO mejorar, la usamos para no perder el contexto
        public static This : Player;

        private animState   : string = 'idle';
        private endShot     : boolean = true;
        private yLastPos       : number;

        public gun         : BaseGun;
        public direction   : number = 1;

        //	Constants
        private MAX_SPEED   : number = 250;
        private GRAVITY     : number = 1800;
        private JUMP_SPEED  : number = -800;
        private ACCELERATION: number = 100;
        private DRAG        : number = 4000;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'tsDynamics', 0);

            this.game.physics.enable(this);

            // Player physics properties
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG, 0);
            this.body.collideWorldBounds = true;

            this.body.setSize(this.body.width - 30, this.body.height - 10, 0, 0);
            this.anchor.setTo(0.5, 0.5);

            this.gun = new BaseGun(this.game);


            this.animations.add('idle', [0, 1, 2], 4, true);
            this.animations.add('run', [8, 9, 10, 11, 12, 13], 8, true);
            this.animations.add('jump', [3], 1, false);
            this.animations.add('fall', [5], 1, false);
            this.animations.add('shoot', [21], 9, false);
            this.animations.add('jumpShoot', [10], 3, false);
            this.animations.add('getHurt', [24], 8, false);
            this.animations.add('die', [17], 8, false);
            this.animations.add('off', [19,20], 8, false);

            this.create();

            game.add.existing(this);
            this.game.camera.follow(this);
        }

        create() {
            /*
             * Asignamos la referencia del player a los CDVs
             */
            CdvLogic.setPlayer(this);

            this.animations.play('idle');

            //callback end shoot
            this.animations.getAnimation('shoot').onStart.add(function(){
                this.endShot = false;
            }, this);
            this.animations.getAnimation('shoot').onComplete.add(function(){
                this.endShot = true;
            }, this);
            this.animations.getAnimation('jumpShoot').onStart.add(function(){
                this.endShot = false;
            }, this);
            this.animations.getAnimation('jumpShoot').onComplete.add(function(){
                this.endShot = true;
            }, this);

            Player.This = this;
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
            console.log(this);
            console.log("Llaman a saltar");
            if(Player.This.body.onFloor())
                Player.This.body.velocity.y = Player.This.JUMP_SPEED;
        }
        shoot() : void {

            Player.This.gun.shoot(Player.This);
        }

        public knockBack(enemy : Phaser.Sprite) : void
        {

            var direction : Phaser.Point;
            direction = Phaser.Point.subtract(this.position,enemy.position);

            Phaser.Point.normalize(direction,direction);
            // Mover valores a player o enemigo
            this.body.velocity.x = this.body.velocity.y = 0;
            this.body.velocity.x = direction.x * Math.cos(0.523598776) * 1300;
            this.body.velocity.y = direction.y * Math.sin(0.523598776) * 1300;
        }
        public setPosition(x : number, y : number) : void{
            this.x = x;
            this.y = y;
        }
        update() {

            //this.game.debug.body(this);

            //Anim FSM
            if(this.endShot){
                if(this.body.velocity.y != 0){
                    if(this.yLastPos > this.body.y)
                        this.animState = 'jump';
                    else if(this.yLastPos < this.body.y)
                        this.animState = 'fall';

                    //if(this.kh.arrowRight.isDown)
                    //    this.animState = 'jumpShoot';

                    this.yLastPos = this.body.y;
                }
                else if(this.body.velocity.x != 0){
                    this.animState = 'run';
                }
                //else if(this.kh.arrowRight.isDown)
                //    this.animState = 'shoot';
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