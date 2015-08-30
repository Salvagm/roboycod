/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../states/Game.ts"/>

module Roboycod{

    export class GameManager{

        private static _instance:GameManager = null;
        private static _canInstantiate = false;


        public game  : Phaser.Game;
        private key  : string = 'roboycodData';
        private data : any;

        constructor() {
            if(!GameManager._canInstantiate){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            GameManager._instance = this;
        }

        public static getInstance():GameManager {
            if(GameManager._instance === null) {
                GameManager._canInstantiate = true;
                GameManager._instance = new GameManager();
                GameManager._canInstantiate = false;
            }
            return GameManager._instance;
        }
        public save() :void{
            if(localStorage.getItem(this.key)){
                localStorage.removeItem(this.key);
            }
            localStorage.setItem(this.key, JSON.stringify(this.data));
        }

        /**
         * Trata de cargar los datos de la memoria y si no carga los iniciales
         * @param game
         */
        public load(){
            if(localStorage.getItem(this.key)){
                this.data = JSON.parse(localStorage.getItem(this.key));
            }
            else{
                this.data = this.game.cache.getJSON('gameData');
            }
        }
        public getData() : any{
            if(this.data === undefined){
                this.load();
            }
            return this.data;
        }
        public clearData(){
            if(localStorage.getItem(this.key)){
                delete window.localStorage[this.key];
                this.data = this.game.cache.getJSON('gameData');
            }
        }
        public fadeOut () {
            var spr_bg = this.game.add.graphics(0, 0);
            spr_bg.beginFill(0, 1);
            spr_bg.drawRect(0, 0, this.game.world.width, this.game.world.height*2);
            spr_bg.alpha = 1;
            spr_bg.endFill();

            var s = this.game.add.tween(spr_bg)
            s.to({ alpha: 0 }, 500, null)
            s.start();
        }
    }
}