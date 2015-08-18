/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../states/Game.ts"/>

module Roboycod{

    export class GameManager{

        private static _instance:GameManager = null;

        private static key  : string = 'roboycodData';

        private static data : any;

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
        public static save(game : Game) :void{
            if(localStorage.getItem(GameManager.key)){
                localStorage.removeItem(GameManager.key);
            }
            GameManager.data = game.cache.getJSON('gameData');
            localStorage.setItem(GameManager.key, GameManager.data);
        }

        /**
         * Trata de cargar los datos de la memoria y si no carga los iniciales
         * @param game
         */
        public static load(game : Game){
            if(localStorage.getItem(GameManager.key)){
                GameManager.data = localStorage.getItem(GameManager.key);
            }
            GameManager.data = game.cache.getJSON('gameData');
        }
        public static getData(game : Game) : any{
            if(GameManager.data === undefined){
                GameManager.load(game);
            }
            return GameManager.data;
        }
        public static clearData(){
            GameManager.data = undefined;
        }
    }
}