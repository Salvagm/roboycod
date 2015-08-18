/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../states/Game.ts"/>
var Roboycod;
(function (Roboycod) {
    var GameManager = (function () {
        function GameManager() {
            this.key = 'roboycodData';
            if (GameManager._instance) {
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            GameManager._instance = this;
        }
        GameManager.getInstance = function () {
            if (GameManager._instance === null) {
                GameManager._instance = new GameManager();
            }
            return GameManager._instance;
        };
        GameManager.prototype.save = function () {
            if (localStorage.getItem(this.key)) {
                localStorage.removeItem(this.key);
            }
            localStorage.setItem(this.key, JSON.stringify(this.data));
        };
        /**
         * Trata de cargar los datos de la memoria y si no carga los iniciales
         * @param game
         */
        GameManager.prototype.load = function (game) {
            if (localStorage.getItem(this.key)) {
                this.data = JSON.parse(localStorage.getItem(this.key));
            }
            else {
                this.data = game.cache.getJSON('gameData');
            }
        };
        GameManager.prototype.getData = function (game) {
            if (this.data === undefined) {
                this.load(game);
            }
            return this.data;
        };
        GameManager.prototype.clearData = function () {
            this.data = undefined;
        };
        GameManager._instance = null;
        return GameManager;
    })();
    Roboycod.GameManager = GameManager;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=GameManager.js.map