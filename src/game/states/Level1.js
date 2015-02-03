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
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/EnemyMet.ts"/>
var roboycod;
(function (roboycod) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);
            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();
            this.player = new roboycod.Player(this.game, 1024, 512);
            this.enemyTemp = new roboycod.EnemyBase(this.game, 128, 128, 'megaMet');
            console.log(this.enemyTemp);
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp, this.groundLayer);
        };
        return Level1;
    })(Phaser.State);
    roboycod.Level1 = Level1;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=Level1.js.map