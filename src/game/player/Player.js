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
var roboycod;
(function (roboycod) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, sheetWidth, sheetHeight) {
            _super.call(this, game, sheetWidth, sheetHeight, 'robot', 2);
            this.direction = 1;
            this.animState = 'idle';
            this.endShot = true;
            //	Define movement constants
            this.MAX_SPEED = 250;
            this.GRAVITY = 1800;
            this.JUMP_SPEED = -800;
            this.ACCELERATION = 100;
            this.DRAG = 50;
            this.game.physics.enable(this);
            // Player physics properties
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.collideWorldBounds = true;
            this.body.setSize(55, 60);
            this.x = 0;
            this.y = this.game.height / 2;
            this.anchor.setTo(0.5, 0);
            this.animations.add('idle', [2, 2, 2, 2, 3, 2, 2, 2, 2], 4, true);
            this.animations.add('run', [7, 5, 6], 8, true);
            this.animations.add('jump', [8], 5, false);
            this.animations.add('shoot', [11], 3, false);
            this.animations.add('jumpShoot', [15], 3, false);
            this.animations.add('runShoot', [12, 13, 14], 8, false);
            this.create();
            game.add.existing(this);
        }
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
            this.animations.getAnimation('runShoot').onStart.add(function () {
                this.endShot = false;
            });
            this.animations.getAnimation('runShoot').onComplete.add(function () {
                this.endShot = true;
            });
        };
        Player.prototype.stopMove = function () {
            this.body.velocity.x = 0;
        };
        Player.prototype.moveTo = function (direction) {
            if (this.direction != direction) {
                this.anchor.setTo(.5, .0);
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
            //gun.shoot();
        };
        return Player;
    })(Phaser.Sprite);
    roboycod.Player = Player;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=Player.js.map