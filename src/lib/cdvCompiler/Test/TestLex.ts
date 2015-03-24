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
            this.test_anaLex_Singleton2();
            this.test_anaLex_Singleton3();
            this.test_anaLex_Singleton4();
        }

        public static test_anaLex_Singleton4() : void
        {
            console.debug("test_anaLex_Singleton4");
            var code = "";
            var lex1,lex2;
            try
            {
                lex1 = CdvLexAnalyzer.getInstance(code);
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
                lex1 = CdvLexAnalyzer.getInstance(code);
                lex2 = CdvLexAnalyzer.getInstance(code);

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
                instance = CdvLexAnalyzer.getInstance(code);
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

    }


}