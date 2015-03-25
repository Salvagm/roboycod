/**
 * Created by salva-pc on 23/03/15.
 */

///<reference path ="CdvToken.ts" />
///<reference path ="CdvGraphStates.ts" />

module compiler
{
    // TODO MIRAR WEB WORKERS
    /**
     * Clase encargada de analizar el lexico del codigo que queremos interpretar
     */
    export class CdvLexAnalyzer
    {
        // codigo que le pasamos para que analice
        private code        : string;
        // posicion actual del puntero
        private currentPos  : number;
        // Colummna y Fila actuales en el codigo analizado
        private currentCol  : number;
        private currenRow   : number;
        //Posicion final del codigo
        private endCodePos  : number;
        //token a construir
        private token       : CdvToken;
        // Estado del actual del grafo
        private graphState  : number;
        // booleano interno de la clase para controlar la instanciacion del objeto
        private static canInstantiate   : boolean = false;
        // objeto estatico de tio CdvLexAnalyer el cual se inicializa solo una vez (patron singleton)
        private static _instance        : CdvLexAnalyzer = null;
        // Array asociativo el cual le pasamos el lexema que se ha formado para comprobar si es una palabra reservada
        private static id2Reserved      : {[lexema : string] :  number;} = {};
        // Array asociativo que pasa del caracter leido a un estado del grafo
        private static char2State        : {[char : string] : number;} = {};

        /**
         * Constructor de la clase analizador Lexico
         * En caso de que se llame lanzara error
         * Inicializa la tabla que recibe la cadena de la palabra reservada y devuelve el token
         */
        constructor()
        {
            if(!CdvLexAnalyzer.canInstantiate)
                throw Error("Fail to instantiate, use CdvLexAnalyzer.getInstance(code) instead");

            CdvLexAnalyzer.id2Reserved["float"] = CdvToken.FLOAT;
            CdvLexAnalyzer.id2Reserved["int"] = CdvToken.INT;
            CdvLexAnalyzer.id2Reserved["char"] = CdvToken.CHAR;
            CdvLexAnalyzer.id2Reserved["bool"] = CdvToken.BOOL;
            CdvLexAnalyzer.id2Reserved["cout"] = CdvToken.COUT;
            CdvLexAnalyzer.id2Reserved["endl"] = CdvToken.ENDL;
            CdvLexAnalyzer.id2Reserved["void"] = CdvToken.VOID;
            CdvLexAnalyzer.id2Reserved["if"] = CdvToken.IF;
            CdvLexAnalyzer.id2Reserved["true"] = CdvToken.TRUE;
            CdvLexAnalyzer.id2Reserved["false"] = CdvToken.FALSE;

            CdvLexAnalyzer.char2State[','] = CdvGraphStates.STATECOMA;
            CdvLexAnalyzer.char2State[';'] = CdvGraphStates.STATEPYC;
            CdvLexAnalyzer.char2State['('] = CdvGraphStates.STATEPARI;
            CdvLexAnalyzer.char2State[')'] = CdvGraphStates.STATEPARD;
            CdvLexAnalyzer.char2State['{'] = CdvGraphStates.STATELLAVEI;
            CdvLexAnalyzer.char2State['}'] = CdvGraphStates.STATELLAVED;
            CdvLexAnalyzer.char2State['['] = CdvGraphStates.STATECORI;
            CdvLexAnalyzer.char2State[']'] = CdvGraphStates.STATECORD;

            // Estados transicionales
            CdvLexAnalyzer.char2State['>'] = CdvGraphStates.TRANSRELOP1;
            CdvLexAnalyzer.char2State['='] = CdvGraphStates.TRANSRELOP2;
            CdvLexAnalyzer.char2State['!'] = CdvGraphStates.TRANSRELOP3;
            CdvLexAnalyzer.char2State['<'] = CdvGraphStates.TRANSRELOP4;
            CdvLexAnalyzer.char2State['&'] = CdvGraphStates.TRANSAND;
            CdvLexAnalyzer.char2State['|'] = CdvGraphStates.TRANSOR;

            CdvLexAnalyzer._instance = this;
        }

        /**
         * Inizializa el Analizador lexico en base a un codigo que recibe
         * @param codigo codigo a analizar
         */
        public AnalyzeCode(codigo : string)
        {
            this.code       = codigo;
            this.currenRow  = 1;
            this.currentCol = 0;
            this.currentPos = 0;
            this.endCodePos = codigo.length;
        }

        /**
         * Recoge la instancia actual del analizador, si existe de antes devuelve esa instancia
         * @returns {CdvLexAnalyzer} devuelve el objeto de tipo LexAnalyzer, solo lo crea una vez
         */
        public static getInstance() : CdvLexAnalyzer
        {
            if(CdvLexAnalyzer._instance === null)
            {
                CdvLexAnalyzer.canInstantiate = true;
                CdvLexAnalyzer._instance = new CdvLexAnalyzer();

                CdvLexAnalyzer.canInstantiate = false;
            }
            return CdvLexAnalyzer._instance;
        }

        /**
         * Obtiene el caracter de la cadena de codigo
         * @returns {string} devuelve el caracter
         */
        private getNextChar() : string
        {
            var character : string = "";
            if(this.currentPos < this.endCodePos)
            {
                character = this.code.charAt(this.currentPos);
                ++this.currentPos;
                ++this.currentCol;
            }
            else if (this.currentPos >= this.endCodePos)
            {
                character = "$";
            }

            if(character === "\n")
            {
                this.currentCol = 0;
                ++this.currenRow;
            }
            return character;
        }


        /**
         * Buscamos el siguientes token
         * @returns {CdvToken} devuelve el token formado
         */
        public nextToken() : CdvToken
        {
            this.token = new CdvToken();
            this.graphState = 0;
            var char : string = "";
            while(this.graphState <= 0)
            {
                char = this.getNextChar();
                this.delta(this.graphState,char);
            }


            if(this.token.type === CdvToken.ID)
            {
                var newType = CdvLexAnalyzer.id2Reserved[this.token.lexeme];
                if(newType !== undefined)
                    this.token.type = newType;
            }
            this.token.row = this.currenRow;
            return this.token;
        }

        /**
         * Funcion con la que realizamos las transiciones en el grafo
         * @param state estado acutal en el grafo
         * @param char caracter que recibimos
         */
        private delta(state : number, char : string)
        {
            switch (state)
            {
                case CdvGraphStates.STATEINIT :
                    this.graphState = this.updateState(char);
                    break;
                case CdvGraphStates.TRANSRELOP1:
                    this.graphState = this.moreEqualOpe(char);
                    break;
                case CdvGraphStates.TRANSRELOP2:
                    this.graphState = this.equalOpe(char);
                    break;
                case CdvGraphStates.TRANSRELOP3:
                    this.graphState = this.notEqualOpe(char);
                    break;
                case CdvGraphStates.TRANSRELOP4:
                    this.graphState = this.lessEqualOpe(char);
                    break;
                case CdvGraphStates.TRANSAND:
                    this.graphState = this.andOpe(char);
                    break;
                case CdvGraphStates.TRANSOR:
                    this.graphState = this.orOpe(char);
                    break;
                case CdvGraphStates.TRANSID:
                    this.graphState = this.generateID(char);
                    break;
                case CdvGraphStates.TRANSNUM:
                    this.graphState = this.digit(char);
                    break;
                case CdvGraphStates.TRANSNENTERO:
                    this.graphState = this.intDigit(char);
                    break;
                case CdvGraphStates.TRANSNREAL:
                    this.graphState = this.realDigi(char);
                    break;
                default :
                    throw new Error("Error Lexico (fila: "+this.token.row+", columna: "+this.token.column+"): Caracter "+char+" invalido");
            }
        }


        /**
         * Funcion que le pasamos un caracter y devuelve el estado asociado a dicho caracter
         * Utilizamos la funcion de graphState que nos devuelve el token en funcion del estado
         * El estado lo obtenemos mediante la tabla que pasa del caracter leido al estado (solo para unos pocos)
         * @param char caractar leido actual
         * @returns {number} numero del estado en el que se encuentra
         */
        private updateState(char : string) : number
        {
            this.token.column = this.currentCol;
            if(char >= "0" && char <= "9")
            {
                this.token.lexeme +=char;
                return CdvGraphStates.TRANSNUM;
            }
            else if(char >= "a" && char <= "z" || char >= "A" && char <= "Z")
            {
                this.token.lexeme +=char;
                return CdvGraphStates.TRANSID;
            }
            else if(char === "\t" || char === "\n" || char === " ")
            {
                if(char === "\t")
                {
                    this.currentCol += 3;
                    this.token.column = this.currentCol;

                }
                return CdvGraphStates.STATEINIT;
            }
            else if(char === "$")
            {
                this.token.type = CdvToken.EOF;
                this.token.lexeme = char;
                return CdvGraphStates.STATEEND;
            }
            else if(CdvLexAnalyzer.char2State[char] !== undefined)
            {
                this.token.lexeme +=char;
                this.token.type = CdvGraphStates.state2Token(CdvLexAnalyzer.char2State[char]);
                return CdvLexAnalyzer.char2State[char];
            }
            else
                throw new Error("Error Lexico (fila: "+this.token.row+", columna: "+this.token.column+"): Caracter "+char+" invalido");
        }

        /**
         * Comprueba operaciones >=
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop)
         */
        private moreEqualOpe(char : string) : number
        {
            if(char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP;
            }
            else
            {
                --this.currentPos;
                --this.currentCol;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP1;
            }
        }

        /**
         * Comprueba operacion <= u operaciones <<
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop o despi)
         */
        private lessEqualOpe(char : string ) : number
        {
            if( char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP;
            }
            else if (char === "<")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.DESPI;
                return CdvGraphStates.STATEDESPI;
            }
            else
            {
                --this.currentPos;
                --this.currentCol;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP1;
            }

        }

        /**
         * Comprueba operacion ==
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado relop o asig)
         */
        private equalOpe(char : string) : number
        {
            if (char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP;
            }
            else {
                --this.currentPos;
                --this.currentCol;
                this.token.type = CdvToken.ASIG;
                return CdvGraphStates.STATEASIG;
            }
        }

        /**
         * Comprueba operacion !=
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter ( estado relop) o corta ejecucion lanzando error
         */
        private notEqualOpe(char : string) : number
        {
            if(char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return CdvGraphStates.STATERELOP;
            }
            else
            {
                --this.currentPos;
                --this.currentCol;
                throw new Error("Error Lexico (fila: "+this.token.row+", columna: "+this.token.column+"): Caracter "+char+" invalido");
            }

        }

        /**
         * Genera el que ha comenzado por una letras en minuscula o mayuscula
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado ID o TRANSID)
         */
        private generateID(char : string) : number
        {
            if(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9")
            {
                this.token.lexeme += char;
                return CdvGraphStates.TRANSID;
            }
            this.token.type = CdvToken.ID;
            --this.currentPos;
            --this.currentCol;
            return CdvGraphStates.STATEID;
        }

        /**
         * Comprueba si es operacion &&
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado AND) o corta ejecucion lanzando error
         */
        private andOpe(char : string) : number
        {
            if(char === "&")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.AND;
                return CdvGraphStates.STATEAND;
            }
            throw new Error("Error Lexico (fila: "+this.token.row+", columna: "+this.token.column+"): Caracter "+char+" invalido");
        }

        /**
         * Comprueba si es operacion ||
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado OR) o corta ejecucion y lanza error
         */
        private orOpe(char : string) : number
        {
            if(char === "|")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.OR;
                return CdvGraphStates.STATEOR;
            }
            throw new Error("Error Lexico (fila: "+this.token.row+", columna: "+this.token.column+"): Caracter "+char+" invalido");
        }

        /**
         * Comprueba si lo que esta leyendo es un numero (entero o real)
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSNUM, TRANSNENTERO NENTERO1)
         */
        private digit(char : string) : number
        {
            if(char >= "0" && char <= "9")
            {
                this.token.lexeme += char;
                return CdvGraphStates.TRANSNUM;
            }
            else if (char === ".")
            {
                return CdvGraphStates.TRANSNENTERO;
            }
            else
            {
                this.token.type = CdvToken.NENTERO;
                --this.currentPos;
                --this.currentCol;
                return CdvGraphStates.STATENENTERO1;
            }
        }

        /**
         * Comprueba si lo que esta leyendo es un numero entero o real
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSREAL o NENTERO2)
         */
        private intDigit(char : string) : number
        {
            if(char >= "0" && char <= "9")
            {
                this.token.lexeme += "." + char;
                return CdvGraphStates.TRANSNREAL;
            }

            this.currentPos-=2;
            this.currentCol-=2;
            this.token.type = CdvToken.NENTERO;
            return CdvGraphStates.STATENENTERO2;
        }

        /**
         * Comprueba si lo que esta leyendo es un numero real
         * @param char caracter leido
         * @returns {number} estado tras analizar caracter (estado TRANSREAL o NREAL)
         */
        private realDigi(char : string) : number
        {
            if(char >= "0" && char <= "9")
            {
                this.token.lexeme += char;
                return CdvGraphStates.TRANSNREAL;
            }

            --this.currentPos;
            --this.currentCol;
            this.token.type = CdvToken.NREAL;
            return CdvGraphStates.STATENREAL;
        }
    }
}