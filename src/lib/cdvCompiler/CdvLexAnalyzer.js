/**
 * Created by salva-pc on 23/03/15.
 */
///<reference path ="CdvToken.ts" />
var compiler;
(function (compiler) {
    var CdvLexAnalyzer = (function () {
        /**
         * Constructor de la clase analizador Lexico
         * En caso de que se llame lanzara error
         * Inicializa la tabla que recibe la cadena de la palabra reservada y devuelve el token
         */
        function CdvLexAnalyzer() {
            if (!CdvLexAnalyzer.canInstantiate)
                throw Error("Fail to instantiate, use CdvLexAnalyzer.getInstance(code) instead");
            CdvLexAnalyzer.id2Reserved["float"] = compiler.CdvToken.FLOAT;
            CdvLexAnalyzer.id2Reserved["int"] = compiler.CdvToken.INT;
            CdvLexAnalyzer.id2Reserved["char"] = compiler.CdvToken.CHAR;
            CdvLexAnalyzer.id2Reserved["bool"] = compiler.CdvToken.BOOL;
            CdvLexAnalyzer.id2Reserved["cout"] = compiler.CdvToken.COUT;
            CdvLexAnalyzer.id2Reserved["endl"] = compiler.CdvToken.ENDL;
            CdvLexAnalyzer.id2Reserved["if"] = compiler.CdvToken.IF;
            CdvLexAnalyzer.id2Reserved["true"] = compiler.CdvToken.TRUE;
            CdvLexAnalyzer.id2Reserved["false"] = compiler.CdvToken.FALSE;
            CdvLexAnalyzer.char2Type[','] = compiler.CdvToken.COMA;
            CdvLexAnalyzer.char2Type[';'] = compiler.CdvToken.PYC;
            CdvLexAnalyzer.char2Type['('] = compiler.CdvToken.PARI;
            CdvLexAnalyzer.char2Type[')'] = compiler.CdvToken.PARD;
            CdvLexAnalyzer.char2Type['{'] = compiler.CdvToken.LLAVEI;
            CdvLexAnalyzer.char2Type['}'] = compiler.CdvToken.LLAVED;
            CdvLexAnalyzer.char2Type['['] = compiler.CdvToken.CORI;
            CdvLexAnalyzer.char2Type[']'] = compiler.CdvToken.CORD;
            CdvLexAnalyzer.char2Type['>'] = -1; // estado de transicion
            CdvLexAnalyzer.char2Type['='] = -2; // estado de transicion
            CdvLexAnalyzer.char2Type['!'] = -3; // estado de transicion
            CdvLexAnalyzer.char2Type['<'] = -4; // estado de transicion
            CdvLexAnalyzer.char2Type['&'] = -9; // estado de transicion
            CdvLexAnalyzer.char2Type['|'] = -10; // estado de transicion
            //CdvLexAnalyzer.char2Type[','] = 1;
            //CdvLexAnalyzer.char2Type[','] = 1;
            //CdvLexAnalyzer.char2Type[','] = 1;
            CdvLexAnalyzer._instance = this;
        }
        /**
         * Inizializa el Analizador lexico en base a un codigo que recibe
         * @param codigo codigo a analizar
         */
        CdvLexAnalyzer.prototype.initialiceAnaLex = function (codigo) {
            this.code = codigo;
            this.currenRow = 1;
            this.currentCol = 0;
            this.currentPos = 0;
            this.endCodePos = codigo.length;
        };
        /**
         * Recoge la instancia actual del analizador, si existe de antes devuelve esa instancia
         * @param codigo codigo que queremos analizar
         * @returns {CdvLexAnalyzer} devuelve el objeto de tipo LexAnalyzer, solo lo crea una vez
         */
        CdvLexAnalyzer.getInstance = function (codigo) {
            if (CdvLexAnalyzer._instance === null) {
                CdvLexAnalyzer.canInstantiate = true;
                CdvLexAnalyzer._instance = new CdvLexAnalyzer();
                CdvLexAnalyzer._instance.initialiceAnaLex(codigo);
                CdvLexAnalyzer.canInstantiate = false;
                console.log(this.id2Reserved["endl"]);
            }
            return CdvLexAnalyzer._instance;
        };
        /**
         * Obtiene el caracter de la cadena de codigo
         * @returns {string} devuelve el caracter
         */
        CdvLexAnalyzer.prototype.getNextChar = function () {
            var character = "";
            if (this.currentPos < this.endCodePos - 1) {
                character = this.code.charAt(this.currentPos);
                ++this.currentPos;
                ++this.currentCol;
            }
            else if (this.currentPos == this.endCodePos - 1) {
                character = "$";
            }
            return character;
        };
        /**
         * Buscamos el siguientes token
         * @returns {CdvToken} devuelve el token formado
         */
        CdvLexAnalyzer.prototype.nextToken = function () {
            this.token = new compiler.CdvToken();
            this.graphState = 0;
            var char = "";
            while (this.graphState <= 0) {
                char = this.getNextChar();
                this.delta(this.graphState, char);
            }
            return this.token;
        };
        /**
         * Funcion con la que realizamos las transiciones en el grafo
         * @param state estado acutal en el grafo
         * @param char caracter que recibimos
         */
        CdvLexAnalyzer.prototype.delta = function (state, char) {
            switch (state) {
                case CdvLexAnalyzer.STATEINIT:
                    this.token.column = this.currentCol;
                    this.graphState = this.updateState(char);
                    break;
                case CdvLexAnalyzer.TRANSRELOP1:
                    this.graphState = this.moreEqual(char);
                    break;
                case CdvLexAnalyzer.TRANSRELOP2:
                    this.graphState = this.equal(char);
                    break;
                case CdvLexAnalyzer.TRANSRELOP3:
                    this.graphState = this.lessEqual(char);
                    break;
                case CdvLexAnalyzer.TRANSRELOP4:
                    this.graphState = this.notEqual(char);
                    break;
                case CdvLexAnalyzer.TRANSAND:
                    break;
                case CdvLexAnalyzer.TRANSOR:
                    break;
            }
        };
        /**
         * Funcion que le pasamos un caracter y devuelve el estado asociado a dicho caracter
         * Utilizamos la tabla estatica que del caracter leido obtenemos el tipo de token
         * @param char caractar leido actual
         * @returns {number} numero del estado en el que se encuentra
         */
        CdvLexAnalyzer.prototype.updateState = function (char) {
            this.token.lexeme += char;
            this.token.type = CdvLexAnalyzer.char2Type[char];
            return this.token.type;
        };
        CdvLexAnalyzer.prototype.moreEqual = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return 8;
            }
            else {
                --this.currentPos;
                this.token.type = compiler.CdvToken.RELOP;
                return 7;
            }
        };
        CdvLexAnalyzer.prototype.lessEqual = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return 8;
            }
            else if (char === "<") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.DESPI;
                return 10;
            }
            else {
                --this.currentPos;
                this.token.type = compiler.CdvToken.RELOP;
                return 7;
            }
        };
        CdvLexAnalyzer.prototype.equal = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return 8;
            }
            else {
                --this.currentPos;
                this.token.type = compiler.CdvToken.ASIG;
                return 9;
            }
        };
        // TODO MIRAR TEMA DE DETENER EJECUCION
        // TODO MIRAR WEB WORKERS
        CdvLexAnalyzer.prototype.notEqual = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return 8;
            }
            else {
                --this.currentPos;
                throw new Error("Erros Lexico:");
            }
        };
        // booleano interno de la clase para controlar la instanciacion del objeto
        CdvLexAnalyzer.canInstantiate = false;
        // objeto estatico de tio CdvLexAnalyer el cual se inicializa solo una vez (patron singleton)
        CdvLexAnalyzer._instance = null;
        // Array asociativo el cual le pasamos el lexema que se ha formado para comprobar si es una palabra reservada
        CdvLexAnalyzer.id2Reserved = {};
        // Array asociativo que pasa del caracter leido a un estado del grafo
        CdvLexAnalyzer.char2Type = {};
        CdvLexAnalyzer.STATEINIT = 0;
        // Transicion de >
        CdvLexAnalyzer.TRANSRELOP1 = -1;
        // Transicion de =
        CdvLexAnalyzer.TRANSRELOP2 = -2;
        // Transicion de !
        CdvLexAnalyzer.TRANSRELOP3 = -3;
        // Transicion de <
        CdvLexAnalyzer.TRANSRELOP4 = -4;
        // Transicion de &
        CdvLexAnalyzer.TRANSAND = -9;
        // Transicion de |
        CdvLexAnalyzer.TRANSOR = -10;
        return CdvLexAnalyzer;
    })();
    compiler.CdvLexAnalyzer = CdvLexAnalyzer;
})(compiler || (compiler = {}));
//# sourceMappingURL=CdvLexAnalyzer.js.map