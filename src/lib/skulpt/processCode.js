/**
 * Created by salva-pc on 13/03/15.
 */


//$(document).ready(function ()
//{
    //miliseconds
    Sk.execLimit = 3;

    function outf(text) {
        var mypre = document.getElementById("output");
        mypre.innerHTML = mypre.innerHTML + text;
    }
    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }

    function runit(){
        document.getElementById("output").innerHTML = "";
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
    }
    $("#runCode").click(function()
    {
        document.getElementById("output").innerHTML = "";
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
