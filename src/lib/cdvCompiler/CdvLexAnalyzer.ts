/**
 * Created by salva-pc on 23/03/15.
 */

///<reference path ="CdvToken.ts" />

module compiler
{
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
        private static char2Type        : {[char : string] : number;} = {};

        private static STATEINIT    : number = 0;
        // Transicion de >
        private static TRANSRELOP1  : number = -1;
        // Transicion de =
        private static TRANSRELOP2  : number = -2;
        // Transicion de !
        private static TRANSRELOP3  : number = -3;
        // Transicion de <
        private static TRANSRELOP4  : number = -4;
        // Transicion de &
        private static TRANSAND  : number = -9;
        // Transicion de |
        private static TRANSOR  : number = -10;

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
            CdvLexAnalyzer.id2Reserved["if"] = CdvToken.IF;
            CdvLexAnalyzer.id2Reserved["true"] = CdvToken.TRUE;
            CdvLexAnalyzer.id2Reserved["false"] = CdvToken.FALSE;

            CdvLexAnalyzer.char2Type[','] = CdvToken.COMA;
            CdvLexAnalyzer.char2Type[';'] = CdvToken.PYC;
            CdvLexAnalyzer.char2Type['('] = CdvToken.PARI;
            CdvLexAnalyzer.char2Type[')'] = CdvToken.PARD;
            CdvLexAnalyzer.char2Type['{'] = CdvToken.LLAVEI;
            CdvLexAnalyzer.char2Type['}'] = CdvToken.LLAVED;
            CdvLexAnalyzer.char2Type['['] = CdvToken.CORI;
            CdvLexAnalyzer.char2Type[']'] = CdvToken.CORD;
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
        public initialiceAnaLex(codigo : string)
        {
            this.code       = codigo;
            this.currenRow  = 1;
            this.currentCol = 0;
            this.currentPos = 0;
            this.endCodePos = codigo.length;
        }

        /**
         * Recoge la instancia actual del analizador, si existe de antes devuelve esa instancia
         * @param codigo codigo que queremos analizar
         * @returns {CdvLexAnalyzer} devuelve el objeto de tipo LexAnalyzer, solo lo crea una vez
         */
        public static getInstance(codigo : string) : CdvLexAnalyzer
        {
            if(CdvLexAnalyzer._instance === null)
            {
                CdvLexAnalyzer.canInstantiate = true;
                CdvLexAnalyzer._instance = new CdvLexAnalyzer();
                CdvLexAnalyzer._instance.initialiceAnaLex(codigo);
                CdvLexAnalyzer.canInstantiate = false;
                console.log(this.id2Reserved["endl"]);
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
            if(this.currentPos < this.endCodePos-1)
            {
                character = this.code.charAt(this.currentPos);
                ++this.currentPos;
                ++this.currentCol;
            }
            else if (this.currentPos == this.endCodePos-1)
            {
                character = "$";
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
                case CdvLexAnalyzer.STATEINIT :
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
        }


        /**
         * Funcion que le pasamos un caracter y devuelve el estado asociado a dicho caracter
         * Utilizamos la tabla estatica que del caracter leido obtenemos el tipo de token
         * @param char caractar leido actual
         * @returns {number} numero del estado en el que se encuentra
         */
        private updateState(char : string) : number
        {
            this.token.lexeme +=char;
            this.token.type = CdvLexAnalyzer.char2Type[char];
            return this.token.type;
        }

        private moreEqual(char : string) : number
        {
            if(char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return 8;
            }
            else
            {
                --this.currentPos;
                this.token.type = CdvToken.RELOP;
                return 7;
            }
        }
        private lessEqual(char : string ) : number
        {
            if( char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return 8;
            }
            else if (char === "<")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.DESPI;
                return 10;
            }
            else
            {
                --this.currentPos;
                this.token.type = CdvToken.RELOP;
                return 7;
            }

        }
        private equal(char : string) : number
        {
            if (char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return 8;
            }
            else {
                --this.currentPos;
                this.token.type = CdvToken.ASIG;
                return 9;
            }
        }

        // TODO MIRAR TEMA DE DETENER EJECUCION
        // TODO MIRAR WEB WORKERS
        private notEqual(char : string) : number
        {
            if(char === "=")
            {
                this.token.lexeme += char;
                this.token.type = CdvToken.RELOP;
                return 8;

            }
            else
            {
                --this.currentPos;
                throw  new Error ("Erros Lexico:");
            }

        }



    }
}