/**
 * Created by javi on 15/04/15.
 */
///<reference path="MotionBuffer.ts"/>
///<reference path ="../Compiler/ParseData.ts"/>
///<reference path="../../../../game/cdvs/CdvLogic.ts"/>


module IOSystem
{

    /**
     * Esta clase se encagarga de la comunicacion entre el juego y el compilador
     * Gestiona los buffers de entrada y salida que seran actualizados segun las llamadas de los CDV
     */
    export class CompilerBridge
    {
        private static _instance        : CompilerBridge = null;
        private static _canInstantiate  : boolean = false;

        private compiledObjetcs         : {[idFunc : number] : string};
        private lisOfCdv                : {[idCdv : number] : Roboycod.CdvLogic};
        private info                    : Compiler.ParseData;
        private compilerWorker          : Worker;
        private compileMaxTime          : number;
        private timeOutCompile          : Array<number>;
        private timeOutExe              : Array<number>;
        private execute                 : boolean;

        /**
         * Devuelve la instancia unica de la clase
         * @returns {CompilerBridge} objeto unico de tipo CompilerBridge
         */
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
        /**
         * Constructor que solo es llamado una vez, ya que solo puede exitir un unica instancia
         */
        constructor()
        {
            if(!CompilerBridge._canInstantiate)
                throw Error("Fail to instantiate, use CompilerBridge.getInstance() instead");

            //TODO En un futuro cambiar para que pueda cargar otros compiladores distintos

            this.compilerWorker = new Worker("src/lib/cdvCompiler/src/Compiler/CCompiler.js");
            this.compileMaxTime = 2000; // 2 segundos maximo
            this.compilerWorker.addEventListener("message",this.proccessCompileMsg,false);
            this.compilerWorker.addEventListener("error",this.proccessCompileErr, false);
            //this.compilerWorker.postMessage({cmd : "load"});
            this.compiledObjetcs = {};
            this.execute = false;
            this.timeOutCompile = [];
            this.timeOutExe = [];
            this.lisOfCdv = {};
            CompilerBridge._instance = this;
        }

        /**
         * Devuelve la informacion de compilacion
         * @returns {Compiler.ParseData} Objeto que contiene la informacion de compilacion
         */
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
                if(!cdv.isCompiled)
                {

                }
                console.log("Ejecuto id " + this.compiledObjetcs[cdv.id]);
                this.executeProgram(this.compiledObjetcs[cdv.id], cdv);
            }
            else
            {

                this.compilerWorker['CDV'] = cdv;

                //TODO mirar el tiempo q tarda en compilar, ya que tendremos que enviar el id del timeOut para luego cortarlo bien
                this.compilerWorker.postMessage({code : cdv.code, type : cdv.type});
                this.timeOutCompile.unshift(setTimeout(this.breakCompilerWorker, this.compileMaxTime,this));
            }


        }

        /**
         * Funcion que unicamente compila el codigo, sin ejecutarlo
         * @param code codigo escrito en el lenguaje soprotado
         * @returns {boolean} devuelve true si ha conseguido compilar, false en otro caso
         */
        public compile(cdv : Roboycod.CdvLogic, x? : number, y? : number) : void
        {
            this.execute = false;
            this.lisOfCdv[cdv.id] = cdv;
            this.compilerWorker["targetX"] = x;
            this.compilerWorker["targetY"] = y;

            this.compilerWorker.postMessage({code : cdv.code, type : cdv.type, id : cdv.id});
            this.timeOutCompile.unshift(setTimeout(this.breakCompilerWorker, this.compileMaxTime,this));
        }

        /**
         * Establece el tiempo limite de ejecucion
         * @param time tiempo introducido por el usuario
         */
        public executionTime(time : number) : void
        {
            this.compileMaxTime = time;
        }

        /**
         * Anyade un el codigo compilador a un array interno con un codigo unico
         * @param code codigo resultante de la compilacion
         * @returns {number} identificador unico que se asigna
         */
        private addNewProgram(code : string, id : number) : void
        {
            this.compiledObjetcs[id] = code;
        }

        /**
         * Ejecuta un codigo que ha sido traducido y envia las respuestas al CDV que manda ejecucion
         * @param code codigo que queremos ejecutar
         * @param cdv CDV al que queremo enviar las salidas de la ejecucion
         */
        private executeProgram (code : string, cdv : Roboycod.CdvLogic) : void
        {
            var wProgram = new Worker("src/lib/cdvCompiler/src/IOSystem/WorkProgram.js");
            wProgram['CDV'] = cdv;

            wProgram.addEventListener("message", this.sendInfoToCdv,false);
            wProgram.addEventListener("error",this.runError,false);
            var cdvStates = this.getStates(cdv.type);

            wProgram.postMessage({code : code, playerState : cdvStates});
            this.timeOutExe.unshift(setTimeout(this.breakExecWorker,this.executionTime, wProgram));
        }

        /**
         * Obtiene los estados actual que hay en los distintos buffers
         * @param cdvType typo de buffer del que queremos extraer los estados
         * @returns {any} Devuelve la hash con los estados
         */
        private getStates (cdvType : string) : any
        {
            switch (cdvType)
            {
                case Roboycod.CdvLogic.TYPES[0] : //weapon
                    break;
                case Roboycod.CdvLogic.TYPES[1] : // core
                    break;
                case Roboycod.CdvLogic.TYPES[2] : // motion
                    return MotionBuffer.getInstance().getSnapShot();
                    break;
                case Roboycod.CdvLogic.TYPES[3] : // dron
                    break;
                default :
                    console.log("Type is not suported");
            }
        }

        /**
         * Funcion que envia las salidas de compilacion/ejecucion al buffer para que las muestre
         * @param cdvType type de buffer al que queremos enviar la informacion
         * @param msg mensaje a enviar
         */
        private sendBufferInfo(cdvType : string, msg : string) : void
        {
            switch (cdvType)
            {
                case Roboycod.CdvLogic.TYPES[0] : //weapon
                    break;
                case Roboycod.CdvLogic.TYPES[1] : // core
                    break;
                case Roboycod.CdvLogic.TYPES[2] : // motion
                    MotionBuffer.getInstance().writeMessage(msg);
                    break;
                case Roboycod.CdvLogic.TYPES[3] : // dron
                    break;
                default :
                    console.log("Type is not suported");
            }
        }

        /**
         * Funcion que termina un worker si este no ha compleato la tarea, la cual se llama desde otros ambitos
         * @param cB esta misma clase que pasamos al metodo, ya que puede ser invocada desde otro ambitos
         */
        private breakCompilerWorker(cB : CompilerBridge)
        {
            cB.compilerWorker.terminate();
            cB.compilerWorker = new Worker("src/lib/cdvCompiler/src/Compiler/CCompiler.js");
        }

        /**
         * FUncion que finaliza la ejecucion de un worker si sobrepasa un tiempo determinado
         * @param currentWorker worker que queremos terminar
         */
        private breakExecWorker(currentWorker : Worker)
        {
            currentWorker.terminate();
        }

        /**
         * FUncion que procesa la informacion que se recibe desde el hilo del compilador
         * @param info informacion recibida
         */
        private proccessCompileMsg (info) : void
        {

            var cB : CompilerBridge = CompilerBridge.getInstace();
            clearTimeout(cB.timeOutCompile.pop());
            var cdv : Roboycod.CdvLogic;
            if(info.data.cmd === "error")
            {
                cdv = cB.compilationError(info.data);
            }
            else
            {
                cdv = cB.lisOfCdv[info.data.id];
                cB.info = new Compiler.ParseData(info.data.isCompiled,info.data.code);
                cB.addNewProgram(cB.info.getCode(),cdv.id);

                cdv.isCompiled = cB.info.isCompiled();
            }
            if(info.target.targetX !== undefined && info.target.targetY !== undefined )
                cdv.graphicUpdate(info.target.targetX,info.target.targetY);

        }
        private compilationError(data : any )
        {
            this.sendBufferInfo(data.type,data.msg);
            var cdv : Roboycod.CdvLogic = this.lisOfCdv[data.id];
            console.log(data.code);
            cdv.isCompiled = data.isCompiled;

            return cdv;
        }

        /**
         * Funcion que procesa los errores que hayan podido generarse durante la compilacion
         * @param info informacion que recibimos
         */
        private proccessCompileErr(info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();

                //TODO gestionar Error
                var errMsg : string = info.message.split("Uncaught Error: ")[1];
                console.log(errMsg);
                //TODO enviar al buffer
                //cB.sendBufferInfo(info.target.CDV.type, errMsg);
                clearTimeout(cB.timeOutCompile.pop());

        }

        /**
         * Funcion que envia la informacion recibida por un worker al CDV
         * @param info informacion que recibimos
         */
        private sendInfoToCdv(info)
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            clearTimeout(cB.timeOutExe.pop());
            if(info.data.output === "saltar") console.log("salto");
            console.log(info.data.output);

            info.taget.CDV.execAction(info.data.action);
            cB.sendBufferInfo(info.target.CDV.type,info.data.output);
        }

        /**
         * Funcion que se ejecuta si se ha producido un error al ejecutar una funcion
         * @param info informacion del error
         */
        private runError(info)
        {
            info.target.terminate();
            //clearTimeout(cB.timeOutExe.pop());
        }
    }


}