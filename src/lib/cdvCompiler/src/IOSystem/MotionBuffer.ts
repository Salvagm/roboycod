/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>
///<reference path="INotifier.ts"/>

module IOSystem
{
    export class MotionBuffer implements INotifier
    {
        private static _instance        : MotionBuffer = null;
        private static _canInstantiate  : boolean = false;


        private bufferIn                : Array<any>;
        private currentCdvs             : {[idCdv : number] : Roboycod.CdvLogic};

        public static getInstace() : MotionBuffer
        {
            if(MotionBuffer._instance === null)
            {
                MotionBuffer._canInstantiate = true;
                MotionBuffer._instance = new MotionBuffer();
                MotionBuffer._canInstantiate = false;
            }


            return MotionBuffer._instance;
        }

        constructor ()
        {
            if(!MotionBuffer._canInstantiate)
                throw Error("Fail to instantiate, use MotioBuffer.getInstance() instead");

            this.bufferIn = [];
            this.currentCdvs = {};

        }

        public consoleOut(input:string):number {
            //TODO enviar info la "consola"

            //TODO Notificar que se anaye el input a la posicion X del buffer al CDV
            return this.notify(input);

        }

        public notify (msg : string) : number
        {
            for(var ite in this.currentCdvs)
            {
                console.log(this.currentCdvs[ite]);
                //TODO this.currentCdvs[ite].doAction(msg);
            }
            return 0;
        }

        public addCdv(newCDV:Roboycod.CdvLogic):number {
            var position = Math.abs(Math.random() * Date.now() | 0 );
            this.currentCdvs[position] = newCDV;
            return position;
        }

        public removeCdv(id:number):boolean {
            if(this.currentCdvs[id] !== undefined)
            {
                delete this.currentCdvs[id];
                return true;
            }
            return false;
        }
    }
}