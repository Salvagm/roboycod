/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
    ///<reference path="../player/Player.ts"/>

module Roboycod {

    export class KeyboardHandler extends Phaser.Keyboard{

        private up      : Phaser.Key;
        private left    : Phaser.Key;
        private down    : Phaser.Key;
        private right   : Phaser.Key;

        private arrowUp     : Phaser.Key;
        private arrowLeft   : Phaser.Key;
        private arrowDown   : Phaser.Key;
        public arrowRight  : Phaser.Key;

        constructor(game: Phaser.Game) {

            super(game);

            this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        }
        public setupLevel(player : Roboycod.Player) : void{

            this.left.onHoldCallback = player.moveLeft;
            this.left.onHoldContext = player;
            this.right.onHoldCallback = player.moveRight;
            this.right.onHoldContext = player;
            this.up.onHoldCallback = player.jump;
            this.up.onHoldContext = player;
            this.arrowRight.onHoldCallback = player.shoot;
            this.arrowRight.onHoldContext = player;

            this.addCallbacks(player, null, player.stopMove, null);

        }

    }

}