/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module roboycod
{
    export class Game extends Phaser.Game
    {
        constructor(width,height){

            super(width,height,Phaser.AUTO,'content',null);

            this.state.add('Boot',Boot,false);
            this.state.add('Preloader',Preloader,false);
            this.state.add('MainMenu',MainMenu,false);
            this.state.add('Level1',Level1,false);

            this.state.start('Boot');
        }

    }

}

window.onload = () => {

    var game = new roboycod.Game(800, 600);

};