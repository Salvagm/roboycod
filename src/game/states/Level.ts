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
        player      : Player;
        kh          : KeyboardHandler;
        enemies     : Phaser.Group;
        enemyTemp   : EnemyBase;

        create(){

            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);
            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();

            this.kh = new KeyboardHandler(this.game);
            this.player = new Player(this.game, 1024, 512, this.kh);

            //  Asociamos un setup de teclas segun le nivel
            this.kh.setupLevel(this.player);

            // Inicializamos el grupo de enemigos del nivel
            this.enemies = this.game.add.group();
            this.enemyTemp = new EnemyMet(this.game);


            //console.log(this.game.cache.getJSON('level')[1]);

        }

        update(){
            this.game.physics.arcade.collide(this.player, this.groundLayer);
            this.game.physics.arcade.collide(this.enemyTemp,this.groundLayer);

        }
    }
}