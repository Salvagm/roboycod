/**
 * Created by salva-pc on 24/03/15.
 */
/// <reference path ="CdvToken.ts" />
module compiler {

    /**
     * Clase que contiene todos lo estados posibles que hay plasmados en el grafo
     */
    export class CdvGraphStates {

        // Estado final (99)
        public static STATEEND      : number = 99;
        // Estado inicial (0)
        public static STATEINIT     : number = 0;
        // Transicion de > (-1)
        public static TRANSRELOP1   : number = -1;
        // Transicion de = (-2)
        public static TRANSRELOP2   : number = -2;
        // Transicion de ! -(3)
        public static TRANSRELOP3   : number = -3;
        // Transicion de < (-4)
        public static TRANSRELOP4   : number = -4;
        // Transicion de Numero (-5)
        public static TRANSNUM      : number = -5;
        // Transicion de Numero (-6)
        public static TRANSNENTERO  : number = -6;
        // Transicion de Numero (-7)
        public static TRANSNREAL    : number = -7;
        // Transicion de ID (-8)
        public static TRANSID       : number = -8;
        // Transicion de & (-9)
        public static TRANSAND      : number = -9;
        // Transicion de | (-10)
        public static TRANSOR       : number = -10;

        // Estado COMA aceptado (1)
        public static STATECOMA     : number = 1;
        // Estado PYC aceptado (2)
        public static STATEPYC      : number = 2;
        // Estado PARI aceptado (3)
        public static STATEPARI     : number = 3;
        // Estado PARD aceptado (4)
        public static STATEPARD     : number = 4;
        // Estado LLAVEI aceptado (5)
        public static STATELLAVEI   : number = 5;
        // Estado LLAVED aceptado (6)
        public static STATELLAVED   : number = 6;
        // Estado RELOP* aceptado (7)
        public static STATERELOP1   : number = 7;
        // Estado RELOP aceptado (8)
        public static STATERELOP    : number = 8;
        // Estado ASIG aceptado (9)
        public static STATEASIG     : number = 9;
        // Estado DESPI aceptado (10)
        public static STATEDESPI    : number = 10;
        // Estado NENTERO* aceptado (11)
        public static STATENENTERO1 : number = 11;
        // Estado NENTERO** aceptado (12)
        public static STATENENTERO2 : number = 12;
        // Estado NREAL* aceptado (13)
        public static STATENREAL    : number = 13;
        // Estado ID aceptado (14)
        public static STATEID       : number = 14;
        // Estado AND aceptado (15)
        public static STATEAND      : number = 15;
        // Estado OR aceptado (16)
        public static STATEOR       : number = 16;
        // Estado CORI aceptado (17)
        public static STATECORI     : number = 17;
        // Estado CORD aceptado (18)
        public static STATECORD     : number = 18;


        /**
         * Funcion statica que nos devuelve el token segun el estado (sigue el grafo creado)
         * @param state estado alcanzado por el analizador lexico
         * @returns {number} tipo de token que hay en ese estado
         */
        public static state2Token(state : number ) : number
        {
            switch (state)
            {
                case CdvGraphStates.STATECOMA: return CdvToken.COMA;
                case CdvGraphStates.STATEPYC: return CdvToken.PYC;
                case CdvGraphStates.STATEPARI: return CdvToken.PARI;
                case CdvGraphStates.STATEPARD: return CdvToken.PARD;
                case CdvGraphStates.STATELLAVEI: return CdvToken.LLAVEI;
                case CdvGraphStates.STATELLAVED: return CdvToken.LLAVED;
                case CdvGraphStates.STATERELOP:
                case CdvGraphStates.STATERELOP1: return CdvToken.RELOP;
                case CdvGraphStates.STATEASIG: return CdvToken.ASIG;
                case CdvGraphStates.STATEDESPI: return CdvToken.DESPI;
                case CdvGraphStates.STATENENTERO1:
                case CdvGraphStates.STATENENTERO2: return CdvToken.NENTERO;
                case CdvGraphStates.STATENREAL: return CdvToken.NREAL;
                case CdvGraphStates.STATEID: return CdvToken.ID;
                case CdvGraphStates.STATEAND: return CdvToken.AND;
                case CdvGraphStates.STATEOR: return CdvToken.OR;
                case CdvGraphStates.STATECORI: return CdvToken.CORI;
                case CdvGraphStates.STATECORD: return CdvToken.CORD;
            }

        }


    }
}