/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../states/Game.ts"/>
var Roboycod;
(function (Roboycod) {
    var GameManager = (function () {
        function GameManager() {
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
        GameManager.save = function (game) {
            if (localStorage.getItem(GameManager.key)) {
                localStorage.removeItem(GameManager.key);
            }
            GameManager.data = game.cache.getJSON('gameData');
            localStorage.setItem(GameManager.key, GameManager.data);
        };
        /**
         * Trata de cargar los datos de la memoria y si no carga los iniciales
         * @param game
         */
        GameManager.load = function (game) {
            if (localStorage.getItem(GameManager.key)) {
                GameManager.data = localStorage.getItem(GameManager.key);
            }
            GameManager.data = game.cache.getJSON('gameData');
        };
        GameManager.getData = function (game) {
            if (GameManager.data === undefined) {
                GameManager.load(game);
            }
            return GameManager.data;
        };
        GameManager.clearData = function () {
            GameManager.data = undefined;
        };
        GameManager._instance = null;
        GameManager.key = 'roboycodData';
        return GameManager;
    })();
    Roboycod.GameManager = GameManager;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=GameManager.js.map