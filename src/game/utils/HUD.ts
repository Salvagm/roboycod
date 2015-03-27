/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
module Roboycod {

    export class HUD extends Phaser.Sprite{


        constructor(game : Phaser.Game, x : number, y : number){

            super(game, x, y);


            this.fixedToCamera = true;

            this.create();
        }
        create(){
        }

    }
}