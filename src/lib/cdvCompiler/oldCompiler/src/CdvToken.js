/**
 * Created by salva-pc on 23/03/15.
 */
/**
 * Modulo principal al que pertenece el interpete del lenguaje utilizado en el juego
 * En este modulo se implementan las clases necesarias para:
 * 1-Comprobar la estructura lexica del programa
 * 2-Comprobar la estructura sintactica
 * 3-Traducir el codigo a javascript
 * 4-Realizar ejecuciones del codigo generado
 *
 */
var compiler;
(function (compiler) {
    /**
     * Clase contenedora del token que hemos leido
     */
    var CdvToken = (function () {
        /**
         * Constructor de la clase CdvToken
         */
        function CdvToken() {
            this.column = this.row = 0;
            this.type = 0;
            this.lexeme = "";
        }
        /**
         * Devuelve la cadena en base al tipo actual del token
         * @returns {string} cadena del tipo
         */
        CdvToken.prototype.toString = function () {
            var cad = CdvToken.tok2Str[this.type];
            if (cad === undefined)
                cad = null;
            return cad;
        };
        /**
         * Statico que en funcion del tipo que recibe devuelve la cadena correspondiente
         * @param tipo tipo de token
         * @returns {string} cadena del tipo
         */
        CdvToken.toString = function (tipo) {
            var cad = CdvToken.tok2Str[tipo];
            if (cad === undefined)
                cad = null;
            return cad;
        };
        // Token ( (0)
        CdvToken.PARI = 0;
        // Token ) (1)
        CdvToken.PARD = 1;
        // Token [ (2)
        CdvToken.CORI = 2;
        // Token ] (3)
        CdvToken.CORD = 3;
        // Token { (4)
        CdvToken.LLAVEI = 4;
        // Token } (5)
        CdvToken.LLAVED = 5;
        // Token < | > | <= | >= | == |!= (6)
        CdvToken.RELOP = 6;
        // Token ; (7)
        CdvToken.PYC = 7;
        // Token , (8)
        CdvToken.COMA = 8;
        // Token = (9)
        CdvToken.ASIG = 9;
        // Token and (10)
        CdvToken.AND = 10;
        // Token or (11)
        CdvToken.OR = 11;
        // Token numreal (12)
        CdvToken.NREAL = 12;
        // Token numEntero (13)
        CdvToken.NENTERO = 13;
        // Token int (14)
        CdvToken.INT = 14;
        // Token float (15)
        CdvToken.FLOAT = 15;
        // Token 16 (char)
        CdvToken.CHAR = 16;
        // Token bool (17)
        CdvToken.BOOL = 17;
        // Token void (18)
        CdvToken.VOID = 18;
        // Token cout (19)
        CdvToken.COUT = 19;
        // Token << (20)
        CdvToken.DESPI = 20;
        // Token endl(21)
        CdvToken.ENDL = 21;
        // Token true (22)
        CdvToken.TRUE = 22;
        // Token false (23)
        CdvToken.FALSE = 23;
        // Token if (24)
        CdvToken.IF = 24;
        // Token identificador (25)
        CdvToken.ID = 25;
        // Token + - (26)
        CdvToken.ADDOP = 26;
        // Token * / % (27)
        CdvToken.MULOP = 27;
        //TODO ADD NEW TOKEN IN NEXT STEPS
        // Token final fichero (26)
        CdvToken.EOF = 28;
        // Array que pasa del tipo numérico del token a la cadena asociada
        CdvToken.tok2Str = ["(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "< | > | <= | >= | == | !=",
            ";",
            ",",
            "=",
            "&&",
            "||",
            "nreal",
            "nentero",
            "int",
            "float",
            "char",
            "bool",
            "void",
            "cout",
            "<<",
            "endl",
            "true",
            "false",
            "if",
            "identificador",
            "+ | -",
            "/ | * | %",
            "fin de fichero"];
        return CdvToken;
    })();
    compiler.CdvToken = CdvToken;
})(compiler || (compiler = {}));
//# sourceMappingURL=CdvToken.js.map