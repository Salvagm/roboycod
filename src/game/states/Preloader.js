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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Usamos la preloadBar mientras cargamos el resto
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            /**
             * Entidades, Objetos dinamicos, etc
             */
            this.load.atlasJSONHash('tsDynamics', 'assets/entities/dynamicTiles.png', 'assets/entities/dynamicTiles.json');
            this.game.load.image('bullet', 'assets/entities/bullet.png');
            /**
             * FASES / NIVELES / STAGES
             */
            this.game.load.image('tsStages', 'assets/stages/mapTiles.png');
            this.game.load.json('jsonStage00', 'assets/stages/stage00.json');
            this.game.load.tilemap('tmStage00', 'assets/stages/stage00.json', null, Phaser.Tilemap.TILED_JSON);
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Roboycod.Preloader = Preloader;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=Preloader.js.map