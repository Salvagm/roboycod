/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var BaseGun = (function (_super) {
        __extends(BaseGun, _super);
        function BaseGun(game) {
            _super.call(this, game);
            this.SHOT_DELAY = 300;
            this.BULLET_SPEED = 600;
            this.NUMBER_OF_BULLETS = 3;
            this.createMultiple(this.NUMBER_OF_BULLETS, 'bullet', 0, false);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.lastGunShotAt = 0;
        }
        BaseGun.prototype.shoot = function (player) {
            if (this.game.time.now - this.lastGunShotAt < this.SHOT_DELAY)
                return;
            this.lastGunShotAt = this.game.time.now;
            //If some bullet are out of view, it must be killed
            this.forEachAlive(function (bullet) {
                if (bullet.body.x > this.game.camera.x + this.game.width) {
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
            if (player.body.velocity.y != 0) {
                this.tempBullet.reset(player.x + (35 * player.direction), player.y);
            }
            else {
                this.tempBullet.reset(player.x + (35 * player.direction), player.y);
            }
            // Shoot it
            this.tempBullet.scale.x = player.scale.x;
            this.tempBullet.body.velocity.x = player.direction * this.BULLET_SPEED;
            this.tempBullet.body.velocity.y = 0;
        };
        return BaseGun;
    })(Phaser.Group);
    Roboycod.BaseGun = BaseGun;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=BaseGun.js.map