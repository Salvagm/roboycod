/**
 * Created by salva on 15/08/15.
 */

///<reference path ="ICompiler.ts" />
///<reference path ="ParseData.ts" />
///<reference path="../gramatica/CGrammar.d.ts"/>
    
module Compiler
{
    export class CCompiler implements ICompiler {

        private static _instance            : CCompiler = null;
        private static _canInstantiate     : boolean = false;
        public _cCompiler                   :CGrammar.Parser;
        private info                        :ParseData;
        public bufferType                   : string;

        constructor() {
            if(!CCompiler._canInstantiate)
                throw Error("Fail to instantiate, use CCompiler.getInstance() instead");

            this.bufferType = "";
            this._cCompiler = new CGrammar.Parser();
        }

        public static getInstance():CCompiler
        {
            if(CCompiler._instance === null)
            {
                CCompiler._canInstantiate = true;
                CCompiler._instance =  new CCompiler();
                CCompiler._canInstantiate = false;
            }
            return CCompiler._instance;

        }
        public setBufferType(type : string)
        {
            this.bufferType = type;
        }
        public compile(code : string) : ParseData
        {
            try{
                var trad = this._cCompiler.parse(code);
                this.info = new ParseData(true,trad);
            }catch(e)
            {
                this.info = new ParseData(false,e);
            }
            return this.info;

        }

        // weapon, core, motion, dron
        public bufferTrad(code: string) : string
        {
            var cad : string = "BufferSystem";
            switch (this.bufferType)
            {
                case 'weapon' :
                    cad += ".WeaponBuffer";
                    break;
                case 'core' :
                    cad += ".CoreBuffer";
                    break;
                case 'motion' :
                    cad += ".MotionBuffer";
                    break;
                case 'dron' :
                    cad += ".DronBuffer";
                    break;
                default :
                    throw Error("Type is not defined or unknwon");
            }
            cad +=".getInstace().bufferOutAdd("+code+")";
            return cad;
        }


    }
    // Fuera de la clase
    addEventListener("message",
        function(e)
        {
            importScripts("../gramatica/CGrammar.js","ParseData.js");
            var wCompiler = CCompiler.getInstance();

            wCompiler.setBufferType(e.data.type);

            var info : ParseData = wCompiler.compile(e.data.code);

            info.setCode(info.getCode() + " main();");

            self.postMessage(info,null);

        }
        ,false);
}
