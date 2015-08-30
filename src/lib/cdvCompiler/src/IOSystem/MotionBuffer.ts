/**
 * Created by salva on 27/08/15.
 */
///<reference path="../../../../game/cdvs/CdvCommon.ts"/>


    
module IOSystem
{
    export class MotionBuffer
    {

        private static _instance        : MotionBuffer = null;
        private static _canInstantiate  : boolean = false;
        private states                  : {[name : string] : any};
        private doc                     : Document;
        public inAir                    : boolean;
        public inGround                 : boolean;
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
         * @returns {MotionBuffer} Objeto de tipo MotionBuffer creado
         */
        public static getInstance() : MotionBuffer
        {
            if(MotionBuffer._instance === null)
            {
                MotionBuffer._canInstantiate = true;
                MotionBuffer._instance = new MotionBuffer();
                MotionBuffer._canInstantiate = false;
            }

            return MotionBuffer._instance;
        }

        /**
         * Constructor de la clase unicamente accesible una vez, en el caso de que no haya sido instanciado todavia
         */
        constructor()
        {
            if(!MotionBuffer._canInstantiate)
                throw Error("Fail to instantiate, use MotionBuffer.getInstance() instead");
            this.states = {};
            this.inAir = true;
            this.inGround = true;
            this.doc = document;
            MotionBuffer.inputStates.push(this.doc.getElementById('stInAir'));
            MotionBuffer.inputStates.push(this.doc.getElementById('stInGround'));
            MotionBuffer.outputActions = this.doc.getElementById('motionOutput');
            //;


        }

        /**
         * Devuelve una instantanea de los estados del player cuando se llama a esta funcion
         * @returns {{}} hahsMap que contiene como clave el nombre del estado y valor el estado que tiene
         */
        public getSnapShot() : any
        {
            this.states[Roboycod.CdvCommon.motionQuerys[0]] = this.inGround;
            this.states[Roboycod.CdvCommon.motionQuerys[1]] = this.inAir;
            //this.states['enPared?'] = this.inWall;

            return this.states;
        }

        /**
         * Escribe el mensaje en el buffer de salida
         * @param msg mensaje recibido desde los hilos
         */
        public updateOutput(action : string) : void
        {
            MotionBuffer.outputActions.innerHTML += action;
        }

        /**
         * Refresca todos los estados en la parte de estados del buffer
         */
        public updateInput()
        {
            MotionBuffer.inputStates[0].innerHTML = this.inAir.toString();
            MotionBuffer.inputStates[1].innerHTML = this.inGround.toString();
        }

    }
}