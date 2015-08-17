/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>

module Roboycod {

    export class CdvLogic {

        public static weaponQuerys      : string[];
        public static weaponActions     : string[];

        //El id servira para ser distinguido por el compilador
        public id               : string;
        public cdvType          : string;
        public code             : string;
        public isCompiled       : boolean;

        //TODO DEMOCODE
        public expectedOutput   : string = "SALTO";
        //TODO END DEMOCODE

        constructor(){

            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE
        } public loadCode(){

            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        }
        public checkCode() : Boolean{

            runCode();

            var interpreterOutput = document.getElementById("output");
            var output : string = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if(output == "SALTO"){
                return true;
            }
            return false;

        }

    }
}