/**
 * Created by salva on 15/08/15.
 */
var Compiler;
(function (Compiler) {
    /**
     * Clase donde encapsulamos el codigo que se ha generado y si ha podido generarlo o no
     */
    var ParseData = (function () {
        function ParseData(status, code, cmd) {
            this._code = code;
            this._isCompiled = status;
            if (cmd !== undefined)
                this._cmd = cmd;
        }
        ParseData.prototype.setCompiled = function (value) {
            this._isCompiled = value;
        };
        ParseData.prototype.setCode = function (value) {
            this._code = value;
        };
        ParseData.prototype.setCmd = function (value) {
            this._cmd = value;
        };
        ParseData.prototype.isCompiled = function () {
            return this._isCompiled;
        };
        ParseData.prototype.getCode = function () {
            return this._code;
        };
        ParseData.prototype.getCmd = function () {
            return this._cmd;
        };
        return ParseData;
    })();
    Compiler.ParseData = ParseData;
})(Compiler || (Compiler = {}));
//# sourceMappingURL=ParseData.js.map