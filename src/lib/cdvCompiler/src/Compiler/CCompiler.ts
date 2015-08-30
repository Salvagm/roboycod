/**
 * Created by salva on 15/08/15.
 */

///<reference path ="ICompiler.ts" />
///<reference path ="ParseData.ts" />
///<reference path="../../gramatica/CGrammar.d.ts"/>
    
module Compiler
{
    /**
     * Clase del compilador de C/C++ que contiene la gramatica
     * En esta clase se implementan las funciones necesarias para que la gramatica pueda acceder a ella
     */
    export class CCompiler implements ICompiler {

        private static _instance            : CCompiler = null;
        private static _canInstantiate      : boolean = false;
        public _cCompiler                   :CGrammar.Parser;
        private info                        :ParseData;
        private bufferType                  :string;
        private static dependencies         : string [] = ["../../gramatica/CGrammar.js", "ParseData.js"];
        /**
         * Constructor que solo es llamado una vez, ya que solo puede exitir un unica instancia
         */
        constructor() {
            if(!CCompiler._canInstantiate)
                throw Error("Fail to instantiate, use CCompiler.getInstance() instead");

            this.bufferType = "";
            this._cCompiler = new CGrammar.Parser();
        }

        /**
         * Funcion estatica que nos devuelve la instancia del compilador
         * @returns {CCompiler} devuelve la instancia unica de tipo CCompiler
         */
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

        /**
         * Establece el tipo de buffer al que debe enviar la informacion la compilacion
         * @param type cadena con el tipo de buffer
         */
        public setBufferType(type : string)
        {
            this.bufferType = type;
        }

        /**
         * Funcion que compila el codigo escrito por el usuario
         * @param code cadena con el codigo escrito
         * @returns {ParseData} Devuelve un objeto con la informacion de compilacion
         */
        public compile(code : string) : ParseData
        {

            var trad = this._cCompiler.parse(code);
            this.info = new ParseData(true,trad);

            return this.info;

        }
        public static getDependencies() : string[]
        {
            return CCompiler.dependencies;
        }

        // weapon, core, motion, dron
        /**
         * Devuelve la traduccion para que el compilador genere el codigo para enviar mensajes
         * @param code codigo que queremos enviar por mensaje
         * @returns {string} traduccion resultante que genera el compilador
         */
        public bufferTrad(code: string) : string
        {
            var codeAux = "";
            var index = code.indexOf("?");
            if(index !== -1)
                codeAux = code.split("+")[0];
            else
                codeAux = code;

            var trad : string ="if("+codeAux+".slice(-1) === \"?\"){";
            trad += "var action= IOSystem.WorkProgram.playerStates["+codeAux+"];}"; //;
            trad +="else {";
            trad += "IOSystem.sendMsg("+code+",";
            switch (this.bufferType)
            {
                case 'weapon' :
                    trad += "\"weapon\"";
                    break;
                case 'core' :
                    trad += "\"core\"";
                    break;
                case 'motion' :
                    trad += "\"motion\"";
                    break;
                case 'dron' :
                    trad += "\"dron\"";
                    break;
                default :
                    throw Error("Type is not defined or unknwon");
            }
            trad +=",\"cout\");}";
            //trad += "console.log(action);";
            return trad;
        }


    }
    // Fuera de la clase
    /**
     * Funcion que espera recibir un mensaje desde el hilo principal y manda al compilador
     * la ejecucion del codigo, una vez termina devuelve otro mensaje al hilo con el resutlado
     * de la compilacion
     */
    addEventListener("message",
        function(message)
        {
            var wCompiler = CCompiler.getInstance();
            if(message.data.cmd === "load")
            {
                var dependencies = CCompiler.getDependencies();
                dependencies.forEach(function(item)
                {
                    console.log("Cargo " +  item);
                    importScripts(item);
                });
            }
            var info : ParseData;

            wCompiler.setBufferType(message.data.type);

            info = wCompiler.compile(message.data.code);

            info.setCode(info.getCode() + " main();");
            var msg = {code : info.getCode(), isCompiled : info.isCompiled(), id : message.data.id};
            self.postMessage(msg,null);

        },false);

}
