/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod{
    export class Preloader extends Phaser.State {

        //  Barra de carga
        preloadBar  : Phaser.Sprite;

        preload(){

            //  Usamos la preloadBar mientras cargamos el resto
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Cargamos assets
            this.load.atlasJSONHash(
                'tsEntities',
                'assets/entities/dynamicTiles.png',
                'assets/entities/dynamicTiles.json'
            );

            this.game.load.image('bullet', 'assets/player/bullet1.png');

            /**
             * NIVELES
             */

            //Cargados los JSON de los niveles en cache
            this.game.load.json('jsonStage00','assets/stages/stage00.json');

            //  Cargamos tileMaps
            //TODO Cambiar titulos por level1, level2... map1, map2

            this.game.load.tilemap(
                'tmStage00',
                'assets/stages/stage00.json',
                null,
                Phaser.Tilemap.TILED_JSON);

            //  Cargamos tileSets
            this.game.load.image('tsStages','assets/stages/mapTiles.png');
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }
    }
}