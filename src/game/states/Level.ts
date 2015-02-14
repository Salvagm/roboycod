/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/EnemyMet.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>


module Roboycod{

    export class Level extends Phaser.State{

        private ground      : Phaser.Tilemap;
        private groundLayer : Phaser.TilemapLayer;
        private player      : Player;
        private enemies     : Phaser.Group;
        private kh          : KeyboardHandler;


        create(){

            //CARGAMOS EL NIVEL
            //TODO modificar---> realmente debemos pasarle por parametros el nombre del nivel y no ponerselo a pelo
            var tempJSON = this .game.cache.getJSON('level1');

            //cargamos info del mapa
            this.loadMap(tempJSON.layers[0]);
            //cargamos info de los enemigos
            this.loadEnemies(tempJSON.layers[1]);
            //loadEnemies(tempJSON.layers[1]);


            this.game.stage.backgroundColor = 0x4488cc;
            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);

            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();
            //this.groundLayer.debug = true;

            this.kh = new KeyboardHandler(this.game);
            this.player = new Player(this.game, 977, 89, this.kh);

            //  Asociamos un setup de teclas segun le nivel
            this.kh.setupLevel(this.player);


            this.input.mouse.mouseOutCallback = function() { this.input.keyboard.stop(); };
            this.input.mouse.mouseOverCallback = function() { this.input.keyboard.start(); };


        }

        private shootEnemy(enemy : Phaser.Sprite, shoot : Phaser.Sprite) : void
        {
            enemy.damage(shoot.health);
            shoot.kill();
        }


        private loadMap(mapData : JSON) : void
        {
            //console.log(mapData);
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
        update(){


            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemies,this.groundLayer);
            this.game.physics.arcade.collide(this.enemies,this.player,this.hitPlayer);
            this.game.physics.arcade.collide(this.enemies,this.enemies);
            this.game.physics.arcade.collide(this.player.gun,this.groundLayer,this.removeShoot);
            this.game.physics.arcade.overlap(this.enemies,this.player.gun,this.shootEnemy);

        }


    }
}