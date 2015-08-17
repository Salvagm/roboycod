/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roboycod;
(function (Roboycod) {
    var SpriteCdv = (function (_super) {
        __extends(SpriteCdv, _super);
        function SpriteCdv(game, x, y) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width / 2, this.body.height / 2, 0, 0);
            this.anchor.setTo(0.4, 0.6);
            //TODO DEMOCODE
            this.body.drag.setTo(800, 0);
            this.animations.add('idle', [71, 71, 71, 72, 73, 74, 75, 76, 77, 71, 71, 71], 9, true);
            //TODO END DEMOCODE
            this.create();
        }
        SpriteCdv.prototype.create = function () {
            this.animations.play('idle');
        };
        return SpriteCdv;
    })(Phaser.Sprite);
    Roboycod.SpriteCdv = SpriteCdv;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvSprite.js.map