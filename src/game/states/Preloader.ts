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
            this.preloadBar.anchor.set(0.2,0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //TODO HUD Fake para DEMO
            this.game.load.image('hudfake', 'assets/hudfake.png');


            /**
             * Elentos WorldMap
             */

            this.game.load.image('worldMap', 'assets/world/worldMap.png');
            this.game.load.json('jsonWorldMap','assets/world/worldMap.json');
            this.game.load.image('selectedLogo', 'assets/world/selectedLogo.png');
            this.game.load.tilemap(
                'tmWorldMap',
                'assets/world/worldMap.json',
                null,
                Phaser.Tilemap.TILED_JSON
            );

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

            this.game.load.json('jsonStage0','assets/stages/stage0.json');
            this.game.load.tilemap(
                'tmStage0',
                'assets/stages/stage0.json',
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