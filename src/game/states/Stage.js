/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/Enemy01.ts"/>
///<reference path="../cdvs/CdvBase.ts"/>
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
            this.loadStage();
            //  Asociamos un setup de teclas segun el nivel
            this.kh.setupLevel(this.player);
            //$(document).keydown(function(e) {
            //    if (e.ctrlKey && e.which == 9) {
            //        this.input.keyboard.stop();
            //        //alert("CTRL + TAB Pressed")
            //    }
            //})
            //TODO MEJORAR
            this.input.mouse.mouseOutCallback = function () {
                this.input.keyboard.stop();
            };
            this.input.mouse.mouseOverCallback = function () {
                this.input.keyboard.start();
            };
            //TODO CAMBIAR A CUANDO MUERE UN enemigo anyade CDV en su posicion
            this.codevices = this.game.add.group();
            this.codevices.add(new Roboycod.CdvBase(this.game, 200, 200));
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
            this.groundLayer.resizeWorld();
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
                this.enemies.add(new Roboycod.Enemy01(this.game, enemyData.objects[i].x, enemyData.objects[i].y));
        };
        Stage.prototype.removeShoot = function (bullet, ground) {
            bullet.kill();
        };
        //TODO implementar funcion de colision con player de los enemigos concretos
        Stage.prototype.collideEnemy = function (player, enemy) {
            enemy.collide(player, enemy);
        };
        Stage.prototype.update = function () {
            this.game.physics.arcade.collide(this.groundLayer, this.player);
            this.game.physics.arcade.collide(this.groundLayer, this.enemies);
            this.game.physics.arcade.collide(this.groundLayer, this.codevices);
            this.game.physics.arcade.collide(this.enemies, this.enemies);
            this.game.physics.arcade.collide(this.player.gun, this.groundLayer, this.removeShoot);
            this.game.physics.arcade.overlap(this.enemies, this.player, this.collideEnemy);
            this.game.physics.arcade.overlap(this.enemies, this.player.gun, this.shootEnemy);
        };
        return Stage;
    })(Phaser.State);
    Roboycod.Stage = Stage;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Stage.js.map