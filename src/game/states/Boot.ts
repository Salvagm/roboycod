/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod
{
    export class Boot extends Phaser.State
    {

        preload()
        {
            this.load.image('preloadBar','assets/loader.png');
        }

        create()
        {
            //No incluimos multitouch
            this.input.maxPointers=1;
            //Continua cargando aunque no estemos la pestaña
            this.stage.disableVisibilityChange = true;

            if(this.game.device.desktop)
            {
                this.scale.pageAlignHorizontally = true;

            }


            this.game.state.start('Preloader',true,false);

        }

    }
}