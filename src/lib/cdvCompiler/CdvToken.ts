/**
 * Created by salva-pc on 23/03/15.
 */

module compiler
{
    export class CdvToken
    {
        public row     : number;
        public column  : number;
        public lexeme   : string;
        public type     : number;

        public static PARI      : number  = 0;
        public static PARD      : number = 1;
        public static CORI      : number = 2;
        public static CORD      : number = 3;
        public static LLAVEI    : number = 4;
        public static LLAVED    : number = 5;
        public static RELOP     : number = 6;
        public static PYC       : number = 7;
        public static COMA      : number = 8;
        public static ASIG      : number = 9;
        public static AND       : number = 10;
        public static OR        : number = 11;
        public static NREAL     : number = 12;
        public static NENTERO   : number = 13;
        public static INT       : number = 14;
        public static FLOAT     : number = 15;
        public static CHAR      : number = 16;
        public static BOOL      : number = 17;
        public static VOID      : number = 18;
        public static COUT      : number = 19;
        public static DESPI     : number = 20;
        public static ENDL      : number = 21;
        public static TRUE      : number = 22;
        public static FALSE     : number = 23;
        public static IF        : number = 24;
        public static ID        : number = 25;

        //TODO ADD NEW TOKEN IN NEXT STEPS
        public static EOF       : number = 26;

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
            "fin de fichero"] ;

        constructor()
        {
            this.column = this.row= 0;
            this.type = 0;
            this.lexeme = "";
            //this.Tok2Str =
        }


        public toString() : string
        {
            var cad : string = CdvToken.tok2Str[this.type];
            if (cad === undefined)
                cad = null;
            return cad;
        }

        public static toString(tipo : number) : string
        {
            var cad : string = CdvToken.tok2Str[tipo];
            if (cad === undefined)
                cad = null;
            return cad;
        }

    }

}
