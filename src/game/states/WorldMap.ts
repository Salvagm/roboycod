/**
 * Created by javi on 5/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    export class WorldMap extends Phaser.State {

        private background  : Phaser.Image;
        private hudFake     : Phaser.Image;

        create() {


            this.hudFake = this.game.add.image(0, 0, 'hudfake', 0);
            this.hudFake.width = this.game.width;
            this.hudFake.height = this.game.height * 0.125;
            this.hudFake.fixedToCamera = true;

            this.background = this.game.add.image(0,0+this.hudFake.height,'worldMap');
            //this.startStage();
            this.background.width = this.game.width;
            this.background.height = this.game.height * 0.875;
            this.background.fixedToCamera = true;
        }

        startStage() {

            this.game.state.start('Stage', true, false, '00');

        }

    }

}