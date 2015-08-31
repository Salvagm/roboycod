/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../game/utils/KeyboardHandler.ts"/>

module Roboycod {

    export class MainMenu extends Phaser.State {

        private background      : Phaser.Image;
        private widthRatio      : number;
        private heightRatio     : number;

        create() {
            this.background = this.game.add.image(0,0,'menuBackground');

            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;

            this.background.width = this.game.width;
            this.background.height = this.game.height;

            KeyboardHandler.getInstance().setupMenu(this);

        }

        startGame() {

            this.game.state.start('WorldMap', true, false);

        }

    }
}