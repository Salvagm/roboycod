/**
 * Created by salva on 30/08/15.
 */
///<reference path="../../../../game/cdvs/CdvCommon.ts"/>

module IOSystem
{
    //TODO revisar entero ha sido copyPaste de Motion
    export class WeaponBuffer
    {
        private static _instance        : WeaponBuffer = null;
        private static _canInstantiate  : boolean = false;
        private static querys           : {[id : string] : string} = {"qCharge" : "Carga ="};
        private states                  : {[name : string] : any};
        private doc                     : Document;

        public charge                   : number;
        /**
         * Estados de entrada
         * 0 - enAire?
         * 1 - enTierra?
         */
        private static inputStates     : HTMLElement[] = [];
        private static outputActions    : HTMLElement;
        //   public inWall : boolean;
        /**
         * Funcion estatica que devuelve el instancia del objeto si ha sido creado
         * @returns {WeaponBuffer} Objeto de tipo WeaponBuffer creado
         */
        public static getInstance() : WeaponBuffer
        {
            if(WeaponBuffer._instance === null)
            {
                WeaponBuffer._canInstantiate = true;
                WeaponBuffer._instance = new WeaponBuffer();
                WeaponBuffer._canInstantiate = false;
            }

            return WeaponBuffer._instance;
        }

        /**
         * Constructor de la clase unicamente accesible una vez, en el caso de que no haya sido instanciado todavia
         */
        constructor()
        {
            if(!WeaponBuffer._canInstantiate)
                throw Error("Fail to instantiate, use WeaponBuffer.getInstance() instead");
            this.states = {};
            this.doc = document;

            WeaponBuffer.inputStates.push(this.doc.getElementById('stCharge'));
            WeaponBuffer.outputActions = this.doc.getElementById('weaponOutput');

        }

        public resetInputs()
        {
            this.charge = 0;

            var keyList = Object.keys(WeaponBuffer.querys);

            for(var key in keyList)
            {
                this.doc.getElementById(keyList[key]).innerHTML = WeaponBuffer.querys[keyList[key]];
            }

            this.updateInput();
        }

        /**
         * Devuelve una instantanea de los estados del player cuando se llama a esta funcion
         * @returns {{}} hahsMap que contiene como clave el nombre del estado y valor el estado que tiene
         */
        public getSnapShot() : any
        {
            this.states[Roboycod.CdvCommon.weaponQuerys[0]] = this.charge;

            return this.states;
        }

        /**
         * Escribe el mensaje en el buffer de salida
         * @param msg mensaje recibido desde los hilos
         */
        public updateOutput(action : string) : void
        {
            WeaponBuffer.outputActions.innerHTML += action;
            WeaponBuffer.outputActions.scrollTop = WeaponBuffer.outputActions.scrollHeight;
        }

        /**
         * Refresca todos los estados en la parte de estados del buffer
         */
        public updateInput()
        {
            WeaponBuffer.inputStates[0].innerHTML = this.charge.toString();
        }
    }
}