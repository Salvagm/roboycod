/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="BaseEnemy.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    /**
     * Este enemigo puede ser eliminado disparandole o saltandole encima
     * Inflige danyo al golpear por los lados
     */
    var WalkingEnemy = (function (_super) {
        __extends(WalkingEnemy, _super);
        function WalkingEnemy(game, x, y) {
            _super.call(this, game, x, y);
            this.GRAVITY = 2000;
            this.DRAG = 3000;
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG, 0);
            this.x = x;
            this.y = y;
            this.health = 3;
            this.body.setSize(this.body.width - 10, this.body.height - 20, 0, 0);
            this.anchor.setTo(0.5, 1);
            this.animations.add('idle', [25, 25, 25, 25, 26, 25, 25, 25, 25,], 5, true);
            this.animations.add('die', [35], 3, false);
            this.create();
        }
        WalkingEnemy.prototype.create = function () {
            this.animations.play('idle');
            this.animations.getAnimation('die').onComplete.add(function () {
                this.kill();
            }, this);
        };
        WalkingEnemy.prototype.update = function () {
            //this.game.debug.body(this);
        };
        WalkingEnemy.prototype.collide = function (player, codevices) {
            if (this.body.touching.up) {
                player.body.velocity.y = -400;
                this.body.enable = false;
                this.animations.play('die');
                var cdv = new Roboycod.SpriteCdv(this.game, this.x, this.y, Roboycod.CdvLogic.TYPES[2]);
                cdv.body.velocity.x = 800;
                codevices.add(cdv);
            }
            else {
                player.knockBack(this);
            }
        };
        return WalkingEnemy;
    })(Roboycod.BaseEnemy);
    Roboycod.WalkingEnemy = WalkingEnemy;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=WalkingEnemy.js.map