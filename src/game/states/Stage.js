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
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.apply(this, arguments);
        }
        Stage.prototype.init = function (numStage) {
            this.numStage = numStage;
        };
        Stage.prototype.create = function () {
            this.kh = new Roboycod.KeyboardHandler(this.game);
            // http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
            //CARGAMOS EL NIVEL
            //JSON, TileMap, TilesetImage, CollisionTiles
            this.loadStage();
            //  Asociamos un setup de teclas segun el nivel
            this.kh.setupLevel(this.player);
            //TODO MEJORAR
            this.input.mouse.mouseOutCallback = function () {
                this.input.keyboard.stop();
            };
            this.input.mouse.mouseOverCallback = function () {
                this.input.keyboard.start();
            };
            //this.debugButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            //this.debugMode = false;
            //this.debugButton.onDown.add(this.Debug, this);
        };
        /**
         * Segun el numero que tenga asignado el Stage, cargara unos datos u otros
         * NOTA : El orden en que creamos las capas determina que se pinta encima
         */
        Stage.prototype.loadStage = function () {
            var tempJSON = this.game.cache.getJSON('jsonStage' + this.numStage);
            this.map = this.add.tilemap('tmStage' + this.numStage);
            this.map.addTilesetImage('tsStages');
            // El nombre es el valor "name:" del .json
            this.map.createLayer('background');
            this.map.createLayer('decoration');
            this.groundLayer = this.map.createLayer('ground');
            //id+1
            this.map.setCollisionBetween(1, 99, true, 'ground');
            //var collisionTiles : number[] = [635, 636, 637, 664, 665, 666, 693, 695];
            //this.map.setCollision(collisionTiles, true,this.groundLayer);
            console.log("creo colisiones y voy a reescalar el mundo");
            this.groundLayer.resizeWorld();
            this.groundLayer.debug = true;
            //Cargamos player
            this.player = new Roboycod.Player(this.game, tempJSON.layers[4].objects[0].x, tempJSON.layers[4].objects[0].y, this.kh);
            //Cargamos enemigos
            this.loadEnemies(tempJSON.layers[3]);
        };
        Stage.prototype.shootEnemy = function (enemy, shoot) {
            enemy.damage(shoot.health);
            shoot.kill();
        };
        Stage.prototype.loadEnemies = function (enemyData) {
            this.enemies = this.game.add.group();
            for (var i = 0; i < enemyData.objects.length; ++i)
                this.enemies.add(new Roboycod.EnemyMet(this.game, enemyData.objects[i].x, enemyData.objects[i].y));
        };
        Stage.prototype.removeShoot = function (bullet, ground) {
            bullet.kill();
        };
        Stage.prototype.hitPlayer = function (player, enemy) {
            var direction;
            direction = Phaser.Point.subtract(player.position, enemy.position);
            Phaser.Point.normalize(direction, direction);
            // Mover valores a player o enemigo
            player.body.velocity.x = player.body.velocity.y = 0;
            player.body.velocity.x = direction.x * Math.cos(0.523598776) * 1300;
            player.body.velocity.y = direction.y * Math.sin(0.523598776) * 1300;
        };
        Stage.prototype.Debug = function () {
            this.debugMode = !this.debugMode;
            this.groundLayer.debug = this.debugMode;
            //this.game.debug.body(this.player);
        };
        Stage.prototype.update = function () {
            this.game.debug.body(this.player);
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemies, this.groundLayer);
            this.game.physics.arcade.overlap(this.enemies, this.player, this.hitPlayer);
            this.game.physics.arcade.collide(this.enemies, this.enemies);
            this.game.physics.arcade.collide(this.player.gun, this.groundLayer, this.removeShoot);
            this.game.physics.arcade.overlap(this.enemies, this.player.gun, this.shootEnemy);
        };
        return Stage;
    })(Phaser.State);
    Roboycod.Stage = Stage;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Stage.js.map