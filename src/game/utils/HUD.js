var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
var Roboycod;
(function (Roboycod) {
    var HUD = (function (_super) {
        __extends(HUD, _super);
        function HUD(game, x, y) {
            _super.call(this, game, x, y);
            this.fixedToCamera = true;
            this.create();
        }
        HUD.prototype.create = function () {
        };
        return HUD;
    })(Phaser.Sprite);
    Roboycod.HUD = HUD;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=HUD.js.map