/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>
var Roboycod;
(function (Roboycod) {
    var CdvLogic = (function () {
        //TODO END DEMOCODE
        function CdvLogic() {
            //TODO DEMOCODE
            this.expectedOutput = "SALTO";
            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE
        }
        CdvLogic.prototype.loadCode = function () {
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        };
        CdvLogic.prototype.checkCode = function () {
            runCode();
            var interpreterOutput = document.getElementById("output");
            var output = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if (output == "SALTO") {
                return true;
            }
            return false;
        };
        return CdvLogic;
    })();
    Roboycod.CdvLogic = CdvLogic;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvLogic.js.map