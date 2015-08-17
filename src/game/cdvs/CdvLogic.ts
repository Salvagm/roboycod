/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>

module Roboycod {

    export class CdvLogic {

        public static TYPES         :string[] = ['weapon', 'core', 'motion', 'dron'];
        public static idCount       : number = 0;

        public static weaponQuerys  :string[];
        public static weaponActions :string[];
        public static coreQuerys    :string[];
        public static coreActions   :string[];
        public static motionQuerys  :string[];
        public static motionActions :string[];
        public static dronQuerys    :string[];
        public static dronActions   :string[];
        //El id servira para ser distinguido por el compilador
        public id               : number;
        public type             : string;
        public code             : string;
        public isCompiled       : boolean;
        public isSelected       : boolean;

        //TODO DEMOCODE
        public expectedOutput   : string = "SALTO";
        //TODO END DEMOCODE

        constructor(type : string){
            this.id = CdvLogic.idCount;
            CdvLogic.idCount++;
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