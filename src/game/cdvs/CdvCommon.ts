/**
 * Created by javi on 25/08/15.
 */
module Roboycod {

    export class CdvCommon {

        private static _instance:CdvCommon = null;

        //Diccionarios de acciones - funcion
        public static weaponActions :{[action : string] : Function;} = {};
        public static coreActions   :{[action : string] : Function;} = {};
        public static motionActions :{[action : string] : Function;} = {};
        public static dronActions   :{[action : string] : Function;} = {};
        public static coreQuerys    :string[];
        public static motionQuerys  :string[];
        public static dronQuerys    :string[];
        public static weaponQuerys  :string[];

        constructor() {
            if(CdvCommon._instance){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            CdvCommon._instance = this;
        }
        public static getInstance():CdvCommon {
            if(CdvCommon._instance === null) {
                CdvCommon._instance = new CdvCommon();
            }
            return CdvCommon._instance;
        }

        /**
         * Inicializamos los diccionarios de acciones
         * @param player
         */
        public setPlayer(player : Player){
            /*
             * Se ejecuta una funcion que devuelve una funcion
             * que ejecuta la accion en el contexto del player
             */

            // WEAPON
            CdvCommon.weaponActions['disparar'] = (function(player){
                return function(){player.shoot()};
            })(player);
            // CORE

            //MOTION
            CdvCommon.motionActions['saltar'] = (function(player){
                return function(){player.jump()};
            })(player);

            //DRON
        }

    }
}