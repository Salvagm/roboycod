/**
 * Created by salva-pc on 13/03/15.
 */


//$(document).ready(function ()
//{
    //miliseconds
    Sk.execLimit = 3;
    // Lugar de output por defecto
    var outputNode = document.getElementById("weaponOutput");

    function outf(text) {
        outputNode.innerHTML = outputNode.innerHTML + text;
    }
    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    function runit(cdv){

        switch (cdv.type) {
            case Roboycod.CdvLogic.TYPES[0] :
                outputNode = document.getElementById("weaponOutput");
                break;
            case  Roboycod.CdvLogic.TYPES[1] :

                outputNode = document.getElementById("coreOutput");
                break;
            case  Roboycod.CdvLogic.TYPES[2] :
                outputNode = document.getElementById("motionOutput");

                break;
            case  Roboycod.CdvLogic.TYPES[3] :
                outputNode = document.getElementById("dronOutput");
                break;
            default :
                console.log("No existe el tipo de cdv al ejecutarlo");
        }
        Sk.configure({output:outf, read:builtinRead});
        try
        {
            eval(Sk.importMainWithBody("<stdin>",false,cdv.code));
        }
        catch (e)
        {
            console.log(e.toString());
        }

        outputNode.scrollTop = outputNode.scrollHeight;
        var list = outputNode.innerHTML.split("\n");
        var output = list[list.length-2];
        cdv.execAction(output);
    }
    $("#runCode").click(function()
    {
        document.getElementById("weaponOutput").innerHTML = "";
        var editor = ace.edit("editor");
        code = editor.getSession().getValue();

        Sk.configure({output:outf, read:builtinRead});
        try
        {
            eval(Sk.importMainWithBody("<stdin>",false,code));
        }
        catch (e)
        {
            console.log(e.toString());
        }
    });
//});
