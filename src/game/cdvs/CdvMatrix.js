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
            this.data = [];
            for (var i = 0; i < this.ROWS; ++i) {
                this.data[i] = [];
            }
        }
        /**
         * Trata de anyadir un cdv a la matriz de inventario
         * @param cdv el elemento a anyadir
         * @returns {boolean} si pudo anyadirlo o no
         */
        CdvMatrix.prototype.add = function (cdv) {
            console.log("Es tipo " + cdv.type);
            var row;
            switch (cdv.type) {
                case Roboycod.CdvLogic.TYPES[0]:
                    row = 0;
                    break;
                case Roboycod.CdvLogic.TYPES[1]:
                    row = 1;
                    break;
                case Roboycod.CdvLogic.TYPES[2]:
                    row = 2;
                    break;
                case Roboycod.CdvLogic.TYPES[3]:
                    row = 3;
                    break;
                default:
                    console.log("No existe el tipo de cdv a anyadir");
            }
            if (this.data[row].length < this.COLS) {
                this.data[row].push(cdv);
                return true;
            }
            return false;
        };
        return CdvMatrix;
    })();
    Roboycod.CdvMatrix = CdvMatrix;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvMatrix.js.map