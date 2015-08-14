/**
 * Created by javi on 8/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod {

    export class Inventory extends Phaser.State {

        private background      : Phaser.Image;
        private selectedLogo    : Phaser.Sprite;
        private navMatrix       : any[][];
        private x               : number;
        private y               : number;
        private widthRatio      : number;
        private heightRatio     : number;
        private lastStage       : string;
        private numStage        : string;
        private json;

        private kh              : KeyboardHandler;

        init(lastStage : string, numStage : string){
            this.lastStage = lastStage;
            this.numStage = numStage;
        }
        create() {

            this.game.stage.backgroundColor = 0x272822;
            this.json = this.game.cache.getJSON('jsonInventory');
            this.background = this.game.add.image(0,0,'inventoryBackground');

            this.widthRatio = this.background.width / this.game.width;
            this.heightRatio = this.background.height / this.game.height;

            this.background.width = this.game.width;
            this.background.height = this.game.height;

            /**
             * Definimos y mapeamos las teclas correspondientes
             */
            this.kh = new KeyboardHandler(this.game);
            this.kh.setUpInventory(this);

        }
        public navToLastState(){
            this.game.state.start(this.lastStage, true, false, this.numStage);

        }
    }
}