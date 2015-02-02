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
var roboycod;
(function (roboycod) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', '../../../assets/loader.png');
        };
        Boot.prototype.create = function () {
            //No incluimos multitouch
            this.input.maxPointers = 1;
            //Continua cargando aunque no estemos la pestaña
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    roboycod.Boot = Boot;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=Boot.js.map