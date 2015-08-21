/**
 * Created by javi on 17/08/15.
 *
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../../lib/ace/src-noconflict/ace.d.ts"/>
///<reference path="../../lib/skulpt/processCode.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
var Roboycod;
(function (Roboycod) {
    var CdvLogic = (function () {
        //TODO END DEMOCODE
        function CdvLogic(type) {
            //En el constructor asignaremos el diccionario concreto segun su tipo
            this.actions = {};
            //TODO DEMOCODE
            this.expectedOutput = "SALTO";
            this.id = CdvLogic.idCount;
            this.type = type;
            this.isSelected = false;
            switch (this.type) {
                case CdvLogic.TYPES[0]:
                    this.actions = CdvLogic.weaponActions;
                    break;
                case CdvLogic.TYPES[1]:
                    this.actions = CdvLogic.coreActions;
                    break;
                case CdvLogic.TYPES[2]:
                    this.actions = CdvLogic.motionActions;
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3]:
                    this.actions = CdvLogic.dronActions;
                    break;
                default:
                    console.log("No existe el tipo de cdv al asignar tabla de acciones");
            }
            //TODO DEMOCODE
            this.code = "print(\"SALTO\")";
            //TODO END DEMOCODE
            //Se incrementa el contador de IDs
            CdvLogic.idCount++;
        }
        CdvLogic.setPlayer = function (player) {
            CdvLogic.player = player;
            /*
             * Inicializamos los diccionarios de acciones
             */
            CdvLogic.motionQuerys['SALTO'] = CdvLogic.player.jump;
        };
        /**
         * Ejecutara la accion de la instacia
         */
        CdvLogic.prototype.execAction = function () {
            //Segun el type de esa instancia, leera de un buffer concreto
            //y buscara el valor de la key
            //TODO codigo con skulpt
            runCode();
            var interpreterOutput = document.getElementById("output");
            var output = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            //TODO fin con skulpt
            this.actions[output]();
        };
        CdvLogic.prototype.loadCode = function () {
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
        };
        CdvLogic.prototype.checkCode = function () {
            runCode();
            var interpreterOutput = document.getElementById("output");
            var output = interpreterOutput.textContent.toString().substr(0, this.expectedOutput.length);
            if (output == "SALTO") {
                return true;
            }
            return false;
        };
        //TODO mirar si sacar estaticos una clase Common
        //Estaran en el orden en que los representa el inventario
        CdvLogic.TYPES = ['weapon', 'core', 'motion', 'dron'];
        //TODO hacer que le id sea persistente en el localStorage
        CdvLogic.idCount = 0;
        //TODO Crear Run(id cdv.id) y readBuffer(id), si la salida coincide
        //TODO con la salida de ese tipo, se ejecuta la funcion del diccionario
        //Diccionarios de acciones - funcion
        CdvLogic.weaponActions = {};
        CdvLogic.coreActions = {};
        CdvLogic.motionActions = {};
        CdvLogic.dronActions = {};
        return CdvLogic;
    })();
    Roboycod.CdvLogic = CdvLogic;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=CdvLogic.js.map