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
            var position = this.bufferOut.push(input);
            --position;
            return position;
            //TODO Notificar que se anaye el input a la posicion X del buffer al CDV
        };
        MotionBuffer.prototype.bufferOutGet = function (id) {
            return this.bufferOut.splice(id, 1)[0];
        };
        MotionBuffer.prototype.notify = function () {
        };
        MotionBuffer._instance = null;
        MotionBuffer._canInstantiate = false;
        return MotionBuffer;
    })();
    BufferSystem.MotionBuffer = MotionBuffer;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=MotionBuffer.js.map