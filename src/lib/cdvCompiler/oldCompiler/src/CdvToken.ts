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
module compiler
{
    /**
     * Clase contenedora del token que hemos leido
     */
    export class CdvToken
    {
        // Fila del token leido
        public row     : number;
        // Columna del token leido
        public column  : number;
        // Cadena formada en el token
        public lexeme   : string;
        // tipo de token
        public type     : number;
        // Token ( (0)
        public static PARI      : number  = 0;
        // Token ) (1)
        public static PARD      : number = 1;
        // Token [ (2)
        public static CORI      : number = 2;
        // Token ] (3)
        public static CORD      : number = 3;
        // Token { (4)
        public static LLAVEI    : number = 4;
        // Token } (5)
        public static LLAVED    : number = 5;
        // Token < | > | <= | >= | == |!= (6)
        public static RELOP     : number = 6;
        // Token ; (7)
        public static PYC       : number = 7;
        // Token , (8)
        public static COMA      : number = 8;
        // Token = (9)
        public static ASIG      : number = 9;
        // Token and (10)
        public static AND       : number = 10;
        // Token or (11)
        public static OR        : number = 11;
        // Token numreal (12)
        public static NREAL     : number = 12;
        // Token numEntero (13)
        public static NENTERO   : number = 13;
        // Token int (14)
        public static INT       : number = 14;
        // Token float (15)
        public static FLOAT     : number = 15;
        // Token 16 (char)
        public static CHAR      : number = 16;
        // Token bool (17)
        public static BOOL      : number = 17;
        // Token void (18)
        public static VOID      : number = 18;
        // Token cout (19)
        public static COUT      : number = 19;
        // Token << (20)
        public static DESPI     : number = 20;
        // Token endl(21)
        public static ENDL      : number = 21;
        // Token true (22)
        public static TRUE      : number = 22;
        // Token false (23)
        public static FALSE     : number = 23;
        // Token if (24)
        public static IF        : number = 24;
        // Token identificador (25)
        public static ID        : number = 25;
        // Token + - (26)
        public static ADDOP     : number = 26;
        // Token * / % (27)
        public static MULOP     : number = 27;

        //TODO ADD NEW TOKEN IN NEXT STEPS
        // Token final fichero (26)
        public static EOF       : number = 28;

        // Array que pasa del tipo numérico del token a la cadena asociada
        private static tok2Str : string[] = ["(",
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
            "fin de fichero"] ;

        /**
         * Constructor de la clase CdvToken
         */
        constructor()
        {
            this.column = this.row= 0;
            this.type = 0;
            this.lexeme = "";
        }

        /**
         * Devuelve la cadena en base al tipo actual del token
         * @returns {string} cadena del tipo
         */
        public toString() : string
        {
            var cad : string = CdvToken.tok2Str[this.type];
            if (cad === undefined)
                cad = null;
            return cad;
        }

        /**
         * Statico que en funcion del tipo que recibe devuelve la cadena correspondiente
         * @param tipo tipo de token
         * @returns {string} cadena del tipo
         */
        public static toString(tipo : number) : string
        {
            var cad : string = CdvToken.tok2Str[tipo];
            if (cad === undefined)
                cad = null;
            return cad;
        }

    }

}
