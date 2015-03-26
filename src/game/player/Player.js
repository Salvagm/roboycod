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
        function Player(game, x, y, kh) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            this.animState = 'idle';
            this.endShot = true;
            this.direction = 1;
            //	Constants
            this.MAX_SPEED = 250;
            this.GRAVITY = 1800;
            this.JUMP_SPEED = -800;
            this.ACCELERATION = 100;
            this.DRAG = 4000;
            this.game.physics.enable(this);
            // Player physics properties
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG, 0);
            this.body.collideWorldBounds = true;
            this.body.setSize(this.body.width - 30, this.body.height - 10, 0, 0);
            this.anchor.setTo(0.5, 0.5);
            this.kh = kh;
            this.gun = new Roboycod.GunBase(this.game);
            this.animations.add('idle', [0, 1, 2], 4, true);
            this.animations.add('run', [8, 9, 10, 11, 12, 13], 8, true);
            this.animations.add('jump', [3], 1, false);
            this.animations.add('fall', [5], 1, false);
            this.animations.add('shoot', [21], 9, false);
            this.animations.add('jumpShoot', [10], 3, false);
            this.animations.add('getHurt', [24], 8, false);
            this.animations.add('die', [17], 8, false);
            this.animations.add('off', [19, 20], 8, false);
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
            }, this);
            this.animations.getAnimation('shoot').onComplete.add(function () {
                this.endShot = true;
            }, this);
            this.animations.getAnimation('jumpShoot').onStart.add(function () {
                this.endShot = false;
            }, this);
            this.animations.getAnimation('jumpShoot').onComplete.add(function () {
                this.endShot = true;
            }, this);
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
        Player.prototype.knockBack = function (enemy) {
            var direction;
            direction = Phaser.Point.subtract(this.position, enemy.position);
            Phaser.Point.normalize(direction, direction);
            // Mover valores a player o enemigo
            this.body.velocity.x = this.body.velocity.y = 0;
            this.body.velocity.x = direction.x * Math.cos(0.523598776) * 1300;
            this.body.velocity.y = direction.y * Math.sin(0.523598776) * 1300;
        };
        Player.prototype.update = function () {
            //this.game.debug.body(this);
            //Anim FSM
            if (this.endShot) {
                if (this.body.velocity.y != 0) {
                    if (this.yLastPos > this.body.y)
                        this.animState = 'jump';
                    else if (this.yLastPos < this.body.y)
                        this.animState = 'fall';
                    if (this.kh.arrowRight.isDown)
                        this.animState = 'jumpShoot';
                    this.yLastPos = this.body.y;
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