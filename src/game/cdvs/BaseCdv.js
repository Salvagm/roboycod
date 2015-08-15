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
    var BaseCdv = (function (_super) {
        __extends(BaseCdv, _super);
        //TODO END DEMOCODE
        function BaseCdv(game, x, y) {
            _super.call(this, game, x, y, 'tsDynamics', 0);
            //TODO DEMOCODE
            this.expectedOutput = "SALTO";
            this.runBtn = document.getElementById("runCode");
            this.game.physics.enable(this);
            this.body.bounce.y = 0.5;
            this.body.gravity.y = 800;
            this.body.setSize(this.body.width / 2, this.body.height / 2, 0, 0);
            this.anchor.setTo(0.4, 0.6);
            //TODO DEMOCODE
            this.body.drag.setTo(800, 0);
            this.animations.add('idle', [71, 71, 71, 72, 73, 74, 75, 76, 77, 71, 71, 71], 9, true);
            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE
            this.create();
        }
        BaseCdv.prototype.create = function () {
            this.animations.play('idle');
        };
        BaseCdv.prototype.loadCode = function () {
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        };
        BaseCdv.prototype.checkCode = function () {
            //this.runBtn.click();
            ProcessCode.runit();
            var interpreterOutput = document.getElementById("output");
            var output = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if (output == "SALTO") {
                return true;
            }
            return false;
        };
        BaseCdv.prototype.update = function () {
            //this.game.debug.body(this);
        };
        return BaseCdv;
    })(Phaser.Sprite);
    Roboycod.BaseCdv = BaseCdv;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=BaseCdv.js.map