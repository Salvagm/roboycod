/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module roboycod {

    export class MainMenu extends Phaser.State {

        create() {

           this.startGame();

        }

        startGame() {

            this.game.state.start('Level1', true, false);

        }

    }

}