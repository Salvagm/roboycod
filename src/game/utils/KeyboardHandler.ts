/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module roboycod {

    export class KeyboardHandler extends Phaser.Keyboard{

        up      : Phaser.Key;
        left    : Phaser.Key;
        down    : Phaser.Key;
        right   : Phaser.Key;

        arrowUp     : Phaser.Key;
        arrowLeft   : Phaser.Key;
        arrowDown   : Phaser.Key;
        arrowRight  : Phaser.Key;

        create() {

            this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


            //Key Function
            //this.left.onHoldCallback = roboycod.Player.moveLeft;
            //this.right.onHoldCallback = Player.moveRight;
            //this.up.onHoldCallback = Player.jump;
            ////Cambiar por onDownCallback (no funciona)
            //this.arrowRight.onHoldCallback = Player.shoot;
            //
            //
            //this.game.input.keyboard.onUpCallback = Player.stopMove;
        }

    }

}