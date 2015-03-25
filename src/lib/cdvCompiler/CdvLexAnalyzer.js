/**
 * Created by salva-pc on 23/03/15.
 */
///<reference path ="CdvToken.ts" />
///<reference path ="CdvgraphStates.ts" />
var compiler;
(function (compiler) {
    // TODO MIRAR WEB WORKERS
    /**
     * Clase encargada de analizar el lexico del codigo que queremos interpretar
     */
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
            CdvLexAnalyzer.id2Reserved["void"] = compiler.CdvToken.VOID;
            CdvLexAnalyzer.id2Reserved["if"] = compiler.CdvToken.IF;
            CdvLexAnalyzer.id2Reserved["true"] = compiler.CdvToken.TRUE;
            CdvLexAnalyzer.id2Reserved["false"] = compiler.CdvToken.FALSE;
            CdvLexAnalyzer.char2State[','] = compiler.CdvGraphStates.STATECOMA;
            CdvLexAnalyzer.char2State[';'] = compiler.CdvGraphStates.STATEPYC;
            CdvLexAnalyzer.char2State['('] = compiler.CdvGraphStates.STATEPARI;
            CdvLexAnalyzer.char2State[')'] = compiler.CdvGraphStates.STATEPARD;
            CdvLexAnalyzer.char2State['{'] = compiler.CdvGraphStates.STATELLAVEI;
            CdvLexAnalyzer.char2State['}'] = compiler.CdvGraphStates.STATELLAVED;
            CdvLexAnalyzer.char2State['['] = compiler.CdvGraphStates.STATECORI;
            CdvLexAnalyzer.char2State[']'] = compiler.CdvGraphStates.STATECORD;
            // Estados transicionales
            CdvLexAnalyzer.char2State['>'] = compiler.CdvGraphStates.TRANSRELOP1;
            CdvLexAnalyzer.char2State['='] = compiler.CdvGraphStates.TRANSRELOP2;
            CdvLexAnalyzer.char2State['!'] = compiler.CdvGraphStates.TRANSRELOP3;
            CdvLexAnalyzer.char2State['<'] = compiler.CdvGraphStates.TRANSRELOP4;
            CdvLexAnalyzer.char2State['&'] = compiler.CdvGraphStates.TRANSAND;
            CdvLexAnalyzer.char2State['|'] = compiler.CdvGraphStates.TRANSOR;
            CdvLexAnalyzer._instance = this;
        }
        /**
         * Inizializa el Analizador lexico en base a un codigo que recibe
         * @param codigo codigo a analizar
         */
        CdvLexAnalyzer.prototype.AnalyzeCode = function (codigo) {
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
        CdvLexAnalyzer.getInstance = function () {
            if (CdvLexAnalyzer._instance === null) {
                CdvLexAnalyzer.canInstantiate = true;
                CdvLexAnalyzer._instance = new CdvLexAnalyzer();
                CdvLexAnalyzer.canInstantiate = false;
            }
            return CdvLexAnalyzer._instance;
        };
        /**
         * Obtiene el caracter de la cadena de codigo
         * @returns {string} devuelve el caracter
         */
        CdvLexAnalyzer.prototype.getNextChar = function () {
            var character = "";
            if (this.currentPos < this.endCodePos) {
                character = this.code.charAt(this.currentPos);
                ++this.currentPos;
                ++this.currentCol;
            }
            else if (this.currentPos >= this.endCodePos) {
                character = "$";
            }
            if (character === "\n") {
                this.currentCol = 0;
                ++this.currenRow;
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
            if (this.token.type === compiler.CdvToken.ID) {
                var newType = CdvLexAnalyzer.id2Reserved[this.token.lexeme];
                if (newType !== undefined)
                    this.token.type = newType;
            }
            this.token.row = this.currenRow;
            return this.token;
        };
        /**
         * Funcion con la que realizamos las transiciones en el grafo
         * @param state estado acutal en el grafo
         * @param char caracter que recibimos
         */
        CdvLexAnalyzer.prototype.delta = function (state, char) {
            switch (state) {
                case compiler.CdvGraphStates.STATEINIT:
                    this.graphState = this.updateState(char);
                    break;
                case compiler.CdvGraphStates.TRANSRELOP1:
                    this.graphState = this.moreEqualOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSRELOP2:
                    this.graphState = this.equalOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSRELOP3:
                    this.graphState = this.notEqualOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSRELOP4:
                    this.graphState = this.lessEqualOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSAND:
                    this.graphState = this.andOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSOR:
                    this.graphState = this.orOpe(char);
                    break;
                case compiler.CdvGraphStates.TRANSID:
                    this.graphState = this.generateID(char);
                    break;
                case compiler.CdvGraphStates.TRANSNUM:
                    this.graphState = this.digit(char);
                    break;
                case compiler.CdvGraphStates.TRANSNENTERO:
                    this.graphState = this.intDigit(char);
                    break;
                case compiler.CdvGraphStates.TRANSNREAL:
                    this.graphState = this.realDigi(char);
                    break;
                default:
                    throw new Error("Error Lexico (fila: " + this.token.row + ", columna: " + this.token.column + "): Caracter " + char + " invalido");
            }
        };
        /**
         * Funcion que le pasamos un caracter y devuelve el estado asociado a dicho caracter
         * Utilizamos la funcion de graphState que nos devuelve el token en funcion del estado
         * El estado lo obtenemos mediante la tabla que pasa del caracter leido al estado (solo para unos pocos)
         * @param char caractar leido actual
         * @returns {number} numero del estado en el que se encuentra
         */
        CdvLexAnalyzer.prototype.updateState = function (char) {
            this.token.column = this.currentCol;
            if (char >= "0" && char <= "9") {
                this.token.lexeme += char;
                return compiler.CdvGraphStates.TRANSNUM;
            }
            else if (char >= "a" && char <= "z" || char >= "A" && char <= "Z") {
                this.token.lexeme += char;
                return compiler.CdvGraphStates.TRANSID;
            }
            else if (char === "\t" || char === "\n" || char === " ") {
                if (char === "\t") {
                    this.currentCol += 3;
                    this.token.column = this.currentCol;
                }
                return compiler.CdvGraphStates.STATEINIT;
            }
            else if (char === "$") {
                this.token.type = compiler.CdvToken.EOF;
                this.token.lexeme = char;
                return compiler.CdvGraphStates.STATEEND;
            }
            else if (CdvLexAnalyzer.char2State[char] !== undefined) {
                this.token.lexeme += char;
                this.token.type = compiler.CdvGraphStates.state2Token(CdvLexAnalyzer.char2State[char]);
                return CdvLexAnalyzer.char2State[char];
            }
            else
                throw new Error("Error Lexico (fila: " + this.token.row + ", columna: " + this.token.column + "): Caracter " + char + " invalido");
        };
        /**
         * Comprueba operaciones >=
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop)
         */
        CdvLexAnalyzer.prototype.moreEqualOpe = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP;
            }
            else {
                --this.currentPos;
                --this.currentCol;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP1;
            }
        };
        /**
         * Comprueba operacion <= u operaciones <<
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop o despi)
         */
        CdvLexAnalyzer.prototype.lessEqualOpe = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP;
            }
            else if (char === "<") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.DESPI;
                return compiler.CdvGraphStates.STATEDESPI;
            }
            else {
                --this.currentPos;
                --this.currentCol;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP1;
            }
        };
        /**
         * Comprueba operacion ==
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop o asig)
         */
        CdvLexAnalyzer.prototype.equalOpe = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP;
            }
            else {
                --this.currentPos;
                --this.currentCol;
                this.token.type = compiler.CdvToken.ASIG;
                return compiler.CdvGraphStates.STATEASIG;
            }
        };
        /**
         * Comprueba operacion !=
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter ( estado relop) o corta ejecucion lanzando error
         */
        CdvLexAnalyzer.prototype.notEqualOpe = function (char) {
            if (char === "=") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.RELOP;
                return compiler.CdvGraphStates.STATERELOP;
            }
            else {
                --this.currentPos;
                --this.currentCol;
                throw new Error("Error Lexico (fila: " + this.token.row + ", columna: " + this.token.column + "): Caracter " + char + " invalido");
            }
        };
        /**
         * Genera el que ha comenzado por una letras en minuscula o mayuscula
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado ID o TRANSID)
         */
        CdvLexAnalyzer.prototype.generateID = function (char) {
            if (char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9") {
                this.token.lexeme += char;
                return compiler.CdvGraphStates.TRANSID;
            }
            this.token.type = compiler.CdvToken.ID;
            --this.currentPos;
            --this.currentCol;
            return compiler.CdvGraphStates.STATEID;
        };
        /**
         * Comprueba si es operacion &&
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado AND) o corta ejecucion lanzando error
         */
        CdvLexAnalyzer.prototype.andOpe = function (char) {
            if (char === "&") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.AND;
                return compiler.CdvGraphStates.STATEAND;
            }
            throw new Error("Error Lexico (fila: " + this.token.row + ", columna: " + this.token.column + "): Caracter " + char + " invalido");
        };
        /**
         * Comprueba si es operacion ||
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado OR) o corta ejecucion y lanza error
         */
        CdvLexAnalyzer.prototype.orOpe = function (char) {
            if (char === "|") {
                this.token.lexeme += char;
                this.token.type = compiler.CdvToken.OR;
                return compiler.CdvGraphStates.STATEOR;
            }
            throw new Error("Error Lexico (fila: " + this.token.row + ", columna: " + this.token.column + "): Caracter " + char + " invalido");
        };
        /**
         * Comprueba si lo que esta leyendo es un numero (entero o real)
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSNUM, TRANSNENTERO NENTERO1)
         */
        CdvLexAnalyzer.prototype.digit = function (char) {
            if (char >= "0" && char <= "9") {
                this.token.lexeme += char;
                return compiler.CdvGraphStates.TRANSNUM;
            }
            else if (char === ".") {
                return compiler.CdvGraphStates.TRANSNENTERO;
            }
            else {
                this.token.type = compiler.CdvToken.NENTERO;
                --this.currentPos;
                --this.currentCol;
                return compiler.CdvGraphStates.STATENENTERO1;
            }
        };
        /**
         * Comprueba si lo que esta leyendo es un numero entero o real
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSREAL o NENTERO2)
         */
        CdvLexAnalyzer.prototype.intDigit = function (char) {
            if (char >= "0" && char <= "9") {
                this.token.lexeme += "." + char;
                return compiler.CdvGraphStates.TRANSNREAL;
            }
            this.currentPos -= 2;
            this.currentCol -= 2;
            this.token.type = compiler.CdvToken.NENTERO;
            return compiler.CdvGraphStates.STATENENTERO2;
        };
        /**
         * Comprueba si lo que esta leyendo es un numero real
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSREAL o NREAL)
         */
        CdvLexAnalyzer.prototype.realDigi = function (char) {
            if (char >= "0" && char <= "9") {
                this.token.lexeme += char;
                return compiler.CdvGraphStates.TRANSNREAL;
            }
            --this.currentPos;
            --this.currentCol;
            this.token.type = compiler.CdvToken.NREAL;
            return compiler.CdvGraphStates.STATENREAL;
        };
        // booleano interno de la clase para controlar la instanciacion del objeto
        CdvLexAnalyzer.canInstantiate = false;
        // objeto estatico de tio CdvLexAnalyer el cual se inicializa solo una vez (patron singleton)
        CdvLexAnalyzer._instance = null;
        // Array asociativo el cual le pasamos el lexema que se ha formado para comprobar si es una palabra reservada
        CdvLexAnalyzer.id2Reserved = {};
        // Array asociativo que pasa del caracter leido a un estado del grafo
        CdvLexAnalyzer.char2State = {};
        return CdvLexAnalyzer;
    })();
    compiler.CdvLexAnalyzer = CdvLexAnalyzer;
})(compiler || (compiler = {}));
//# sourceMappingURL=CdvLexAnalyzer.js.map