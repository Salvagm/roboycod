/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Stage.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(width, height) {
            _super.call(this, width, height, Phaser.AUTO, 'content');
            this.state.add('Boot', Roboycod.Boot, false);
            this.state.add('Preloader', Roboycod.Preloader, false);
            this.state.add('MainMenu', Roboycod.MainMenu, false);
            this.state.add('Stage', Roboycod.Stage, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Roboycod.Game = Game;
})(Roboycod || (Roboycod = {}));
window.onload = function () {
    var game = new Roboycod.Game(650, 600);
};
//# sourceMappingURL=Game.js.map