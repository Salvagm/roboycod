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
                'robot',
                'assets/player/player1.png',
                'assets/player/player1.json'
            );
            this.load.atlasJSONHash(
                'megaMet',
                'assets/enemies/metAtlas.png',
                'assets/enemies/metAtlas.json'
            );
            //Cargados los JSON de los niveles en cache
            this.game.load.json('level1','assets/levels/mapPrueba.json');

            this.game.load.image('bullet', 'assets/player/bullet1.png');

            //  Cargamos ahora el mapa en json del nivel
            //TODO Cambiar titulos por level1, level2... map1, map2
            this.game.load.tilemap(
                'level',
                'assets/levels/mapPrueba.json',
                 null,
                Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap(
                'level0',
                'assets/levels/mapPrueba0.json',
                null,
                Phaser.Tilemap.TILED_JSON);
            //  Cargamos tiles
            this.game.load.image('tiles','assets/levels/tiles.png');
            this.game.load.image('tiles0','assets/levels/tiles0.png');
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