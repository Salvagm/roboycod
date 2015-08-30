/**
 * Created by javi on 25/08/15.
 */
///<reference path="../player/Player.ts"/>

module Roboycod {

    export class CdvCommon {

        private static _instance:CdvCommon = null;
        private static _canInstantiate = false;

        //Diccionarios de acciones - funcion
        public static weaponHash :{[action : string] : Function;} = {};
        public static coreHash   :{[action : string] : Function;} = {};
        public static motionHash :{[action : string] : Function;} = {};
        public static dronHash   :{[action : string] : Function;} = {};

        //Acciones que pueden realizarse
        public static wActs : string[] = [
            'disparar', 'recargar'
        ];
        public static cActs : string[] = [
            'defender', 'curar'
        ];
        public static mActs : string[] = [
            'saltar', 'saltarEnAire', 'embestir'
        ];
        public static dActs : string[] = [
            'disparar', 'avanzar', 'bombardear', 'proteger'
        ];

        //Preguntas sobre el estado del juego
        public static weaponQuerys  : string[] = [
            'carga?'
        ];
        public static coreQuerys    : string[] = [
            'pickup?', 'vida?'
        ];
        public static motionQuerys  : string[] = [
            'enTierra?', 'enAire?'
        ];
        public static dronQuerys    : string[] = [
            'enemigo?'
        ];

        constructor() {
            if(!CdvCommon._canInstantiate){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            CdvCommon._instance = this;
        }
        public static getInstance():CdvCommon {
            if(CdvCommon._instance === null) {
                CdvCommon._canInstantiate = true;
                CdvCommon._instance = new CdvCommon();
                CdvCommon._canInstantiate = false;
            }
            return CdvCommon._instance;
        }

        /**
         * Mandamos la instancia del player a inicializar los diccionarios
         */
        public initCdvDictionaries(player : Player) : void{
            /*
             * Para asignar correctamente los diccionarios con sus ambitos
             * Se ejecuta una funcion que devuelve una funcion
             * que ejecuta la accion en el contexto del player
             */

            // WEAPON
            CdvCommon.weaponHash[CdvCommon.wActs[0]] = (function(player){
                return function(){player.shoot()};
            })(player);
            // CORE

            //MOTION
            CdvCommon.motionHash[CdvCommon.mActs[0]] = (function(player){
                return function(){player.jump()};
            })(player);

            //DRON
        }

    }
}