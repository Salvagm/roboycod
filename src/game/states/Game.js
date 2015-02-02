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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(width, height) {
            _super.call(this, width, height, Phaser.AUTO, 'content');
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level1', Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    roboycod.Game = Game;
})(roboycod || (roboycod = {}));
window.onload = function () {
    var game = new roboycod.Game(800, 600);
};
//# sourceMappingURL=Game.js.map