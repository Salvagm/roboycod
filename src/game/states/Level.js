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
            //CARGAMOS EL NIVEL
            //TODO modificar---> realmente debemos pasarle por parametros el nombre del nivel y no ponerselo a pelo
            var tempJSON = this.game.cache.getJSON('level1');
            //almacenamos info del mapa
            this.loadMap(tempJSON.layers[0]);
            //almacenamos info de los enemigos
            this.loadEnemies(tempJSON.layers[1]);
            //loadEnemies(tempJSON.layers[1]);
            this.game.stage.backgroundColor = 0x4488cc;
            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);
            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();
            this.kh = new Roboycod.KeyboardHandler(this.game);
            this.player = new Roboycod.Player(this.game, 1024, 512, this.kh);
            this.gun = new Roboycod.GunBase(this.game);
            this.player.setGun(this.gun);
            //  Asociamos un setup de teclas segun le nivel
            this.kh.setupLevel(this.player);
            // Inicializamos el grupo de enemigos del nivel
            this.enemies = this.game.add.group();
            this.enemyTemp = new Roboycod.EnemyMet(this.game);
            this.enemies.add(this.enemyTemp);
            console.log(this.enemyTemp);
            //console.log(datos.parse("Enemigos"));
            this.input.mouse.mouseOutCallback = function () {
                this.input.keyboard.stop();
            };
            this.input.mouse.mouseOverCallback = function () {
                this.input.keyboard.start();
            };
        };
        Level.prototype.loadMap = function (mapData) {
            console.log(mapData);
        };
        Level.prototype.loadEnemies = function (enemyData) {
            console.log(enemyData);
        };
        Level.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp, this.groundLayer);
            this.game.physics.arcade.overlap(this.enemies, this.player.gun, Roboycod.EnemyBase.receiveDamange, null, this.enemyTemp);
        };
        return Level;
    })(Phaser.State);
    Roboycod.Level = Level;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Level.js.map