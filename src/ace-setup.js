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