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

        public inAir                    : boolean;
        public inGround                 : boolean;
   //   public inWall : boolean;

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

        constructor()
        {
            if(!MotionBuffer._canInstantiate)
                throw Error("Fail to instantiate, use MotionBuffer.getInstance() instead");
            this.states = {};
            this.inAir = true;
            this.inGround = true;
        }

        public getSnapShot() : any
        {
            this.states[Roboycod.CdvCommon.motionQuerys[0]] = this.inGround;
            this.states[Roboycod.CdvCommon.motionQuerys[1]] = this.inAir;
            //this.states['enPared?'] = this.inWall;

            return this.states;
        }

        public writeMessage(msg : string) : void
        {
            console.log(msg);
        }

    }
}