/**
 * Created by salva on 25/08/15.
 */

module IOSystem
{

    export class WorkProgram
    {
        public static playerStates : any;
    }

   addEventListener("message",
    function (message) {

        WorkProgram.playerStates = message.data.playerState;
        var f = new Function(message.data.code);

        f();
        //self.postMessage({cmd : "end", output: 0},null);
        self.close();
    }, false);

    export function sendMsg(code : string, cdvType : string, buffeType : string)
    {
        var action : string = code;
        if(action.slice(-1) === "\n")
            action = code.slice(0,-1);

        self.postMessage({acction:  action, output : code, cdvType : cdvType, bType : buffeType, cmd : "cout"},null);
    }
}