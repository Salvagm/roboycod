/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>
var BufferSystem;
(function (BufferSystem) {
    var CoreBuffer = (function () {
        function CoreBuffer() {
        }
        CoreBuffer.prototype.bufferOutAdd = function (input) {
            return null;
        };
        CoreBuffer.prototype.bufferOutGet = function (id) {
            return null;
        };
        return CoreBuffer;
    })();
    BufferSystem.CoreBuffer = CoreBuffer;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=CoreBuffer.js.map