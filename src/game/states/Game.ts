/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Stage.ts"/>
///<reference path="WorldMap.ts"/>
///<reference path="Inventory.ts"/>


module Roboycod
{
    export class Game extends Phaser.Game
    {
        constructor(width,height){

            super(width,height,Phaser.AUTO,'game');

            this.state.add('Boot',Boot,false);
            this.state.start()
            this.state.add('Preloader',Preloader,false);
            this.state.add('MainMenu',MainMenu,false);
            this.state.add('Inventory',Inventory,false);
            this.state.add('WorldMap',WorldMap,false);
            this.state.add('Stage',Stage,false);

            this.state.start('Boot');

        }
    }

}

window.onload = () => {

    var game = new Roboycod.Game(700, 600);

};