/**
 * Created by salva on 30/08/15.
 */
///<reference path="../../../../game/cdvs/CdvCommon.ts"/>

    
module IOSystem
{
    //TODO Revisar entero ha sido copyPaste de motionbuffer
    export class CoreBuffer
    {
        private static _instance        : CoreBuffer = null;
        private static _canInstantiate  : boolean = false;
        private static querys           : {[id : string] : string} = {"qPickUp" : "PickUp =", qLife: "Vida ="};
        private states                  : {[name : string] : any};
        private doc                     : Document;

        public pickUp                    : number;
        public life                 : number;
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
         * @returns {CoreBuffer} Objeto de tipo CoreBuffer creado
         */
        public static getInstance() : CoreBuffer
        {
            if(CoreBuffer._instance === null)
            {
                CoreBuffer._canInstantiate = true;
                CoreBuffer._instance = new CoreBuffer();
                CoreBuffer._canInstantiate = false;
            }

            return CoreBuffer._instance;
        }

        /**
         * Constructor de la clase unicamente accesible una vez, en el caso de que no haya sido instanciado todavia
         */
        constructor()
        {
            if(!CoreBuffer._canInstantiate)
                throw Error("Fail to instantiate, use CoreBuffer.getInstance() instead");
            this.states = {};
            this.doc = document;

            CoreBuffer.inputStates.push(this.doc.getElementById('stPickUp'));
            CoreBuffer.inputStates.push(this.doc.getElementById('stLife'));
            CoreBuffer.outputActions = this.doc.getElementById('coreOutput');

        }

        public resetInputs()
        {
            this.pickUp = 0;
            this.life = 0;
            var keyList = Object.keys(CoreBuffer.querys);

            for(var key in keyList)
            {
                this.doc.getElementById(keyList[key]).innerHTML = CoreBuffer.querys[keyList[key]];
            }

            this.updateInput();
        }

        /**
         * Devuelve una instantanea de los estados del player cuando se llama a esta funcion
         * @returns {{}} hahsMap que contiene como clave el nombre del estado y valor el estado que tiene
         */
        public getSnapShot() : any
        {
            this.states[Roboycod.CdvCommon.coreQuerys[0]] = this.pickUp;
            this.states[Roboycod.CdvCommon.coreQuerys[1]] = this.life;
            //this.states['enPared?'] = this.inWall;

            return this.states;
        }

        /**
         * Escribe el mensaje en el buffer de salida
         * @param msg mensaje recibido desde los hilos
         */
        public updateOutput(action : string) : void
        {
            CoreBuffer.outputActions.innerHTML += action;
            CoreBuffer.outputActions.scrollTop = CoreBuffer.outputActions.scrollHeight;
        }

        /**
         * Refresca todos los estados en la parte de estados del buffer
         */
        public updateInput()
        {
            CoreBuffer.inputStates[0].innerHTML = this.pickUp.toString();
            CoreBuffer.inputStates[1].innerHTML = this.life.toString();
        }
    }
}