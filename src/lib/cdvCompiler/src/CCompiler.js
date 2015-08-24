/**
 * Created by salva on 15/08/15.
 */
///<reference path ="ICompiler.ts" />
///<reference path ="ParseData.ts" />
///<reference path="../gramatica/CGrammar.d.ts"/>
var Compiler;
(function (Compiler) {
    var CCompiler = (function () {
        function CCompiler() {
            if (!CCompiler._canInstantiate)
                throw Error("Fail to instantiate, use CCompiler.getInstance() instead");
            this.bufferType = "";
            this._cCompiler = new CGrammar.Parser();
        }
        CCompiler.getInstance = function () {
            if (CCompiler._instance === null) {
                CCompiler._canInstantiate = true;
                CCompiler._instance = new CCompiler();
                CCompiler._canInstantiate = false;
            }
            return CCompiler._instance;
        };
        CCompiler.prototype.setBufferType = function (type) {
            this.bufferType = type;
        };
        CCompiler.prototype.compile = function (code) {
            try {
                var trad = this._cCompiler.parse(code);
                this.info = new Compiler.ParseData(true, trad);
            }
            catch (e) {
                this.info = new Compiler.ParseData(false, e);
            }
            return this.info;
        };
        // weapon, core, motion, dron
        CCompiler.prototype.bufferTrad = function (code) {
            var cad = "BufferSystem";
            switch (this.bufferType) {
                case 'weapon':
                    cad += ".WeaponBuffer";
                    break;
                case 'core':
                    cad += ".CoreBuffer";
                    break;
                case 'motion':
                    cad += ".MotionBuffer";
                    break;
                case 'dron':
                    cad += ".DronBuffer";
                    break;
                default:
                    throw Error("Type is not defined or unknwon");
            }
            cad += ".getInstace().bufferOutAdd(" + code + ")";
            return cad;
        };
        CCompiler._instance = null;
        CCompiler._canInstantiate = false;
        return CCompiler;
    })();
    Compiler.CCompiler = CCompiler;
    // Fuera de la clase
    addEventListener("message", function (e) {
        importScripts("../gramatica/CGrammar.js", "ParseData.js");
        var wCompiler = CCompiler.getInstance();
        wCompiler.setBufferType(e.data.type);
        var info = wCompiler.compile(e.data.code);
        info.setCode(info.getCode() + " main();");
        while (true) {
        }
        self.postMessage(info, null);
    }, false);
})(Compiler || (Compiler = {}));
//# sourceMappingURL=CCompiler.js.map