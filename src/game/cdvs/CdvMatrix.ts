/**
 * Created by javi on 17/08/15.
 * Clase para gestionar los CDVs que tiene el jugador
 */
///<reference path="../cdvs/CdvLogic.ts"/>

module Roboycod{
    export class CdvMatrix {

        public data       : CdvLogic[][];

        //	Constants
        public ROWS            : number = 4;
        public COLS            : number = 5;

        constructor(data? : CdvLogic[][]){
            if(data === undefined)
            {
                this.data = [];
                for(var i = 0; i < this.ROWS;++i) {
                    this.data[i] = [];
                }
            }
            else{
                //creamos los objetos para que tengan funciones de la clase
                this.data = data;
                var item : CdvLogic;
                for(var i = 0; i < this.ROWS; i++){
                    for(var j = 0; j < this.COLS; j++) {
                        item = this.data[i][j];
                        if(item !==undefined){
                            this.data[i][j] = new CdvLogic(item);
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
        public getEquiped() : CdvLogic[]{
            var list : CdvLogic[] = [];

            for(var i = 0; i < this.ROWS; i++){
                for(var j = 0; j < this.COLS; j++){
                    if(this.data[i][j]!==undefined){
                        if(this.data[i][j].isSelected){
                            list.push(this.data[i][j]);
                        }
                    }
                }
            }

            return list;
        }

    }
}