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


module Roboycod {

    export class CdvLogic {

        //TODO mirar si sacar estaticos una clase Common
        //Estaran en el orden en que los representa el inventario
        public static TYPES         :string[] = ['weapon', 'core', 'motion', 'dron'];

        //TODO Crear Run(id cdv.id) y readBuffer(id), si la salida coincide
        //TODO con la salida de ese tipo, se ejecuta la funcion del diccionario


        //En el constructor asignaremos el diccionario concreto segun su tipo
        private actions  :{[action  : string] : any;} = {};
        private answers  :{[query   : string] : any;} = {};
        //El id servira para ser distinguido por el compilador
        public id               : number;
        public type             : string;
        public code             : string;
        public isCompiled       : boolean;
        public isSelected       : boolean;
        /**
         * key del teclado asociada al CDV
         */
        public keyCode          : number;

        constructor(other : Object){

            if(other !== undefined){

                if(typeof other == "string"){
                    var type = <string> other;
                    this.setType(type);
                    this.id = -1;
                    this.isSelected = false;

                    this.isCompiled = this.compile();
                }
                else{
                    var copy : CdvLogic = <CdvLogic> other;
                    this.id = copy.id;
                    this.setType(copy.type);
                    this.isSelected = copy.isSelected;
                    this.keyCode = copy.keyCode;
                    this.code = copy.code;

                    this.isCompiled = this.compile();
                }
            }
        }
        private setType(type : string){
            this.type = type;
            switch (this.type){
                case CdvLogic.TYPES[0] :
                    this.code = "print(\"disparar\")";
                    this.actions = CdvCommon.weaponActions;
                    this.keyCode = Phaser.Keyboard.W;
                    break;
                case CdvLogic.TYPES[1] :
                    this.actions = CdvCommon.coreActions;
                    break;
                case CdvLogic.TYPES[2] :
                    this.actions = CdvCommon.motionActions;
                    this.code = "print(\"saltar\")";
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3] :
                    this.actions = CdvCommon.dronActions;
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
            runit(this);
        }
        public execAction(output : string){
            this.actions[output]();
        }
        /**
         * Devuelve el estado actual del juego (respuesta a las preguntas)
         * en una hash query-->valor respuesta
         */
        public answerQuerys() : any{

            // enTierra? --> function(){ return Player.body.onfloor;}
        }
        public showCode() : void{

            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        }
        public compile() : boolean{
            //TODO return Bridge.compile(this)
            return true;
        }
    }
}