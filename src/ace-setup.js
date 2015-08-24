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

    //Deshabilitamos las funciones del raton
    editor.container.style.pointerEvents = "none";
    function stop(editor) { editor.stop() }
    ["mousedown", "dblclick", "tripleclick",
        "quadclick", "click", "mousemove"].forEach(function(name) {
            editor.on(name, stop)
        })

    //LIMITA LAS LINEAS A 5

    //$( "#editor" ).keyup(function() {
    //    if(session.getLength() <= 5)
    //        contentTemp = session.getValue();
    //    if(session.getLength() >= 5){
    //        editor.getSession().getUndoManager().undo(true);
    //    }
    //});

    //OPCIONES DE GUARDADO

    //$("#save-btn").on('click', function () {
    //    if(session.getValue() != ""){
    //        localStorage.setItem('key', JSON.stringify(session.getValue()));
    //        editor.setValue("", -1);
    //
    //    }
    //});

    //$("#load-btn").on('click', function () {
    //    if(localStorage.getItem('key')){
    //        editor.setValue(JSON.parse(localStorage.getItem('key')), -1);
    //        localStorage.removeItem('key');
    //    }
    //
    //});


    //var snippetManager = ace.require("ace/snippets").snippetManager;
    //var config = ace.require("ace/config");
    //
    //ace.config.loadModule("ace/snippets/javascript", function(m) {
    //    if (m) {
    //        snippetManager.files.javascript = m;
    //        m.snippetText += mySnippetText; // if you have snippets in the ace snippet format
    //        m.snippets = snippetManager.parseSnippetFile(m.snippetText);
    //
    //        // or do this if you already have them parsed
    //        m.snippets.push({
    //            content: "${1:class_name}.prototype.${2:method_name} = function(${3:first_argument}) {    ${4:// body...}",
    //            name: "proto",
    //                    tabTrigger: "proto"
    //        });
    //
    //        snippetManager.register(m.snippets, m.scope);
    //    }
    //});


});