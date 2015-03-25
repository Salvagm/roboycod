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
        };
        TestLex.test_anaLex_Singleton4 = function () {
            console.debug("test_anaLex_Singleton4");
            var code = "";
            var lex1, lex2;
            try {
                lex1 = compiler.CdvLexAnalyzer.getInstance();
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
                lex1 = compiler.CdvLexAnalyzer.getInstance();
                lex2 = compiler.CdvLexAnalyzer.getInstance();
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
                instance = compiler.CdvLexAnalyzer.getInstance();
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
        TestLex.test_correct_Code = function () {
            console.debug("test_correct_Code");
            var code = "int main ()\n{\n\tint a;\n\ta = 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.error(e.toString());
                return;
            }
            console.info("OK");
        };
        TestLex.test_correct_Code2 = function () {
            console.debug("test_correct_Code2");
            var code = "void main ()\n{\n\tfloat a;\n\ta = 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.error(e.toString());
                return;
            }
            console.info("OK");
        };
        TestLex.test_fail_code = function () {
            console.debug("test_fail_Code");
            var code = "int main ()\n{\n\tint a;\n\ta = 3.;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \".\" not valid ");
        };
        TestLex.test_fail_code2 = function () {
            console.debug("test_fail_Code2");
            var code = "int main ()\n{\n\tint a;\n\ta = !3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"!\" not valid ");
        };
        TestLex.test_fail_code3 = function () {
            console.debug("test_fail_Code3");
            var code = "int main ()\n{\n\tint a;\n\ta &= 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"&\" not valid ");
        };
        TestLex.test_fail_code4 = function () {
            console.debug("test_fail_Code4");
            var code = "int main ()\n{\n\tint a;\n\ta |= 3;\n\tif(a == 2)\n\t{\n\t\tcout << a << endl;\n\t}\n}";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            try {
                do {
                    token = analex.nextToken();
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.info("OK");
                return;
            }
            console.error("Lexic Fail, character \"&\" not valid ");
        };
        TestLex.test_empty_code = function () {
            console.debug("test_empty_code");
            var code = "";
            var analex = compiler.CdvLexAnalyzer.getInstance();
            analex.AnalyzeCode(code);
            var token;
            var numIter = 0;
            try {
                do {
                    token = analex.nextToken();
                    numIter++;
                } while (token.type !== compiler.CdvToken.EOF);
            }
            catch (e) {
                console.error(e.toString());
            }
            if (numIter > 1) {
                console.error("Lexic Fail, entry is empty");
            }
            console.info("OK");
        };
        return TestLex;
    })();
    compiler.TestLex = TestLex;
})(compiler || (compiler = {}));
//# sourceMappingURL=TestLex.js.map