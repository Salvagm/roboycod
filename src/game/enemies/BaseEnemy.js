var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/BaseGun.ts"/>
var Roboycod;
(function (Roboycod) {
    var BaseEnemy = (function (_super) {
        __extends(BaseEnemy, _super);
        function BaseEnemy(game, x, y) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            this.game.physics.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }
        /**
         * Comprueba la colision con el player, si muere puede anyadir CDVs al grupo en pantalla
         */
        BaseEnemy.prototype.collide = function (player, codevices) { };
        return BaseEnemy;
    })(Phaser.Sprite);
    Roboycod.BaseEnemy = BaseEnemy;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=BaseEnemy.js.map