var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
var Roboycod;
(function (Roboycod) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, sheetWidth, sheetHeight, kh) {
            _super.call(this, game, sheetWidth, sheetHeight, 'robot', 2);
            this.animState = 'idle';
            this.endShot = true;
            this.direction = 1;
            //	Define movement constants
            this.MAX_SPEED = 250;
            this.GRAVITY = 1800;
            this.JUMP_SPEED = -800;
            this.ACCELERATION = 100;
            this.DRAG = 4000;
            this.game.physics.enable(this);
            this.setPosition(0, this.game.height / 2);
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
            this.gun = new Roboycod.GunBase(this.game);
            this.animations.add('idle', [13, 14, 15, 14], 4, true);
            this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
            this.animations.add('jump', [10], 5, false);
            this.animations.add('shoot', [16, 14], 9, false);
            this.animations.add('jumpShoot', [10], 3, false);
            this.animations.add('getHurt', [11, 12], 8, false);
            this.create();
            game.add.existing(this);
            this.game.camera.follow(this);
        }
        Player.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Player.prototype.create = function () {
            this.animations.play('idle');
            //callback end shoot
            this.animations.getAnimation('shoot').onStart.add(function () {
                this.endShot = false;
            });
            this.animations.getAnimation('shoot').onComplete.add(function () {
                this.endShot = true;
            });
            this.animations.getAnimation('jumpShoot').onStart.add(function () {
                this.endShot = false;
            });
            this.animations.getAnimation('jumpShoot').onComplete.add(function () {
                this.endShot = true;
            });
        };
        Player.prototype.stopMove = function () {
            this.body.velocity.x = 0;
        };
        Player.prototype.moveTo = function (direction) {
            if (this.direction != direction) {
                this.scale.x *= -1;
                this.direction = direction;
            }
            if (-this.MAX_SPEED < this.body.velocity.x && this.body.velocity.x < this.MAX_SPEED)
                this.body.velocity.x += direction * this.ACCELERATION;
        };
        Player.prototype.moveLeft = function () {
            this.moveTo(-1);
        };
        Player.prototype.moveRight = function () {
            this.moveTo(1);
        };
        Player.prototype.jump = function () {
            if (this.body.onFloor())
                this.body.velocity.y = this.JUMP_SPEED;
        };
        Player.prototype.shoot = function () {
            this.gun.shoot(this);
        };
        Player.prototype.update = function () {
            //this.game.debug.bodyInfo(this,20,20);
            //Anim FSM
            if (this.endShot) {
                if (this.body.velocity.y != 0) {
                    this.animState = 'jump';
                    if (this.kh.arrowRight.isDown)
                        this.animState = 'jumpShoot';
                }
                else if (this.body.velocity.x != 0) {
                    this.animState = 'run';
                }
                else if (this.kh.arrowRight.isDown)
                    this.animState = 'shoot';
                else
                    this.animState = 'idle';
            }
            else {
                if (!this.body.onFloor())
                    this.animState = 'jumpShoot';
                else
                    this.animState = 'shoot';
            }
            this.animations.play(this.animState);
        };
        return Player;
    })(Phaser.Sprite);
    Roboycod.Player = Player;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Player.js.map