/**
 * Created by javi on 15/04/15.
 */

///<reference path ="../Compiler/ICompiler.ts"/>
///<reference path ="../Compiler/CCompiler.ts"/>
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
        private compiledObjetcs         : {[idFunc : number] : string};
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
         * @param cdv parte del robot que manda la compilacion
         */
        public runit(cdv : Roboycod.CdvLogic) : void
        {
            this.execute = true;
            if(cdv.id !== -1)
            {
                this.executeProgram(this.compiledObjetcs[cdv.id], cdv);
            }
            else
            {
                var position = Math.abs(Math.random() * Date.now() | 0);
                this.listOfCdv[position] = cdv;


                //TODO mirar el tiempo q tarda en compilar, ya que tendremos que enviar el id del timeOut para luego cortarlo bien
                this.compilerWorker.postMessage({code : cdv.code, type : "motion", id : position});
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
                this.compiledObjetcs[position] = code;
            //TODO Modificar para que sea mediante workers


            return position;
        }
        private executeProgram (code : string, cdv : Roboycod.CdvLogic)
        {
            var wProgram = new Worker("src/WorkProgram.js");
            wProgram['CDV'] = cdv;
            wProgram.addEventListener("message", this.sendInfoToCdv,false);
            wProgram.addEventListener("error",this.runError,false);

            wProgram.postMessage(code);

        }
        private breakWorker(cB : CompilerBridge)
        {
            cB.compilerWorker.terminate();
        }

        private runCode(id : number)
        {
            // TODO modificar por worker
            //this.compiledObjetcs[id]();
        }
        private proccessMsg (info) : void
        {

            var cB : CompilerBridge = CompilerBridge.getInstace();

            clearTimeout(cB.timeOutExec.pop());

            cB.info = new Compiler.ParseData(info.data.isCompiled,info.data.code);

            var index = cB.addNewProgram(cB.info.getCode());
            cB.listOfCdv[info.data.id].isCompiled = cB.info.isCompiled();
            cB.listOfCdv[info.data.id].id = index;
            cB.executeProgram(cB.compiledObjetcs[index],cB.listOfCdv[info.data.id]);
            //TODO cB.listOfCdv[info.data.id].ProgramId(index);

        }

        private proccessErr(info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            //TODO gestionar Error

            console.log("Error"); // TODO FUnciona cuando lanza un error!!!
            clearTimeout(cB.timeOutExec.pop());
        }

        private sendInfoToCdv(info)
        {
            //if(info.data.cmd === "end")
            //{
            //    info.target.terminate();
            //}

            //info.taget.CDV.execAction(info.data.output);
            console.log(info.data.output);
        }

        private runError(info)
        {
            info.target.terminate();
        }
    }


}