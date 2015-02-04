/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/EnemyMet.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);
            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.player = new Roboycod.Player(this.game, 1024, 512, this.kh);
            //  Asociamos un setup de teclas segun le nivel
            this.kh.setupLevel(this.player);
            // Inicializamos el grupo de enemigos del nivel
            this.enemies = this.game.add.group();
            this.enemyTemp = new Roboycod.EnemyMet(this.game);
            //console.log(this.game.cache.getJSON('level')[1]);
        };
        Level.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp, this.groundLayer);
        };
        return Level;
    })(Phaser.State);
    Roboycod.Level = Level;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Level.js.map