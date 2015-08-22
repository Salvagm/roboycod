/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>
var BufferSystem;
(function (BufferSystem) {
    var MotionBuffer = (function () {
        function MotionBuffer() {
            if (!MotionBuffer._canInstantiate)
                throw Error("Fail to instantiate, use MotioBuffer.getInstance() instead");
            this.bufferOut = new Array();
            this.bufferIn = new Array();
        }
        MotionBuffer.getInstace = function () {
            if (MotionBuffer._instance === null) {
                MotionBuffer._canInstantiate = true;
                MotionBuffer._instance = new MotionBuffer();
                MotionBuffer._canInstantiate = false;
            }
            return MotionBuffer._instance;
        };
        MotionBuffer.prototype.bufferOutAdd = function (input) {
            return this.bufferOut.push(input);
        };
        MotionBuffer.prototype.bufferOutGet = function (id) {
            return this.bufferOut[id];
        };
        MotionBuffer._instance = null;
        MotionBuffer._canInstantiate = false;
        return MotionBuffer;
    })();
    BufferSystem.MotionBuffer = MotionBuffer;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=MotionBuffer.js.map