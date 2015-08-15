/**
 * Created by javi on 15/04/15.
 */
/**
 * Esta clase se encagarga de la comunicacion entre el juego y el compilador
 * Gestiona los buffers de entrada y salida que seran actualizados por quien los requiera
 */
///<reference path ="CDVCompiled.ts" />
var Compiler;
(function (Compiler) {
    // TODO Hacer esta clase singleton
    var CompilerBridge = (function () {
        function CompilerBridge() {
        }
        CompilerBridge.prototype.runit = function (code) {
            return 0;
        };
        CompilerBridge.prototype.compile = function (code) {
            return false;
        };
        return CompilerBridge;
    })();
    Compiler.CompilerBridge = CompilerBridge;
})(Compiler || (Compiler = {}));
//# sourceMappingURL=CompilerBridge.js.map