/**
 * Created by salva-pc on 24/03/15.
 */
/// <reference path ="CdvToken.ts" />
var compiler;
(function (compiler) {
    /**
     * Clase que contiene todos lo estados posibles que hay plasmados en el grafo
     */
    var CdvGraphStates = (function () {
        function CdvGraphStates() {
        }
        /**
         * Funcion statica que nos devuelve el token segun el estado (sigue el grafo creado)
         * @param state estado alcanzado por el analizador lexico
         * @returns {number} tipo de token que hay en ese estado
         */
        CdvGraphStates.state2Token = function (state) {
            switch (state) {
                case CdvGraphStates.STATECOMA: return compiler.CdvToken.COMA;
                case CdvGraphStates.STATEPYC: return compiler.CdvToken.PYC;
                case CdvGraphStates.STATEPARI: return compiler.CdvToken.PARI;
                case CdvGraphStates.STATEPARD: return compiler.CdvToken.PARD;
                case CdvGraphStates.STATELLAVEI: return compiler.CdvToken.LLAVEI;
                case CdvGraphStates.STATELLAVED: return compiler.CdvToken.LLAVED;
                case CdvGraphStates.STATERELOP:
                case CdvGraphStates.STATERELOP1: return compiler.CdvToken.RELOP;
                case CdvGraphStates.STATEASIG: return compiler.CdvToken.ASIG;
                case CdvGraphStates.STATEDESPI: return compiler.CdvToken.DESPI;
                case CdvGraphStates.STATENENTERO1:
                case CdvGraphStates.STATENENTERO2: return compiler.CdvToken.NENTERO;
                case CdvGraphStates.STATENREAL: return compiler.CdvToken.NREAL;
                case CdvGraphStates.STATEID: return compiler.CdvToken.ID;
                case CdvGraphStates.STATEAND: return compiler.CdvToken.AND;
                case CdvGraphStates.STATEOR: return compiler.CdvToken.OR;
                case CdvGraphStates.STATECORI: return compiler.CdvToken.CORI;
                case CdvGraphStates.STATECORD: return compiler.CdvToken.CORD;
            }
        };
        // Estado final (99)
        CdvGraphStates.STATEEND = 99;
        // Estado inicial (0)
        CdvGraphStates.STATEINIT = 0;
        // Transicion de > (-1)
        CdvGraphStates.TRANSRELOP1 = -1;
        // Transicion de = (-2)
        CdvGraphStates.TRANSRELOP2 = -2;
        // Transicion de ! -(3)
        CdvGraphStates.TRANSRELOP3 = -3;
        // Transicion de < (-4)
        CdvGraphStates.TRANSRELOP4 = -4;
        // Transicion de Numero (-5)
        CdvGraphStates.TRANSNUM = -5;
        // Transicion de Numero (-6)
        CdvGraphStates.TRANSNENTERO = -6;
        // Transicion de Numero (-7)
        CdvGraphStates.TRANSNREAL = -7;
        // Transicion de ID (-8)
        CdvGraphStates.TRANSID = -8;
        // Transicion de & (-9)
        CdvGraphStates.TRANSAND = -9;
        // Transicion de | (-10)
        CdvGraphStates.TRANSOR = -10;
        // Estado COMA aceptado (1)
        CdvGraphStates.STATECOMA = 1;
        // Estado PYC aceptado (2)
        CdvGraphStates.STATEPYC = 2;
        // Estado PARI aceptado (3)
        CdvGraphStates.STATEPARI = 3;
        // Estado PARD aceptado (4)
        CdvGraphStates.STATEPARD = 4;
        // Estado LLAVEI aceptado (5)
        CdvGraphStates.STATELLAVEI = 5;
        // Estado LLAVED aceptado (6)
        CdvGraphStates.STATELLAVED = 6;
        // Estado RELOP* aceptado (7)
        CdvGraphStates.STATERELOP1 = 7;
        // Estado RELOP aceptado (8)
        CdvGraphStates.STATERELOP = 8;
        // Estado ASIG aceptado (9)
        CdvGraphStates.STATEASIG = 9;
        // Estado DESPI aceptado (10)
        CdvGraphStates.STATEDESPI = 10;
        // Estado NENTERO* aceptado (11)
        CdvGraphStates.STATENENTERO1 = 11;
        // Estado NENTERO** aceptado (12)
        CdvGraphStates.STATENENTERO2 = 12;
        // Estado NREAL* aceptado (13)
        CdvGraphStates.STATENREAL = 13;
        // Estado ID aceptado (14)
        CdvGraphStates.STATEID = 14;
        // Estado AND aceptado (15)
        CdvGraphStates.STATEAND = 15;
        // Estado OR aceptado (16)
        CdvGraphStates.STATEOR = 16;
        // Estado CORI aceptado (17)
        CdvGraphStates.STATECORI = 17;
        // Estado CORD aceptado (18)
        CdvGraphStates.STATECORD = 18;
        return CdvGraphStates;
    })();
    compiler.CdvGraphStates = CdvGraphStates;
})(compiler || (compiler = {}));
//# sourceMappingURL=CdvGraphStates.js.map