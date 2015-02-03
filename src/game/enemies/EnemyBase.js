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
///<reference path="../player/GunBase.ts"/>
var roboycod;
(function (roboycod) {
    var EnemyBase = (function (_super) {
        __extends(EnemyBase, _super);
        function EnemyBase(game, sheetWidth, sheetheight, enemyKey) {
            _super.call(this, game, sheetWidth, sheetheight, enemyKey, 0);
            this.game.physics.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }
        EnemyBase.prototype.receiveDamange = function (enemy, shoot) {
            enemy.damage(shoot.health);
            shoot.kill();
        };
        return EnemyBase;
    })(Phaser.Sprite);
    roboycod.EnemyBase = EnemyBase;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=EnemyBase.js.map