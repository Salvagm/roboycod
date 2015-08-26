/**
 * Created by salva on 25/08/15.
 */

module IOSystem
{

   addEventListener("message",
    function (message) {
        console.log(message);
        var f = new Function(message.data);
        f();
        self.postMessage({cmd : "end", output: 0},null);
        self.close();
    }, false);

    export function sendMsg(code : string, cdvType : string, buffeType : string)
    {
        self.postMessage({output : code, cdvType : cdvType, bType : buffeType, cmd : "cout"},null);
    }
}