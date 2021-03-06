/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
/// <reference path="../../lib/jquery/jquery.d.ts"/>
/// <reference path="../utils/GameManager.ts"/>
/// <reference path="../../UtilsSetup.d.ts"/>

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


            /*
             * Elentos MainMenu
             */

            this.game.load.image('menuBackground', 'assets/menu/menuConcept01.png');

            /*
             * Elentos WorldMap
             */
            this.game.load.image('worldMap', 'assets/world/worldMap.png');
            this.game.load.json('jsonWorldMap','assets/world/worldMap.json');
            this.load.atlasJSONHash(
                'worldTiles',
                'assets/world/worldTiles.png',
                'assets/world/worldTiles.json'
            );

            /*
             * Elementos Inventario
             */
            this.game.load.image(
                'inventoryBackground', 'assets/inventory/inventoryBackground.png'
            );
            this.game.load.image(
                'iAvatarW', 'assets/inventory/iAvatarW.png'
            );
            this.game.load.image(
                'iAvatarC', 'assets/inventory/iAvatarC.png'
            );
            this.game.load.image(
                'iAvatarM', 'assets/inventory/iAvatarM.png'
            );
            this.game.load.image(
                'iAvatarD', 'assets/inventory/iAvatarD.png'
            );
            this.game.load.json('jsonInventory','assets/inventory/inventory.json');
            this.load.atlasJSONHash(
                'inventoryTiles',
                'assets/inventory/inventoryTiles.png',
                'assets/inventory/inventoryTiles.json'
            );

            this.game.load.bitmapFont('gemFont', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');

            /*
             * Entidades, Objetos dinamicos, etc
             */
            this.load.atlasJSONHash(
                'tsDynamics',
                'assets/entities/dynamicTiles.png',
                'assets/entities/dynamicTiles.json'
            );

            //TODO cambiar por otra bala
            this.game.load.image('bullet', 'assets/entities/bullet.png');

            /*
             * FASES / STAGES
             */
            this.game.load.image('tsStages','assets/stages/mapTiles.png');

            this.game.load.json('jsonStage0','assets/stages/stage0.json');
            this.game.load.tilemap(
                'tmStage0',
                'assets/stages/stage0.json',
                null,
                Phaser.Tilemap.TILED_JSON
            );

            /*
             * Cargamos JSON para guardar los estados de los STATES
             */
            this.game.load.json('gameData','assets/gameData.json');

            //Ajustamos la vista lateral
            $('#buffers').show();
            $('#inventoryUtils').hide();
            fixRightSide();
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