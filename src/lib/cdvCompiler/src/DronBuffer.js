/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>
var BufferSystem;
(function (BufferSystem) {
    var DronBuffer = (function () {
        function DronBuffer() {
        }
        DronBuffer.prototype.bufferOutAdd = function (input) {
            return null;
        };
        DronBuffer.prototype.bufferOutGet = function (id) {
            return null;
        };
        return DronBuffer;
    })();
    BufferSystem.DronBuffer = DronBuffer;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=DronBuffer.js.map