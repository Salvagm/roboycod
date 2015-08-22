/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>
var BufferSystem;
(function (BufferSystem) {
    var WeaponBuffer = (function () {
        function WeaponBuffer() {
        }
        WeaponBuffer.prototype.bufferOutAdd = function (input) {
            return null;
        };
        WeaponBuffer.prototype.bufferOutGet = function (id) {
            return null;
        };
        return WeaponBuffer;
    })();
    BufferSystem.WeaponBuffer = WeaponBuffer;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=WeaponBuffer.js.map