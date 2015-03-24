/**
 * Created by salva-pc on 23/03/15.
 */
var compiler;
(function (compiler) {
    var CdvToken = (function () {
        function CdvToken() {
            this.column = this.row = 0;
            this.type = 0;
            this.lexeme = "";
            //this.Tok2Str =
        }
        CdvToken.prototype.toString = function () {
            var cad = CdvToken.tok2Str[this.type];
            if (cad === undefined)
                cad = null;
            return cad;
        };
        CdvToken.toString = function (tipo) {
            var cad = CdvToken.tok2Str[tipo];
            if (cad === undefined)
                cad = null;
            return cad;
        };
        CdvToken.PARI = 0;
        CdvToken.PARD = 1;
        CdvToken.CORI = 2;
        CdvToken.CORD = 3;
        CdvToken.LLAVEI = 4;
        CdvToken.LLAVED = 5;
        CdvToken.RELOP = 6;
        CdvToken.PYC = 7;
        CdvToken.COMA = 8;
        CdvToken.ASIG = 9;
        CdvToken.AND = 10;
        CdvToken.OR = 11;
        CdvToken.NREAL = 12;
        CdvToken.NENTERO = 13;
        CdvToken.INT = 14;
        CdvToken.FLOAT = 15;
        CdvToken.CHAR = 16;
        CdvToken.BOOL = 17;
        CdvToken.VOID = 18;
        CdvToken.COUT = 19;
        CdvToken.DESPI = 20;
        CdvToken.ENDL = 21;
        CdvToken.TRUE = 22;
        CdvToken.FALSE = 23;
        CdvToken.IF = 24;
        CdvToken.ID = 25;
        //TODO ADD NEW TOKEN IN NEXT STEPS
        CdvToken.EOF = 26;
        CdvToken.tok2Str = ["(", ")", "[", "]", "{", "}", "< | > | <= | >= | == | !=", ";", ",", "=", "&&", "||", "nreal", "nentero", "int", "float", "char", "bool", "void", "cout", "<<", "endl", "true", "false", "if", "identificador", "fin de fichero"];
        return CdvToken;
    })();
    compiler.CdvToken = CdvToken;
})(compiler || (compiler = {}));
//# sourceMappingURL=CdvToken.js.map