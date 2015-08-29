$( document ).ready(function(){
    var editor = ace.edit("editor");
    var session = editor.getSession();

    //elimina el warning al cargar texto
    editor.$blockScrolling = Infinity;

    editor.setTheme("ace/theme/monokai");
    session.setMode("ace/mode/python");
    document.getElementById('editor').style.fontSize='18px';

    ace.require("ace/ext/language_tools");
    editor.setOptions({
        enableBasicAutocompletion: true
    });

    /**
     * Captura Ctrl+S
     */
    editor.commands.addCommand({
        name: 'saveFile',
        bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
            Roboycod.Inventory.getInstance().saveCdv();
        }
    });

//TODO SACAR DE AQUI
    window.addEventListener("resize", function(){
        var canvas = document.querySelector('#game canvas');
        var buffers = document.getElementById('buffers');
        var wb  = document.getElementById('weaponBuffer');
        var cb  = document.getElementById('coreBuffer');
        var mb  = document.getElementById('motionBuffer');
        var db  = document.getElementById('dronBuffer');
        buffers.style.height = canvas.style.height;

        console.log("Cavas height : " + canvas.clientHeight);
        console.log("Un cuarto de height : "+ canvas.clientHeight /4);
        console.log("Altura de wb : " +wb.clientHeight);
        var quarterHeight = canvas.clientHeight /4 + 'px';
        wb.style.height = quarterHeight;
        cb.style.height = quarterHeight;
        mb.style.height = quarterHeight;
        db.style.height = quarterHeight;


        console.log("resize");
    });
});

//function showEditor(){
//    editor.className = 'fadein';
//    setTimeout(function() {
//        $(editor).css('display', 'block');
//    }, 1000);
//};
//
//function hideEditor(){
//    editor.className = 'fadeout';
//    setTimeout(function() {
//        $(editor).css('display', 'none');
//    }, 1000);
//};