/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/EnemyMet.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>


module Roboycod{

    export class Level extends Phaser.State{

        ground      : Phaser.Tilemap;
        groundLayer : Phaser.TilemapLayer;
        kh          : KeyboardHandler;
        player      : Player;
        gun         : GunBase;
        enemies     : Phaser.Group;
        enemyTemp   : EnemyBase;


        create(){

            //CARGAMOS EL NIVEL
            //TODO modificar---> realmente debemos pasarle por parametros el nombre del nivel y no ponerselo a pelo
            var tempJSON = this .game.cache.getJSON('level1');

            //almacenamos info del mapa
            this.loadMap(tempJSON.layers[0]);
            //almacenamos info de los enemigos
            this.loadEnemies(tempJSON.layers[1]);
            //loadEnemies(tempJSON.layers[1]);


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


            //console.log(datos.parse("Enemigos"));

        }


        private loadMap(mapaData : JSON) : void
        {
            console.log(mapaData);
        }

        private loadEnemies(enemyData : JSON) : void
        {
            console.log(enemyData);
        }


        update(){
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp,this.groundLayer);

        }
    }
}