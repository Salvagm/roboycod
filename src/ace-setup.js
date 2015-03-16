$( document ).ready(function(){
    var editor = ace.edit("editor");
    
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/python");
    document.getElementById('editor').style.fontSize='18px';

    //editor.setShowInvisibles(true);

    ace.require("ace/ext/language_tools");
    editor.setOptions({
        enableBasicAutocompletion: true
    });

    //LIMITA LAS LINEAS A 5

    $( "#editor" ).keyup(function() {
        if(editor.getSession().getLength() <= 5)
            contentTemp = editor.getSession().getValue();
        if(editor.getSession().getLength() >= 5){
            editor.getSession().getUndoManager().undo(true);
        }
    });

    //OPCIONES DE GUARDADO

    $("#save-btn").on('click', function () {
        if(editor.getSession().getValue() != ""){
            localStorage.setItem('key', JSON.stringify(editor.getSession().getValue()));
            editor.setValue("", -1);
        }
    });

    $("#load-btn").on('click', function () {
        if(localStorage.getItem('key')){
            editor.setValue(JSON.parse(localStorage.getItem('key')), -1);
            localStorage.removeItem('key');
        }

    });


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