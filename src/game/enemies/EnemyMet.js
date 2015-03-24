/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="EnemyBase.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var EnemyMet = (function (_super) {
        __extends(EnemyMet, _super);
        function EnemyMet(game, x, y) {
            _super.call(this, game, x, y, 'tsEntities');
            this.LIVES = 3;
            this.GRAVITY = 2000;
            this.DRAG = 3000;
            this.body.bounce.y = 0;
            this.body.gravity.y = this.GRAVITY;
            this.body.drag.setTo(this.DRAG, 0);
            //this.body.setSize(40,40,0,0);
            this.anchor.setTo(0.5, 0.5);
            this.x = x;
            this.y = y;
            this.health = this.LIVES;
            this.animations.add('idle', [0, 3], 3, true);
            this.create();
        }
        EnemyMet.prototype.create = function () {
            this.animations.play('idle');
        };
        EnemyMet.prototype.update = function () {
            this.game.debug.body(this);
        };
        return EnemyMet;
    })(Roboycod.EnemyBase);
    Roboycod.EnemyMet = EnemyMet;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=EnemyMet.js.map