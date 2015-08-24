/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../states/Game.ts"/>

module Roboycod{

    export class GameManager{

        private static _instance:GameManager = null;

        private key  : string = 'roboycodData';

        private data : any;

        constructor() {
            if(GameManager._instance){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            GameManager._instance = this;
        }

        public static getInstance():GameManager {
            if(GameManager._instance === null) {
                GameManager._instance = new GameManager();
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
        public load(game : Game){
            if(localStorage.getItem(this.key)){
                this.data = JSON.parse(localStorage.getItem(this.key));
            }
            else{
                this.data = game.cache.getJSON('gameData');
            }
        }
        public getData(game : Game) : any{
            if(this.data === undefined){
                this.load(game);
            }
            return this.data;
        }
        public clearData(){
            this.data = undefined;
        }
    }
}