/*
 * FUNCIONES PARA APARTADO VISUAL
 */

function fixRightSide(){
    var delay=200; //1 seconds

    setTimeout(function(){

        //El nodo canvas no estara disponible hasta que phaser lo genere
        var canvas  = document.querySelector('#game canvas');
        var buffers = document.getElementById('buffers');
        var wb      = document.getElementById('weaponBuffer');
        var cb      = document.getElementById('coreBuffer');
        var mb      = document.getElementById('motionBuffer');
        var db      = document.getElementById('dronBuffer');
        var tc      = document.getElementById('testConsole');

        buffers.style.height = canvas.style.height;

        var quarterHeight = canvas.clientHeight /4 + 'px';
        wb.style.height = quarterHeight;
        cb.style.height = quarterHeight;
        mb.style.height = quarterHeight;
        db.style.height = quarterHeight;
        //El editor mide 300px
        tc.style.height = canvas.clientHeight - 300 + 'px';

        //Reajustamos el contenedor de las columnas al canvas
        $(".side").height(canvas.clientHeight);

    }, delay);
}

/*
 * FUNCIONES PARA EL EDITOR
 */
function enableEditor(){
    var editor = ace.edit("editor");
    editor.focus();
    editor.setReadOnly(false);
    editor.container.style.opacity=1;
}
function disableEditor(){
    var editor = ace.edit("editor");
    editor.setReadOnly(true);
    editor.container.style.opacity=0.8;
    editor.blur();
}

// Cada vez que se reajuste la pantalla se debe modificar la altura
window.addEventListener("resize", fixRightSide);

$( window ).load(function(){

    /*
     * FUNCIONES PARA EL EDITOR
     */

    var editor = ace.edit("editor");
    var session = editor.getSession();

    //Elimina el warning al cargar texto
    editor.$blockScrolling = Infinity;

    editor.setTheme("ace/theme/monokai");
    session.setMode("ace/mode/c_cpp");
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

    disableEditor();
});
