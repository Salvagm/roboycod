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

        constructor(other : Object){

            if(other !== undefined){

                if(typeof other == "string"){
                    var type = <string> other;
                    this.setType(type);
                    this.id = CdvLogic.idCount;
                    this.isSelected = false;
                    CdvLogic.idCount++;
                }
                else{
                    var copy : CdvLogic = <CdvLogic> other;
                    this.id = copy.id;
                    this.setType(copy.type);
                    this.isCompiled = copy.isCompiled;
                    this.isSelected = copy.isSelected;
                    this.keyCode = copy.keyCode;
                    this.code = copy.code;
                }
            }
        }
        private setType(type : string){
            this.type = type;
            switch (this.type){
                case CdvLogic.TYPES[0] :
                    this.code = "print(\"disparar\")";
                    this.actions = CdvLogic.weaponActions;
                    this.keyCode = Phaser.Keyboard.W;
                    break;
                case CdvLogic.TYPES[1] :
                    this.actions = CdvLogic.coreActions;
                    break;
                case CdvLogic.TYPES[2] :
                    this.actions = CdvLogic.motionActions;
                    this.code = "print(\"saltar\")";
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3] :
                    this.actions = CdvLogic.dronActions;
                    break;
                default :
                    console.log("No existe el tipo de cdv al asignar tabla de acciones");
            }
        }
        public static setPlayer(player : Player){
            CdvLogic.player = player;

            //TODO pasar a Player.shoot , Player.jump,etc aun asi necesitan el contexto
            /*
             * Inicializamos los diccionarios de acciones
             */
            CdvLogic.weaponActions['disparar'] = (function(player){return player.shoot;})(player);


            CdvLogic.motionActions['saltar'] = (function(player){return player.jump;})(player);
        }

        /**
         * Ejecutara la accion de la instacia
         */
        public execAction() : void{
            //Segun el type de esa instancia, leera de un buffer concreto
            //y buscara el valor de la key

            //TODO Pasar a Bridge con tiempos de espera

            var output = runCode(this.code);

            //TODO Pasar a Bridge

            console.log("Codigo : " + this.code);
            console.log("Output : " + output);

            this.actions[output](CdvLogic.player);
        }
        public showCode() : void{

            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        }
    }
}