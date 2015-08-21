/**
 * Created by javi on 17/08/15.
 * Clase para gestionar los CDVs que tiene el jugador
 */
///<reference path="../cdvs/CdvLogic.ts"/>

module Roboycod{
    export class CdvMatrix {

        public data       : CdvLogic[][];

        //	Constants
        private ROWS            : number = 4;
        private COLS            : number = 5;

        constructor(data? : CdvLogic[][]){
            if(data === undefined)
            {
                this.data = [];
                for(var i = 0; i < this.ROWS;++i) {
                    this.data[i] = [];
                }
            }
            else{
                this.data = data;
            }
        }
        /**
         * Trata de anyadir un cdv a la matriz de inventario
         * @param cdv el elemento a anyadir
         * @returns {boolean} si pudo anyadirlo o no
         */
        public add(cdv : CdvLogic) : boolean{
            var row : number;
            switch (cdv.type){
                case CdvLogic.TYPES[0] :
                    row = 0; break;
                case CdvLogic.TYPES[1] :
                    row = 1; break;
                case CdvLogic.TYPES[2] :
                    row = 2; break;
                case CdvLogic.TYPES[3] :
                    row = 3; break;
                default :
                    console.log("No existe el tipo de cdv a anyadir");
            }
            if(this.data[row].length < this.COLS){
                this.data[row].push(cdv);
                return true;
            }
            return false;
        }

    }
}