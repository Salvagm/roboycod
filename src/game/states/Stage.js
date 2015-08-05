/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/WalkingEnemy.ts"/>
///<reference path="../cdvs/BaseCdv.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
///<reference path="../utils/HUD.ts"/>
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
            this.codevices = this.game.add.group();
            //TODO HUD FAKE DEMO
            this.hudFake = this.game.add.sprite(0, 0, 'hudfake', 0);
            this.hudFake.width = this.game.width;
            this.hudFake.height = this.game.height * 0.125;
            this.hudFake.fixedToCamera = true;
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
            //Se define la zona donde acabamos el nivel
            this.finishZone = new Phaser.Sprite(this.game, tempJSON.layers[4].objects[1].x, tempJSON.layers[4].objects[1].y);
            this.game.physics.enable(this.finishZone);
            this.finishZone.body.width = tempJSON.layers[4].objects[1].width;
            this.finishZone.body.height = tempJSON.layers[4].objects[1].height;
            this.finishZone.tint = 0xff00ff;
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
                this.enemies.add(new Roboycod.WalkingEnemy(this.game, enemyData.objects[i].x, enemyData.objects[i].y));
        };
        Stage.prototype.removeShoot = function (bullet, ground) {
            bullet.kill();
        };
        /**
         * Esta funcion la implementara cada enemigo concreto. Si el enemigo muere,
         * se anyade un CDV en su posicion
         */
        Stage.prototype.collideEnemy = function (player, enemy) {
            enemy.collide(player, this.codevices);
        };
        Stage.prototype.collideCdv = function (player, cdv) {
            cdv.loadCode();
            player.cdvDemo = cdv;
            cdv.kill();
        };
        Stage.prototype.finishStage = function () {
            this.game.state.start('Stage', true, false, '00');
        };
        Stage.prototype.update = function () {
            this.game.debug.body(this.finishZone);
            this.game.physics.arcade.collide(this.groundLayer, this.player);
            this.game.physics.arcade.collide(this.groundLayer, this.enemies);
            this.game.physics.arcade.collide(this.groundLayer, this.codevices);
            this.game.physics.arcade.collide(this.enemies, this.enemies);
            this.game.physics.arcade.collide(this.player.gun, this.groundLayer, this.removeShoot);
            this.game.physics.arcade.collide(this.finishZone, this.player, this.finishStage, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.player, this.collideEnemy, null, this);
            this.game.physics.arcade.overlap(this.codevices, this.player, this.collideCdv, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.player.gun, this.shootEnemy);
        };
        return Stage;
    })(Phaser.State);
    Roboycod.Stage = Stage;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Stage.js.map