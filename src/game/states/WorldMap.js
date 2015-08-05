/**
 * Created by javi on 5/08/15.
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
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.apply(this, arguments);
        }
        WorldMap.prototype.create = function () {
            this.hudFake = this.game.add.image(0, 0, 'hudfake', 0);
            this.hudFake.width = this.game.width;
            this.hudFake.height = this.game.height * 0.125;
            this.hudFake.fixedToCamera = true;
            this.background = this.game.add.image(0, 0 + this.hudFake.height, 'worldMap');
            //this.startStage();
            this.background.width = this.game.width;
            this.background.height = this.game.height * 0.875;
            this.background.fixedToCamera = true;
        };
        WorldMap.prototype.startStage = function () {
            this.game.state.start('Stage', true, false, '00');
        };
        return WorldMap;
    })(Phaser.State);
    Roboycod.WorldMap = WorldMap;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=WorldMap.js.map