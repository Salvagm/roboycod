/**
 * Created by salva-pc on 23/03/15.
 */
///<reference path ="../CdvLexAnalyzer.ts" />
var compiler;
(function (compiler) {
    var TestLex = (function () {
        function TestLex() {
        }
        TestLex.TestAnaLex = function () {
            this.test_anaLex_Singleton();
            this.test_anaLex_Singleton2();
            this.test_anaLex_Singleton3();
            this.test_anaLex_Singleton4();
        };
        TestLex.test_anaLex_Singleton4 = function () {
            console.debug("test_anaLex_Singleton4");
            var code = "";
            var lex1, lex2;
            try {
                lex1 = compiler.CdvLexAnalyzer.getInstance(code);
                lex2 = new compiler.CdvLexAnalyzer();
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("We can't initialice CdvLexAnalyzer");
        };
        TestLex.test_anaLex_Singleton3 = function () {
            console.debug("test_anaLex_Singleton3");
            var code = "";
            var lex1, lex2;
            try {
                lex1 = compiler.CdvLexAnalyzer.getInstance(code);
                lex2 = compiler.CdvLexAnalyzer.getInstance(code);
                if (lex1 !== lex2)
                    throw Error("lex1 and lex2 must be the same object");
            }
            catch (e) {
                console.error(e.toString());
                return;
            }
            console.info("OK");
        };
        TestLex.test_anaLex_Singleton2 = function () {
            console.debug("test_anaLex_Singleton2");
            var instance;
            var code = "";
            try {
                instance = compiler.CdvLexAnalyzer.getInstance(code);
            }
            catch (e) {
                console.error(e.toString());
                return;
            }
            console.info("OK");
        };
        TestLex.test_anaLex_Singleton = function () {
            console.debug("test_anaLex_Singleton");
            try {
                var anaLex = new compiler.CdvLexAnalyzer();
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("test_anaLex_Singleton fail, can't call to constructor");
        };
        return TestLex;
    })();
    compiler.TestLex = TestLex;
})(compiler || (compiler = {}));
//# sourceMappingURL=TestLex.js.map