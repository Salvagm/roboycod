/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
module roboycod{

    export class Level1 extends Phaser.State{

        ground: Phaser.Tilemap;
        groundLayer: Phaser.TilemapLayer;

        create(){

            this.ground = this.add.tilemap('level');
            this.ground.addTilesetImage('tiles');
            this.ground.setCollision([8, 9, 10, 22, 23, 24]);

            // El nombre es el valor "name:" del .json
            this.groundLayer = this.ground.createLayer('ground');
            this.groundLayer.resizeWorld();

            console.log("CARGADO LEVEL1");
        }
    }

}