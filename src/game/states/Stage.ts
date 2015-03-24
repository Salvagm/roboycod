/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/EnemyMet.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>


module Roboycod{

    export class Stage extends Phaser.State{

        private map         : Phaser.Tilemap;
        private groundLayer : Phaser.TilemapLayer;
        private player      : Player;
        private enemies     : Phaser.Group;
        private kh          : KeyboardHandler;
        private numStage    : string;

        //TODO pasar a keyhandler
        private debugButton : Phaser.Key;
        private debugMode   : boolean;


        init(numStage : string){
            this.numStage = numStage;
        }

        create(){

            this.kh = new KeyboardHandler(this.game);

            // http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/

            //CARGAMOS EL NIVEL
            //JSON, TileMap, TilesetImage, CollisionTiles
            this.loadStage();


            //  Asociamos un setup de teclas segun el nivel
            this.kh.setupLevel(this.player);


            //TODO MEJORAR
            this.input.mouse.mouseOutCallback = function() { this.input.keyboard.stop(); };
            this.input.mouse.mouseOverCallback = function() { this.input.keyboard.start(); };

            //this.debugButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            //this.debugMode = false;
            //this.debugButton.onDown.add(this.Debug, this);


        }

        /**
         * Segun el numero que tenga asignado el Stage, cargara unos datos u otros
         * NOTA : El orden en que creamos las capas determina que se pinta encima
         */
        public loadStage(){

            var tempJSON = this .game.cache.getJSON('jsonStage' + this.numStage);

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
                this.enemies.add(new EnemyMet(this.game,enemyData.objects[i].x,enemyData.objects[i].y));

        }
        private removeShoot(bullet : Phaser.Sprite, ground : Phaser.Tile) : void
        {
            bullet.kill();
        }

        private hitPlayer(player : Phaser.Sprite , enemy : Phaser.Sprite) : void
        {

            var direction : Phaser.Point;
            direction = Phaser.Point.subtract(player.position,enemy.position);

            Phaser.Point.normalize(direction,direction);
            // Mover valores a player o enemigo
            player.body.velocity.x = player.body.velocity.y = 0;
            player.body.velocity.x = direction.x * Math.cos(0.523598776) * 1300;
            player.body.velocity.y = direction.y * Math.sin(0.523598776) * 1300;
        }
        private Debug(){
            this.debugMode = !this.debugMode;
            this.groundLayer.debug = this.debugMode;
            //this.game.debug.body(this.player);

        }
        update(){

            this.game.debug.body(this.player);
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemies,this.groundLayer);
            this.game.physics.arcade.overlap(this.enemies,this.player,this.hitPlayer);
            this.game.physics.arcade.collide(this.enemies,this.enemies);
            this.game.physics.arcade.collide(this.player.gun,this.groundLayer,this.removeShoot);
            this.game.physics.arcade.overlap(this.enemies,this.player.gun,this.shootEnemy);

        }


    }
}