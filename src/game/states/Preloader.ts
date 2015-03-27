/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod{

    export class Preloader extends Phaser.State {

        preloadBar  : Phaser.Sprite;

        preload(){

            //  Usamos la preloadBar mientras cargamos el resto
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //TODO HUD Fake para DEMO
            this.game.load.image('hudfake', 'assets/hudfake.png');

            /**
             * Entidades, Objetos dinamicos, etc
             */
            this.load.atlasJSONHash(
                'tsDynamics',
                'assets/entities/dynamicTiles.png',
                'assets/entities/dynamicTiles.json'
            );

            //TODO cambiar por otra bala
            this.game.load.image('bullet', 'assets/entities/bullet.png');

            /**
             * FASES / NIVELES / STAGES
             */
            this.game.load.image('tsStages','assets/stages/mapTiles.png');

            this.game.load.json('jsonStage00','assets/stages/stage00.json');
            this.game.load.tilemap(
                'tmStage00',
                'assets/stages/stage00.json',
                null,
                Phaser.Tilemap.TILED_JSON
            );
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