/**
 * Created by javi on 26/03/15.
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
    var CdvBase = (function (_super) {
        __extends(CdvBase, _super);
        function CdvBase(game, x, y) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width / 2, this.body.height / 2, 0, 0);
            this.anchor.setTo(0.4, 0.6);
            //TODO EJEMPLO PROTOTIPO
            this.body.drag.setTo(800, 0);
            this.animations.add('idle', [71, 71, 71, 72, 73, 74, 75, 76, 77, 71, 71, 71], 9, true);
            this.code = "def jump(keyJum):\n    if(keyJum):\n        print(\"SALTO\")\n";
            //TODO editor.setValue(JSON.parse(code)) de code
            this.create();
        }
        CdvBase.prototype.create = function () {
            this.animations.play('idle');
        };
        CdvBase.prototype.update = function () {
            //this.game.debug.body(this);
        };
        return CdvBase;
    })(Phaser.Sprite);
    Roboycod.CdvBase = CdvBase;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvBase.js.map