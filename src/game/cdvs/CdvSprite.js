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
        function SpriteCdv(game, x, y, logicType) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            // Constants
            this.WAIT_TIME = 2000;
            this.INIT_FRAME = 71;
            this.FRAMES = 7;
            this.logicType = logicType;
            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width / 2, this.body.height / 2, 0, 0);
            this.anchor.setTo(0.4, 0.6);
            this.body.drag.setTo(800, 0);
            // Definimos las animaciones de cada CDV
            var frameList = [];
            for (var i = 0; i < Roboycod.CdvLogic.TYPES.length; ++i) {
                for (var j = this.INIT_FRAME; j < this.INIT_FRAME + this.FRAMES; ++j) {
                    frameList.push(j);
                }
                this.animations.add(Roboycod.CdvLogic.TYPES[i], frameList, 9, false);
                this.INIT_FRAME += this.FRAMES;
                frameList = [];
            }
            this.create();
        }
        SpriteCdv.prototype.create = function () {
            this.timer = this.game.time.time;
            this.animations.play(Roboycod.CdvLogic.TYPES[0]);
        };
        SpriteCdv.prototype.update = function () {
            //Controlamos el delay de la animacion
            if (this.game.time.time > this.timer + this.WAIT_TIME) {
                this.animations.play(Roboycod.CdvLogic.TYPES[0]);
                this.timer = this.game.time.time;
            }
        };
        return SpriteCdv;
    })(Phaser.Sprite);
    Roboycod.SpriteCdv = SpriteCdv;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvSprite.js.map