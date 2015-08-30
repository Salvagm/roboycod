/**
 * Created by salva on 30/08/15.
 */
///<reference path="../../../../game/cdvs/CdvCommon.ts"/>

module IOSystem
{
    //TODO revisar entero ha sido copyPaste de Motion
    export class DronBuffer
    {
        private static _instance        : DronBuffer = null;
        private static _canInstantiate  : boolean = false;
        private static querys           : {[id : string] : string} = {"qEnemy" : "Enemigo ="};
        private states                  : {[name : string] : any};
        private doc                     : Document;

        public hasEnemy                    : boolean;

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
         * @returns {DronBuffer} Objeto de tipo DronBuffer creado
         */
        public static getInstance() : DronBuffer
        {
            if(DronBuffer._instance === null)
            {
                DronBuffer._canInstantiate = true;
                DronBuffer._instance = new DronBuffer();
                DronBuffer._canInstantiate = false;
            }

            return DronBuffer._instance;
        }

        /**
         * Constructor de la clase unicamente accesible una vez, en el caso de que no haya sido instanciado todavia
         */
        constructor()
        {
            if(!DronBuffer._canInstantiate)
                throw Error("Fail to instantiate, use DronBuffer.getInstance() instead");
            this.states = {};
            this.doc = document;

            DronBuffer.inputStates.push(this.doc.getElementById('stEnemy'));

            DronBuffer.outputActions = this.doc.getElementById('dronOutput');

        }

        public resetInputs()
        {
            this.hasEnemy = false;

            var keyList = Object.keys(DronBuffer.querys);

            for(var key in keyList)
            {
                this.doc.getElementById(keyList[key]).innerHTML = DronBuffer.querys[keyList[key]];
            }

            this.updateInput();
        }

        /**
         * Devuelve una instantanea de los estados del player cuando se llama a esta funcion
         * @returns {{}} hahsMap que contiene como clave el nombre del estado y valor el estado que tiene
         */
        public getSnapShot() : any
        {
            this.states[Roboycod.CdvCommon.dronQuerys[0]] = this.hasEnemy;

            //this.states['enPared?'] = this.inWall;

            return this.states;
        }

        /**
         * Escribe el mensaje en el buffer de salida
         * @param msg mensaje recibido desde los hilos
         */
        public updateOutput(action : string) : void
        {
            DronBuffer.outputActions.innerHTML += action;
            DronBuffer.outputActions.scrollTop = DronBuffer.outputActions.scrollHeight;
        }

        /**
         * Refresca todos los estados en la parte de estados del buffer
         */
        public updateInput()
        {
            DronBuffer.inputStates[0].innerHTML = this.hasEnemy.toString();
        }
    }
}