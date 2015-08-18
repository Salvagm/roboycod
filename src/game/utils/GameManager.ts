/**
 * Created by javi on 18/08/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
    
module Roboycod{

    export class GameManager{

        private static _instance:GameManager = null;

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

        }
    }
}