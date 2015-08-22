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
        CompilerBridge.prototype.runit = function (code, id) {
            //TODO realizar cambios aqui para en un futuro se almacene el objeto que se crea en el array
            console.log(code);
            if (id !== undefined) {
                console.log("Entro donde no debo");
                return -1;
            }
            else {
                this.compilerWorker.postMessage({ code: code, type: "motion" });
                this.timeOutExec = setTimeout(this.breakWorker, this.compileMaxTime, this);
            }
            return this.info;
        };
        /**
         * Funcion que unicamente compila el codigo, sin ejecutarlo
         * @param code codigo escrito en el lenguaje soprotado
         * @returns {boolean} devuelve true si ha conseguido compilar, false en otro caso
         */
        CompilerBridge.prototype.compile = function (code) {
            this.compilerWorker.postMessage(code);
            return false;
        };
        CompilerBridge.prototype.executionTime = function (time) {
            this.compileMaxTime = time;
        };
        CompilerBridge.prototype.breakWorker = function (cB) {
            cB.compilerWorker.terminate();
        };
        CompilerBridge.prototype.proccessMsg = function (info) {
            var cB = CompilerBridge.getInstace();
            clearTimeout(cB.timeOutExec);
            // TODO gestionar info
            cB.info = new Compiler.ParseData(info.data._isCompiled, info.data._code);
            console.log(cB.info);
            cB.compiledObjetcs.push(new Function(cB.info.getCode()));
            cB.compiledObjetcs[0]();
        };
        CompilerBridge.prototype.proccessErr = function (info) {
            var cB = CompilerBridge.getInstace();
            //TODO gestionar Error
            console.log("Error"); // TODO FUnciona cuando lanza un error!!!
            clearTimeout(cB.timeOutExec);
        };
        CompilerBridge._instance = null;
        CompilerBridge._canInstantiate = false;
        return CompilerBridge;
    })();
    BufferSystem.CompilerBridge = CompilerBridge;
})(BufferSystem || (BufferSystem = {}));
//# sourceMappingURL=CompilerBridge.js.map