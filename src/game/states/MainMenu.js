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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.startGame();
        };
        MainMenu.prototype.startGame = function () {
            //this.game.state.start('WorldMap', true, false);
            this.game.state.start('Stage', true, false, '0');
        };
        return MainMenu;
    })(Phaser.State);
    Roboycod.MainMenu = MainMenu;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=MainMenu.js.map