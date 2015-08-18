/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
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
        GameManager.prototype.save = function () {
        };
        GameManager._instance = null;
        return GameManager;
    })();
    Roboycod.GameManager = GameManager;
})(Roboycod || (Roboycod = {}));
//# sourceMappingURL=GameManager.js.map