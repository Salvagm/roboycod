/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
            //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
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
            //this.scale.setScreenSize(true);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Roboycod.Boot = Boot;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Boot.js.map