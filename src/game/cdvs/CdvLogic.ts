/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>

module Roboycod {

    export class CdvLogic {

        //TODO mirar si sacar estaticos una clase Common
        //Estaran en el orden en que los representa el inventario
        public static TYPES         :string[] = ['weapon', 'core', 'motion', 'dron'];
        //TODO hacer que le id sea persistente en el localStorage
        public static idCount       :number = 0;
        /**
         * Cuando se cree el player, se asignara
         */
        public static player        : Roboycod.Player;

        //TODO Crear Run(id cdv.id) y readBuffer(id), si la salida coincide
        //TODO con la salida de ese tipo, se ejecuta la funcion del diccionario

        //Diccionarios de acciones - funcion
        public static weaponActions :{[action : string] : Function;} = {};
        public static coreActions   :{[action : string] : Function;} = {};
        public static motionActions :{[action : string] : Function;} = {};
        public static dronActions   :{[action : string] : Function;} = {};
        public static coreQuerys    :string[];
        public static motionQuerys  :string[];
        public static dronQuerys    :string[];
        public static weaponQuerys  :string[];


        //En el constructor asignaremos el diccionario concreto segun su tipo
        private actions  :{[action : string] : Function;} = {};
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

        //TODO DEMOCODE
        public expectedOutput   : string = "SALTO";
        //TODO END DEMOCODE

        constructor(type : string){
            this.id = CdvLogic.idCount;
            this.type = type;
            this.isSelected = false;

            switch (this.type){
                case CdvLogic.TYPES[0] :
                    this.actions = CdvLogic.weaponActions;
                    break;
                case CdvLogic.TYPES[1] :
                    this.actions = CdvLogic.coreActions;
                    break;
                case CdvLogic.TYPES[2] :
                    this.actions = CdvLogic.motionActions;
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3] :
                    this.actions = CdvLogic.dronActions;
                    break;
                default :
                    console.log("No existe el tipo de cdv al asignar tabla de acciones");
            }

            //TODO DEMOCODE
            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE

            //Se incrementa el contador de IDs
            CdvLogic.idCount++;
        }
        public static setPlayer(player : Player){
            CdvLogic.player = player;

            /*
             * Inicializamos los diccionarios de acciones
             */
            CdvLogic.motionQuerys['SALTO'] = CdvLogic.player.jump;
        }

        /**
         * Ejecutara la accion de la instacia
         */
        public execAction() : void{
            //Segun el type de esa instancia, leera de un buffer concreto
            //y buscara el valor de la key

            //TODO codigo con skulpt

            runCode();

            var interpreterOutput = document.getElementById("output");
            var output : string = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);

            //TODO fin con skulpt
            this.actions[output]();
        }
        public loadCode(){

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