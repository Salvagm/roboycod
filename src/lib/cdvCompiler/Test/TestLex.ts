/**
 * Created by salva-pc on 23/03/15.
 */
///<reference path ="../CdvLexAnalyzer.ts" />

module compiler
{

    export class TestLex
    {

        public static TestAnaLex():void {
            this.test_anaLex_Singleton();
            // Devuelven siempre la misma instancia de analizador lexico
            this.test_anaLex_Singleton2();
            this.test_anaLex_Singleton3();
            this.test_anaLex_Singleton4();


            this.test_correct_Code2();
            this.test_correct_Code();
            this.test_fail_code();
            this.test_fail_code2();
            this.test_fail_code3();
            this.test_fail_code4();
            this.test_empty_code();
        }

        public static test_anaLex_Singleton4() : void
        {
            console.debug("test_anaLex_Singleton4");
            var code = "";
            var lex1,lex2;
            try
            {
                lex1 = CdvLexAnalyzer.getInstance();
                lex2 = new CdvLexAnalyzer();

            }catch(e) {

                console.info("OK");

                return;
            }
            console.error("We can't initialice CdvLexAnalyzer");


        }

        public static test_anaLex_Singleton3() : void
        {
            console.debug("test_anaLex_Singleton3");
            var code = "";
            var lex1,lex2;
            try
            {
                lex1 = CdvLexAnalyzer.getInstance();
                lex2 = CdvLexAnalyzer.getInstance();

                if(lex1 !== lex2)
                    throw Error ("lex1 and lex2 must be the same object");
            }catch(e) {
                console.error(e.toString());
                return;
            }
            console.info("OK");


        }

        public static test_anaLex_Singleton2() : void
        {
            console.debug("test_anaLex_Singleton2");
            var instance;
            var code ="";
            try {
                instance = CdvLexAnalyzer.getInstance();
            }
            catch (e)
            {
                console.error(e.toString());
                return;
            }
            console.info("OK");

        }

        public static test_anaLex_Singleton() : void
        {
            console.debug("test_anaLex_Singleton");
            try{
                var anaLex = new CdvLexAnalyzer();
            }catch (e)
            {
                console.info("OK");
                return;
            }
            console.error("test_anaLex_Singleton fail, can't call to constructor");

        }



        public static test_correct_Code() : void
        {
            console.debug("test_correct_Code");
            var code = "int main ()\n{\n\tint a;\n\ta = 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                    //console.debug("Token: "+token.lexeme+ " columna "+token.column +" fila "+token.row)
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.error(e.toString());
                return;
            }

            console.info("OK");
        }

        public static test_correct_Code2() : void
        {
            console.debug("test_correct_Code2");
            var code = "void main ()\n{\n\tfloat a;\n\ta = 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                    //console.debug("Token: "+token.lexeme+ " columna "+token.column +" fila "+token.row)
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.error(e.toString());
                return;
            }

            console.info("OK");
        }

        public static test_fail_code() : void
        {
            console.debug("test_fail_Code");
            var code = "int main ()\n{\n\tint a;\n\ta = 3.;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \".\" not valid ");

        }

        public static test_fail_code2() : void
        {
            console.debug("test_fail_Code2");
            var code = "int main ()\n{\n\tint a;\n\ta = !3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"!\" not valid ");
        }

        public static test_fail_code3() : void
        {
            console.debug("test_fail_Code3");
            var code = "int main ()\n{\n\tint a;\n\ta &= 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"&\" not valid ");
        }

        public static test_fail_code4() : void
        {
            console.debug("test_fail_Code4");
            var code = "int main ()\n{\n\tint a;\n\ta |= 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;

            try{
                do{
                    token = analex.nextToken();
                }while(token.type !== CdvToken.EOF)

            } catch (e)
            {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"&\" not valid ");
        }

        public static test_empty_code() : void
        {
            console.debug("test_empty_code");
            var code = "";

            var analex : CdvLexAnalyzer = CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token : CdvToken;
            var numIter : number = 0;
            try{
                do{
                    token = analex.nextToken();
                    numIter ++;
                }while(token.type !== CdvToken.EOF)

            }catch (e)
            {
                console.error(e.toString());
            }

            if(numIter >1)
            {
                console.error("Lexic Fail, entry is empty");
            }
            console.info("OK");
        }

    }


}