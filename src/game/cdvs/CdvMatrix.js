/**
 * Created by javi on 17/08/15.
 * Clase para gestionar los CDVs que tiene el jugador
 */
///<reference path="../cdvs/CdvLogic.ts"/>
var Roboycod;
(function (Roboycod) {
    var CdvMatrix = (function () {
        function CdvMatrix() {
            //	Constants
            this.ROWS = 4;
            this.COLS = 5;
            this.matrix = [];
            for (var i = 0; i < this.ROWS; ++i) {
                this.matrix[i] = [];
            }
        }
        CdvMatrix.prototype.add = function (cdv) {
            return true;
        };
        return CdvMatrix;
    })();
    Roboycod.CdvMatrix = CdvMatrix;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvMatrix.js.map