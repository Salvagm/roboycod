/**
 * Created by javi on 15/04/15.
 */
///<reference path ="ICompiler.ts"/>
///<reference path ="CCompiler.ts"/>
/**
 * Esta clase se encagarga de la comunicacion entre el juego y el compilador
 * Gestiona los buffers de entrada y salida que seran actualizados por quien los requiera
 */
var BufferSystem;
(function (BufferSystem) {
    // TODO Hacer esta clase singleton
    var CompilerBridge = (function () {
        function CompilerBridge() {
            if (!CompilerBridge._canInstantiate)
                throw Error("Fail to instantiate, use CompilerBridge.getInstance() instead");
            //TODO En un futuro cambiar para que pueda cargar otros compiladores distintos
            this.compilerWorker = new Worker("src/CCompiler.js");
            this.compileMaxTime = 2000; // 2 segundos maximo
            this.compilerWorker.addEventListener("message", this.proccessMsg, false);
            this.compilerWorker.addEventListener("error", this.proccessErr, false);
            this.compiledObjetcs = new Array();
            this.execute = false;
            this.timeOutExec = new Array();
            CompilerBridge._instance = this;
        }
        CompilerBridge.getInstace = function () {
            if (CompilerBridge._instance === null) {
                CompilerBridge._canInstantiate = true;
                CompilerBridge._instance = new CompilerBridge();
                CompilerBridge._canInstantiate = false;
            }
            return CompilerBridge._instance;
        };
        CompilerBridge.prototype.getInfo = function () {
            return this.info;
        };
        /**
         * Funcion que ejecuta el codigo que escribe el usuario
         * @param code codigo escrito en el lenguaje soportado
         * @param id identificador que se asigna al codigo para almacenarlo
         * @returns {number} devuevle el numero del identificador
         */
        /**
         *
         * @param codeOrId parametro que puede ser un codigo o un ID
         */
        CompilerBridge.prototype.runit = function (codeOrId) {
            this.execute = true;
            if (typeof codeOrId === "number") {
                this.runCode(codeOrId);
            }
            else {
                //TODO mirar el tiempo q tarda en compilar, ya que tendremos que enviar el id del timeOut para luego cortarlo bien
                this.compilerWorker.postMessage({ code: codeOrId, type: "motion" });
                this.timeOutExec.unshift(setTimeout(this.breakWorker, this.compileMaxTime, this));
            }
        };
        /**
         * Funcion que unicamente compila el codigo, sin ejecutarlo
         * @param code codigo escrito en el lenguaje soprotado
         * @returns {boolean} devuelve true si ha conseguido compilar, false en otro caso
         */
        CompilerBridge.prototype.compile = function (code) {
            this.execute = false;
            this.compilerWorker.postMessage(code);
            this.timeOutExec.unshift(setTimeout(this.breakWorker, this.compileMaxTime, this));
            return true;
        };
        CompilerBridge.prototype.executionTime = function (time) {
            this.compileMaxTime = time;
        };
        CompilerBridge.prototype.addNewProgram = function (code) {
            // TODO Notificar al CDV cual es el ID de ejecucion de su programa
            var position = this.compiledObjetcs.push(new Function(code));
            --position;
            if (this.execute)
                this.compiledObjetcs[position]();
            return position;
        };
        CompilerBridge.prototype.breakWorker = function (cB) {
            console.log("Termino Worker");
            cB.compilerWorker.terminate();
        };
        CompilerBridge.prototype.runCode = function (id) {
            this.compiledObjetcs[id]();
        };
        CompilerBridge.prototype.proccessMsg = function (info) {
            var cB = CompilerBridge.getInstace();
            clearTimeout(cB.timeOutExec.pop());
            cB.info = new Compiler.ParseData(info.data._isCompiled, info.data._code);
            cB.addNewProgram(cB.info.getCode());
        };
        CompilerBridge.prototype.proccessErr = function (info) {
            var cB = CompilerBridge.getInstace();
            //TODO gestionar Error
            console.log("Error"); // TODO FUnciona cuando lanza un error!!!
            clearTimeout(cB.timeOutExec.pop());
        };
        CompilerBridge._instance = null;
        CompilerBridge._canInstantiate = false;
        return CompilerBridge;
    })();
    BufferSystem.CompilerBridge = CompilerBridge;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=CompilerBridge.js.map