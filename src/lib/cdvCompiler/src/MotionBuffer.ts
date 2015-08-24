/**
 * Created by salva on 21/08/15.
 */
///<reference path="IBuffer.ts"/>

module BufferSystem
{
    export class MotionBuffer implements IBuffer
    {
        private static _instance        : MotionBuffer = null;
        private static _canInstantiate  : boolean = false;

        private bufferOut               : Array<string>;
        private bufferIn                : Array<string>;

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
            this.bufferOut = new Array<string>();
            this.bufferIn = new Array<string>();

        }

        bufferOutAdd(input:string):number {

            return this.bufferOut.push(input);

            //TODO Notificar que se anaye el input a la posicion X del buffer al CDV
        }

        bufferOutGet(id:number):string {

            return this.bufferOut.splice(id,1)[0];
        }




    }
}