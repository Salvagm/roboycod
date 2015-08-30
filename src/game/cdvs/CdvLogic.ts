/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
///<reference path="CdvCommon.ts"/>
///<reference path="../../lib/cdvCompiler/src/IOSystem/CompilerBridge.ts"/>

module Roboycod {

    export class CdvLogic {

        //Estaran en el orden en que los representa el inventario
        public static TYPES     :string[] = ['weapon', 'core', 'motion', 'dron'];

        //En el constructor asignaremos el diccionario concreto segun su tipo
        private actions         :{[action  : string] : any;} = {};

        //El id servira para ser distinguido por el compilador
        public id               : number;
        public type             : string;
        public code             : string;
        public isCompiled       : boolean;
        public isSelected       : boolean;
        public keyCode          : number;

        constructor(other : Object){

            if(other !== undefined){

                if(typeof other == "string"){
                    var type = <string> other;
                    this.setType(type);
                    this.id = Date.now();
                    this.isSelected = false;

                    this.compile();
                }
                else{
                    var copy : CdvLogic = <CdvLogic> other;
                    this.id = copy.id;
                    this.setType(copy.type);
                    this.isSelected = copy.isSelected;
                    this.keyCode = copy.keyCode;
                    this.code = copy.code;
                    this.isCompiled = copy.isCompiled;

                }

            }
        }
        private setType(type : string){
            this.type = type;
            switch (this.type){
                case CdvLogic.TYPES[0] :
                    this.code = "int main()\n{\n\tcout << \"disparar\" << endl;\n}";
                    this.actions = CdvCommon.weaponHash;
                    this.keyCode = Phaser.Keyboard.W;
                    break;
                case CdvLogic.TYPES[1] :
                    this.code = "int main()\n{\n}";
                    this.actions = CdvCommon.coreHash;
                    break;
                case CdvLogic.TYPES[2] :
                    this.actions = CdvCommon.motionHash;
                    this.code = "int main()\n{\n\tcout << \"saltar\" << endl;\n}";
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3] :
                    this.code = "int main()\n{\n}";
                    this.actions = CdvCommon.dronHash;
                    break;
                default :
                    console.log("No existe el tipo de cdv al asignar tabla de acciones");
            }
        }
        /**
         * Ejecutara el codigo asociado, se realizaran las acciones que tengan
         * como clave la salida de la ejecucion del codigo
         */
        public runCode() : void{
            //TODO runit de Bridge
            var cB : IOSystem.CompilerBridge = IOSystem.CompilerBridge.getInstace();

            if(this.isCompiled)
            {
                cB.runit(this);
            }
            //runit(this);
        }
        //TODO controlar si no esta la accion que lo indique al usuario
        public execAction(output : string){
            if(this.actions[output] !== undefined){
                this.actions[output]();
            }
            else{
                console.log("Accion " + output + " no registrada");
            }

        }
        public showCode() : void{
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        }
        public compile(x? : number , y?: number) : void{
            var cB : IOSystem.CompilerBridge = IOSystem.CompilerBridge.getInstace();
            // Mensaje asincrono que asigna el valor de si ha compilado o no
            if(x === undefined || y === undefined)
                cB.compile(this);
            else
                cB.compile(this,x,y);

        }
        public graphicUpdate(x : number, y : number)
        {
            Roboycod.Inventory.getInstance().refreshCdv(x,y);
        }
    }
}