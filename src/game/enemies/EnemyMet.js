/**
 * Created by salva-pc on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="EnemyBase.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var roboycod;
(function (roboycod) {
    var EnemyMet = (function (_super) {
        __extends(EnemyMet, _super);
        function EnemyMet(game) {
            _super.call(this, game, 128, 128, 'megaMet');
            this.LIVES = 5;
            this.GRAVITY = 1800;
            //this.body.health = this.LIVES;
            //this.body.bounce.y = 0;
            //this.body.gravity.y = this.GRAVITY;
            //this.body.setSize(40,40,5,5);
            //this.x = 10;
            //this.y = this.game.height/2;
        }
        return EnemyMet;
    })(roboycod.EnemyBase);
    roboycod.EnemyMet = EnemyMet;
})(roboycod || (roboycod = {}));
//# sourceMappingURL=EnemyMet.js.map