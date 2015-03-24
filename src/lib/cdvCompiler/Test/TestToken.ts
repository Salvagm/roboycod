/**
 * Created by salva-pc on 23/03/15.
 */

///<reference path="../CdvToken.ts" />

module compiler{


    export class TestToken {

        public static test_Token_Fail() : void
        {
            console.debug("test_TokenFail");
            var tok : CdvToken = new CdvToken();
            var cad : string = "";
            tok.type = -1;

            cad = tok.toString();

            if (cad !== null)
                console.error("Invalid Token");
            else
                console.info("OK");
        }

        public static test_Token_Ok() : void
        {
            console.debug("test_TokenOk");
            var tok : CdvToken = new CdvToken();
            var cad : string = "";
            tok.type = 2;
            cad = tok.toString();

            if(cad === null)
                console.error("Valid Token");
            else
                console.info("OK");
        }

        public static test_Token_SaticToString()
        {
            console.debug("test_TokenFail");
            var cad : string = CdvToken.toString(2);
            var numAccept : number = 0;
            if(cad === null)
                console.error("Valid Token");
            else
                ++numAccept;

            cad = CdvToken.toString(-1);

            if (cad !== null)
                console.error("Invalid Token");
            else
                ++numAccept;

            if(numAccept === 2)
            {
                console.info("OK");
            }
            else
                console.error("Fail ");


        }

        public static TestToken()
        {

            this.test_Token_Fail();
            this.test_Token_Ok();
            this.test_Token_SaticToString();
        }

    }



}
