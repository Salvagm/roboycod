/**
 * Created by javi on 15/04/15.
 */

///<reference path ="ICompiler.ts"/>
///<reference path ="CCompiler.ts"/>
/**
 * Esta clase se encagarga de la comunicacion entre el juego y el compilador
 * Gestiona los buffers de entrada y salida que seran actualizados por quien los requiera
 */
module BufferSystem
{
    // TODO Hacer esta clase singleton
    export class CompilerBridge
    {

        public compiledObjetcs          : Array<Function>;
        private info                    : Compiler.ParseData;
        private static _instance        : CompilerBridge = null;
        private static _canInstantiate  : boolean = false;
        private compilerWorker          : Worker;
        private compileMaxTime          : number;
        private timeOutExec             : any;

        public static getInstace() : CompilerBridge
        {
            if(CompilerBridge._instance === null)
            {
                CompilerBridge._canInstantiate = true;
                CompilerBridge._instance = new CompilerBridge();
                CompilerBridge._canInstantiate = false;
            }
            return CompilerBridge._instance;
        }

        constructor()
        {
            if(!CompilerBridge._canInstantiate)
                throw Error("Fail to instantiate, use CompilerBridge.getInstance() instead");

            //TODO En un futuro cambiar para que pueda cargar otros compiladores distintos

            this.compilerWorker = new Worker("src/CCompiler.js");
            this.compileMaxTime = 2000; // 2 segundos maximo
            this.compilerWorker.addEventListener("message",this.proccessMsg,false);
            this.compilerWorker.addEventListener("error",this.proccessErr, false);
            this.compiledObjetcs = new Array<Function>();
            CompilerBridge._instance = this;
        }

        public getInfo() : Compiler.ParseData
        {
            return this.info;
        }

        /**
         * Funcion que ejecuta el codigo que escribe el usuario
         * @param code codigo escrito en el lenguaje soportado
         * @param id identificador que se asigna al codigo para almacenarlo
         * @returns {number} devuevle el numero del identificador
         */
        public runit(code? : string, id? : number) : any
        {
            //TODO realizar cambios aqui para en un futuro se almacene el objeto que se crea en el array
            console.log(code);
            if(id !== undefined)
            {
                console.log("Entro donde no debo");
                return -1;
            }
            else
            {
                this.compilerWorker.postMessage({code : code, type : "motion"});
                this.timeOutExec =  setTimeout(this.breakWorker, this.compileMaxTime,this);
            }

            return this.info;
        }

        /**
         * Funcion que unicamente compila el codigo, sin ejecutarlo
         * @param code codigo escrito en el lenguaje soprotado
         * @returns {boolean} devuelve true si ha conseguido compilar, false en otro caso
         */
        public compile(code : string) : boolean
        {
            this.compilerWorker.postMessage(code);
            return false;
        }

        public executionTime(time : number)
        {
            this.compileMaxTime = time;
        }

        private breakWorker(cB : CompilerBridge)
        {
            cB.compilerWorker.terminate();
        }


        private proccessMsg (info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            clearTimeout(cB.timeOutExec);
            // TODO gestionar info
            cB.info = new Compiler.ParseData(info.data._isCompiled,info.data._code);
            console.log(cB.info);
            cB.compiledObjetcs.push(new Function(cB.info.getCode()));
            cB.compiledObjetcs[0]();
        }

        private proccessErr(info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            //TODO gestionar Error
            console.log("Error"); // TODO FUnciona cuando lanza un error!!!
            clearTimeout(cB.timeOutExec);
        }
    }


}