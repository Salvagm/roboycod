/**
 * Created by javi on 17/08/15.
 * Clase para gestionar los CDVs que tiene el jugador
 */
///<reference path="../cdvs/CdvLogic.ts"/>
var Roboycod;
(function (Roboycod) {
    var CdvMatrix = (function () {
        function CdvMatrix(data) {
            //	Constants
            this.ROWS = 4;
            this.COLS = 5;
            if (data === undefined) {
                this.data = [];
                for (var i = 0; i < this.ROWS; ++i) {
                    this.data[i] = [];
                }
            }
            else {
                //creamos los objetos para que tengan funciones de la clase
                this.data = data;
                var item;
                for (var i = 0; i < this.ROWS; i++) {
                    for (var j = 0; j < this.COLS; j++) {
                        item = this.data[i][j];
                        if (item !== undefined) {
                            this.data[i][j] = new Roboycod.CdvLogic(item);
                        }
                    }
                }
            }
        }
        /**
         * Trata de anyadir un cdv a la matriz de inventario
         * @param cdv el elemento a anyadir
         * @returns {boolean} si pudo anyadirlo o no
         */
        CdvMatrix.prototype.add = function (cdv) {
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
        CdvMatrix.prototype.getEquiped = function () {
            var list = [];
            for (var i = 0; i < this.ROWS; i++) {
                for (var j = 0; j < this.COLS; j++) {
                    if (this.data[i][j] !== undefined) {
                        if (this.data[i][j].isSelected) {
                            list.push(this.data[i][j]);
                        }
                    }
                }
            }
            return list;
        };
        return CdvMatrix;
    })();
    Roboycod.CdvMatrix = CdvMatrix;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvMatrix.js.map