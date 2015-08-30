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

        private listOfCdv               : {[idCdv : number] : Roboycod.CdvLogic};
        private compiledObjetcs         : {[idFunc : number] : string};
        private info                    : Compiler.ParseData;
        private compilerWorker          : Worker;
        private compileMaxTime          : number;
        private timeOutExec             : Array<number>;
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

            this.compilerWorker = new Worker("src/Compiler/CCompiler.js");
            this.compileMaxTime = 2000; // 2 segundos maximo
            this.compilerWorker.addEventListener("message",this.proccessMsg,false);
            this.compilerWorker.addEventListener("error",this.proccessErr, false);
            this.compiledObjetcs = {};
            this.listOfCdv = {};
            this.execute = false;
            this.timeOutExec = [];

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
                this.executeProgram(this.compiledObjetcs[cdv.id], cdv);
            }
            else
            {
                var position = Math.abs(Math.random() * Date.now() | 0);
                this.listOfCdv[position] = cdv;
                this.compilerWorker['CDV'] = cdv;

                //TODO mirar el tiempo q tarda en compilar, ya que tendremos que enviar el id del timeOut para luego cortarlo bien
                this.compilerWorker.postMessage({code : cdv.code, type : cdv.type, id : position});
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
        private addNewProgram(code : string) : number
        {
            var position = Math.abs(Math.random() * Date.now() | 0);
                this.compiledObjetcs[position] = code;
            return position;
        }

        /**
         * Ejecuta un codigo que ha sido traducido y envia las respuestas al CDV que manda ejecucion
         * @param code codigo que queremos ejecutar
         * @param cdv CDV al que queremo enviar las salidas de la ejecucion
         */
        private executeProgram (code : string, cdv : Roboycod.CdvLogic) : void
        {
            var wProgram = new Worker("src/IOSystem/WorkProgram.js");
            wProgram['CDV'] = cdv;

            wProgram.addEventListener("message", this.sendInfoToCdv,false);
            wProgram.addEventListener("error",this.runError,false);
            var cdvStates = this.getStates(cdv.type);

            wProgram.postMessage({code : code, playerState : cdvStates});

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
        private breakWorker(cB : CompilerBridge)
        {
            cB.compilerWorker.terminate();
        }

        /**
         * FUncion que procesa la informacion que se recibe desde el hilo del compilador
         * @param info informacion recibida
         */
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

        /**
         * Funcion que procesa los errores que hayan podido generarse durante la compilacion
         * @param info informacion que recibimos
         */
        private proccessErr(info) : void
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();
            //TODO gestionar Error
            var errMsg : string = info.message.split("Uncaught Error: ")[1];
            cB.sendBufferInfo(info.target.CDV.type, errMsg);
            clearTimeout(cB.timeOutExec.pop());
        }

        /**
         * Funcion que envia la informacion recibida por un worker al CDV
         * @param info informacion que recibimos
         */
        private sendInfoToCdv(info)
        {
            var cB : CompilerBridge = CompilerBridge.getInstace();

            console.log(info.data.output);

            //info.taget.CDV.execAction(info.data.output)

        }

        /**
         * Funcion que se ejecuta si se ha producido un error al ejecutar una funcion
         * @param info informacion del error
         */
        private runError(info)
        {
            info.target.terminate();
        }
    }


}