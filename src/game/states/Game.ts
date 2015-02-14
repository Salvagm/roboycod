/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level.ts"/>


module Roboycod
{
    export class Game extends Phaser.Game
    {
        constructor(width,height){

            super(width,height,Phaser.AUTO,'content');


            this.state.add('Boot',Boot,false);
            this.state.add('Preloader',Preloader,false);
            this.state.add('MainMenu',MainMenu,false);
            this.state.add('Level',Level,false);

            this.state.start('Boot');

        }

    }

}

window.onload = () => {

    var game = new Roboycod.Game(650, 600);

};