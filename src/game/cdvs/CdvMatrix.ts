/**
 * Created by javi on 17/08/15.
 * Clase para gestionar los CDVs que tiene el jugador
 */
///<reference path="../cdvs/CdvLogic.ts"/>

module Roboycod{
    export class CdvMatrix {
        private matrix       : CdvLogic[][];

        //	Constants
        private ROWS            : number = 4;
        private COLS            : number = 5;

        constructor(){
            this.matrix = [];
            for(var i = 0; i < this.ROWS;++i) {
                this.matrix[i] = [];
            }
        }
        public add(cdv : CdvLogic) : boolean{
            return true;
        }
    }
}