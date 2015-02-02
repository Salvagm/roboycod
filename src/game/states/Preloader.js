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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Usamos la preloadBar mientras cargamos el resto
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Cargamos assets
            this.load.atlasJSONHash('robot1', '../../../assets/player/mega1Atlas.png', '../../../assets/player/mega1Atlas.json');
            this.game.load.image('sky', '../../../assets/sky.png');
            this.game.load.image('ground', '../../../assets/platform.png');
            this.game.load.image('star', '../../../assets/star.png');
            //  Cargamos ahora el mapa en json del nivel
            //TODO Cambiar titulos por level1, level2... map1, map2
            this.game.load.tilemap('level', '../../../assets/levels/mapPrueba.json', null, Phaser.Tilemap.TILED_JSON);
            //  Cargamos tiles
            this.game.load.image('tiles', '../../../assets/levels/tiles.png');
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
    roboycod.Preloader = Preloader;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=Preloader.js.map