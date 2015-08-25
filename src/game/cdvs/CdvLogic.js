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
        function CdvLogic(other) {
            //En el constructor asignaremos el diccionario concreto segun su tipo
            this.actions = {};
            if (other !== undefined) {
                if (typeof other == "string") {
                    var type = other;
                    this.setType(type);
                    this.id = CdvLogic.idCount;
                    this.isSelected = false;
                    CdvLogic.idCount++;
                }
                else {
                    var copy = other;
                    this.id = copy.id;
                    this.setType(copy.type);
                    this.isCompiled = copy.isCompiled;
                    this.isSelected = copy.isSelected;
                    this.keyCode = copy.keyCode;
                    this.code = copy.code;
                }
            }
        }
        CdvLogic.prototype.setType = function (type) {
            this.type = type;
            switch (this.type) {
                case CdvLogic.TYPES[0]:
                    this.code = "print(\"disparar\")";
                    this.actions = CdvLogic.weaponActions;
                    this.keyCode = Phaser.Keyboard.W;
                    break;
                case CdvLogic.TYPES[1]:
                    this.actions = CdvLogic.coreActions;
                    break;
                case CdvLogic.TYPES[2]:
                    this.actions = CdvLogic.motionActions;
                    this.code = "print(\"saltar\")";
                    this.keyCode = Phaser.Keyboard.SPACEBAR;
                    break;
                case CdvLogic.TYPES[3]:
                    this.actions = CdvLogic.dronActions;
                    break;
                default:
                    console.log("No existe el tipo de cdv al asignar tabla de acciones");
            }
        };
        CdvLogic.setPlayer = function (player) {
            //TODO pasar a Player.shoot , Player.jump,etc aun asi necesitan el contexto
            /*
             * Inicializamos los diccionarios de acciones
             */
            CdvLogic.weaponActions['disparar'] = (function (player) {
                return player.shoot;
            })(player);
            CdvLogic.motionActions['saltar'] = (function (player) {
                return player.jump;
            })(player);
        };
        /**
         * Ejecutara la accion de la instacia
         */
        CdvLogic.prototype.execAction = function () {
            //Segun el type de esa instancia, leera de un buffer concreto
            //y buscara el valor de la key
            //TODO Pasar a Bridge con tiempos de espera
            var output = runCode(this.code);
            //TODO Pasar a Bridge, hacer un callback bridge.OnCompleteRun(
            //TODO  this.actions[output](CdvLogic.player);
            //TODO  )
            this.actions[output]();
        };
        CdvLogic.prototype.showCode = function () {
            var editor = ace.edit("editor");
            editor.setValue(this.code, -1);
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