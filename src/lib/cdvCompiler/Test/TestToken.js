/**
 * Created by salva-pc on 23/03/15.
 */
///<reference path="../CdvToken.ts" />
var compiler;
(function (compiler) {
    var TestToken = (function () {
        function TestToken() {
        }
        TestToken.test_Token_Fail = function () {
            console.debug("test_TokenFail");
            var tok = new compiler.CdvToken();
            var cad = "";
            tok.type = -1;
            cad = tok.toString();
            if (cad !== null)
                console.error("Invalid Token");
            else
                console.info("OK");
        };
        TestToken.test_Token_Ok = function () {
            console.debug("test_TokenOk");
            var tok = new compiler.CdvToken();
            var cad = "";
            tok.type = 2;
            cad = tok.toString();
            if (cad === null)
                console.error("Valid Token");
            else
                console.info("OK");
        };
        TestToken.test_Token_SaticToString = function () {
            console.debug("test_TokenFail");
            var cad = compiler.CdvToken.toString(2);
            var numAccept = 0;
            if (cad === null)
                console.error("Valid Token");
            else
                ++numAccept;
            cad = compiler.CdvToken.toString(-1);
            if (cad !== null)
                console.error("Invalid Token");
            else
                ++numAccept;
            if (numAccept === 2) {
                console.info("OK");
            }
            else
                console.error("Fail ");
        };
        TestToken.TestToken = function () {
            this.test_Token_Fail();
            this.test_Token_Ok();
            this.test_Token_SaticToString();
        };
        return TestToken;
    })();
    compiler.TestToken = TestToken;
})(compiler || (compiler = {}));
//# sourceMappingURL=TestToken.js.map