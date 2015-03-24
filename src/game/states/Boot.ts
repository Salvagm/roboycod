/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>

module Roboycod
{
    export class Boot extends Phaser.State
    {

        init()
        {
            //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        }

        preload()
        {
            this.load.image('preloadBar','assets/loader.png');
        }

        create()
        {
            ////No incluimos multitouch
            //this.input.maxPointers=1;
            ////Continua cargando aunque no estemos la pestaña
            //this.stage.disableVisibilityChange = true;
            //
            //if(this.game.device.desktop)
            //{
            //    this.scale.pageAlignHorizontally = true;
            //
            //}
            this.scale.setScreenSize(true);

            this.game.state.start('Preloader',true,false);

        }

    }
}