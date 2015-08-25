/**
 * Created by javi on 15/04/15.
 */

///<reference path ="ICompiler.ts"/>
///<reference path ="CCompiler.ts"/>
///<reference path="INotifier.ts"/>

/**
 * Esta clase se encagarga de la comunicacion entre el juego y el compilador
 * Gestiona los buffers de entrada y salida que seran actualizados por quien los requiera
 */
module IOSystem
{
    // TODO Hacer esta clase singleton
    export class CompilerBridge
    {
        private static _instance        : CompilerBridge = null;
        private static _canInstantiate  : boolean = false;

        private listOfCdv               : {[idCdv : number] : Roboycod.CdvLogic};
        private compiledObjetcs         : {[idFunc : number] : Function};
        private info                    : Compiler.ParseData;
        private compilerWorker          : Worker;
        private compileMaxTime          : number;
        private timeOutExec             : Array<number>;
        private execute                 : boolean;

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
            this.compiledObjetcs = {};
            this.listOfCdv = {};
            this.execute = false;
            this.timeOutExec = [];

            CompilerBridge._instance = this;
        }

        public getInfo() : Compiler.ParseData
        {
            return this.info;
        }


        /**
         * Funcion que ejecuta el codigo que escribe el usuario
         * @param codeOrId parametro que puede ser un codigo o un ID
         * @param cdv parte del robot que manda la compilacion
         */
        public runit(codeOrId : any, cdv : Roboycod.CdvLogic) : void
        {
            this.execute = true;
            if(typeof codeOrId === "number")
            {
                this.runCode(codeOrId);
            }
            else
            {
                var position = Math.abs(Math.random() * Date.now() | 0);
                this.listOfCdv[position] = cdv;


                //TODO mirar el tiempo q tarda en compilar, ya que tendremos que enviar el id del timeOut para luego cortarlo bien
                this.compilerWorker.postMessage({code : codeOrId, type : "motion", id : position});
                this.timeOutExec.unshift(setTimeout(this.breakWorker, this.compileMaxTime,this));
            }


        }

        /**
         * Funcion que unicamente compila el codigo, sin ejecutarlo
         * @param code codigo escrito en el lenguaje soprotado
         * @returns {boolean} devuelve true si ha conseguido compilar, false en otro caso
         */
        public compile(code : string) : void
        {
            this.execute = false;
            this.compilerWorker.postMessage(code);
            this.timeOutExec.unshift(setTimeout(this.breakWorker, this.compileMaxTime,this));
        }

        public executionTime(time : number)
        {
            this.compileMaxTime = time;
        }

        private addNewProgram(code : string) : number
        {
            // TODO Notificar al CDV cual es el ID de ejecucion de su programa
            var position = Math.abs(Math.random() * Date.now() | 0);
                this.compiledObjetcs[position] = new Function(code);
            //TODO Modificar para que sea mediante workers


            if(this.execute)
                this.compiledObjetcs[position]();

            return position;
        }

        private breakWorker(cB : CompilerBridge)
        {
            cB.compilerWorker.terminate();
        }

        private runCode(id : number)
        {
            this.compiledObjetcs[id]();
        }
        private proccessMsg (info) : void
        {

            var cB : CompilerBridge = CompilerBridge.getInstace();

            clearTimeout(cB.timeOutExec.pop());

            cB.info = new Compiler.ParseData(info.data.isCompiled,info.data.code);

            var index = cB.addNewProgram(cB.info.getCode());

            //TODO cB.listOfCdv[info.data.id].ProgramId(index);

        }

        private proccessErr(info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            //TODO gestionar Error
            console.log("Error"); // TODO FUnciona cuando lanza un error!!!
            clearTimeout(cB.timeOutExec.pop());
        }


    }


}