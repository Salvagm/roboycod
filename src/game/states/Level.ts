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
        gun         : GunBase;
        enemyTemp   : EnemyBase;


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

            this.kh = new KeyboardHandler(this.game);
            this.player = new Player(this.game, 1024, 512, this.kh);
            this.gun = new GunBase(this.game);
            this.player.setGun(this.gun);

            //  Asociamos un setup de teclas segun le nivel
            this.kh.setupLevel(this.player);

            // Inicializamos el grupo de enemigos del nivel
            this.enemies = this.game.add.group();
            this.enemyTemp = new EnemyMet(this.game);
            this.enemies.add(this.enemyTemp);
            console.log(this.enemyTemp);
            //console.log(datos.parse("Enemigos"));


            this.input.mouse.mouseOutCallback = function()
            {
                this.input.keyboard.stop();
            };
            this.input.mouse.mouseOverCallback = function()
            {
                this.input.keyboard.start();

            }


        }



        private loadMap(mapData : JSON) : void
        {
            console.log(mapData);
        }

        private loadEnemies(enemyData : JSON) : void
        {
            console.log(enemyData);
        }


        update(){
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp,this.groundLayer);
            this.game.physics.arcade.overlap(this.enemies,this.player.gun,this.receiveDamange,null,this.enemyTemp);
        }


        receiveDamange(entity : Phaser.Sprite, shoot : Phaser.Sprite)
        {
            entity.damage(shoot.health);
            shoot.kill();
        }
    }
}