/**
 * Created by javi on 26/03/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
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
        //TODO END DEMOCODE
        function CdvBase(game, x, y) {
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
            this.code = "def jump(keyJum):\n    if(keyJum):\n        print(\"SALTO\")\njump(True)";
            //TODO END DEMOCODE
            this.create();
        }
        CdvBase.prototype.create = function () {
            this.animations.play('idle');
        };
        CdvBase.prototype.loadCode = function () {
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        };
        CdvBase.prototype.runCode = function () {
            this.runBtn.click();
            var interpreterOutput = document.getElementById("output");
            var output = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if (output == "SALTO") {
                return true;
            }
            return false;
        };
        CdvBase.prototype.update = function () {
            //this.game.debug.body(this);
        };
        return CdvBase;
    })(Phaser.Sprite);
    Roboycod.CdvBase = CdvBase;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvBase.js.map