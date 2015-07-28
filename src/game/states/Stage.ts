/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/WalkingEnemy.ts"/>
///<reference path="../cdvs/BaseCdv.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
    ///<reference path="../utils/HUD.ts"/>


module Roboycod{

    export class Stage extends Phaser.State{

        private map         : Phaser.Tilemap;
        private groundLayer : Phaser.TilemapLayer;
        private player      : Player;
        private enemies     : Phaser.Group;
        private codevices   : Phaser.Group;
        private kh          : KeyboardHandler;
        private numStage    : string;

        private hudFake     : Phaser.Sprite;


        init(numStage : string){
            this.numStage = numStage;
        }

        create(){

            this.kh = new KeyboardHandler(this.game);

            this.loadStage();

            //  Asociamos un setup de teclas segun el nivel
            this.kh.setupLevel(this.player);

            this.codevices = this.game.add.group();

            //TODO HUD FAKE DEMO
            this.hudFake = this.game.add.sprite(0, 0, 'hudfake', 0);
            this.hudFake.width = this.game.width;
            this.hudFake.height = this.game.width / 8;
            this.hudFake.fixedToCamera = true;

            //$(document).keydown(function(e) {
            //    if (e.ctrlKey && e.which == 9) {
            //        this.input.keyboard.stop();
            //        //alert("CTRL + TAB Pressed")
            //    }
            //})
            //TODO MEJORAR
            this.input.mouse.mouseOutCallback = function() { this.input.keyboard.stop(); };
            this.input.mouse.mouseOverCallback = function() { this.input.keyboard.start(); };
        }

        /**
         * Segun el numero que tenga asignado el Stage, cargara unos datos u otros
         * NOTA : El orden en que creamos las capas determina que se pinta encima
         */
        public loadStage(){

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
            this.player = new Player(
                this.game,
                tempJSON.layers[4].objects[0].x,
                tempJSON.layers[4].objects[0].y,
                this.kh);

            //Cargamos enemigos
            this.loadEnemies(tempJSON.layers[3]);

        }

        private shootEnemy(enemy : Phaser.Sprite, shoot : Phaser.Sprite) : void
        {
            enemy.damage(shoot.health);
            shoot.kill();
        }

        private loadEnemies(enemyData) : void
        {
            this.enemies = this.game.add.group();
            for(var i = 0; i< enemyData.objects.length ; ++i)
                this.enemies.add(new WalkingEnemy(this.game,enemyData.objects[i].x,enemyData.objects[i].y));

        }
        private removeShoot(bullet : Phaser.Sprite, ground : Phaser.Tile) : void
        {
            bullet.kill();
        }

        /**
         * Esta funcion la implementara cada enemigo concreto. Si el enemigo muere,
         * se anyade un CDV en su posicion
         */
        private collideEnemy(player : Player , enemy : BaseEnemy) : void{

            enemy.collide(player, this.codevices);
        }
        private collideCdv(player : Player, cdv : BaseCdv) : void{

            cdv.loadCode();
            player.cdvDemo = cdv;
            cdv.kill();
        }
        update(){

            this.game.physics.arcade.collide(this.groundLayer, this.player);
            this.game.physics.arcade.collide(this.groundLayer, this.enemies);
            this.game.physics.arcade.collide(this.groundLayer, this.codevices);

            this.game.physics.arcade.collide(this.enemies,this.enemies);
            this.game.physics.arcade.collide(this.player.gun,this.groundLayer,this.removeShoot);

            this.game.physics.arcade.overlap(this.enemies,this.player,this.collideEnemy, null, this);
            this.game.physics.arcade.overlap(this.codevices,this.player,this.collideCdv, null, this);
            this.game.physics.arcade.overlap(this.enemies,this.player.gun,this.shootEnemy);

        }


    }
}