/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../states/Stage.ts"/>
///<reference path="../states/Inventory.ts"/>
///<reference path="../states/WorldMap.ts"/>

module Roboycod {

    export class KeyboardHandler{

        private static _instance:KeyboardHandler = null;

        constructor() {

            if(KeyboardHandler._instance){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            KeyboardHandler._instance = this;

        }
        public static getInstance():KeyboardHandler {
            if(KeyboardHandler._instance === null) {
                KeyboardHandler._instance = new KeyboardHandler();
            }
            return KeyboardHandler._instance;
        }
        public setupStage(stage : Roboycod.Stage, player : Roboycod.Player) : void{

            var tab   = stage.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            var enter = stage.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

            tab.onDown.add(stage.navToInventory,stage);
            enter.onDown.add(stage.navToWorldMap,stage);
            this.setupPlayer(player);
        }
        public setupPlayer(player : Roboycod.Player) : void{

            var space = player.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            var arrowLeft = player.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowRight = player.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            var W = player.game.input.keyboard.addKey(Phaser.Keyboard.W);

            arrowLeft.onHoldCallback = player.moveLeft;
            arrowLeft.onHoldContext = player;
            arrowRight.onHoldCallback = player.moveRight;
            arrowRight.onHoldContext = player;
            arrowLeft.onUp.add(player.stopMove, player);
            arrowRight.onUp.add(player.stopMove, player);


        }
        public setupWorldMap(worldMap : Roboycod.WorldMap) : void{

            var enter = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var tab   = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.TAB);

            var arrowUp = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            var arrowLeft = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowDown = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            var arrowRight = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            arrowUp.onDown.add(worldMap.moveSelection,worldMap,null,-1,0);
            arrowDown.onDown.add(worldMap.moveSelection,worldMap,null,1,0);
            arrowLeft.onDown.add(worldMap.moveSelection,worldMap,null,0,-1);
            arrowRight.onDown.add(worldMap.moveSelection,worldMap,null,0,1);

            tab.onDown.add(worldMap.navToInventory,worldMap);
            enter.onDown.add(worldMap.startStage,worldMap);
        }
        public setupInventory(inventory : Roboycod.Inventory) : void{

            var tab   = inventory.game.input.keyboard.addKey(Phaser.Keyboard.TAB);

            var arrowUp = inventory.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            var arrowLeft = inventory.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowDown = inventory.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            var arrowRight = inventory.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            var Equip = inventory.game.input.keyboard.addKey(Phaser.Keyboard.E);
            var Write = inventory.game.input.keyboard.addKey(Phaser.Keyboard.W);

            arrowUp.onDown.add(inventory.moveSelection,inventory,null,-1,0);
            arrowDown.onDown.add(inventory.moveSelection,inventory,null,1,0);
            arrowLeft.onDown.add(inventory.moveSelection,inventory,null,0,-1);
            arrowRight.onDown.add(inventory.moveSelection,inventory,null,0,1);
            Equip.onDown.add(inventory.equipCdv,inventory,null);
            Write.onDown.add(inventory.writeCdv,inventory,null);

            tab.onDown.add(inventory.navToLastState,inventory);

        }

        /**
         * Anyade las teclas a cada CDV seleccionado
         * @param stage
         * @param cdvList
         */
        public setupCdvs(stage : Roboycod.Stage, cdvList : CdvLogic[]): void{

            var item : CdvLogic;
            for (var i = 0; i< cdvList.length; ++i){

                item = cdvList[i];
                var key = stage.game.input.keyboard.addKey(item.keyCode);

                var f : Function;
                //Se ejecuta en el momento en el que se define
                //Devuelve la funcion creada en ese contexto
                f = (function(item)
                {
                    return item.execAction;
                }
                )(item);

                key.onDown.add(f,item);
            }
        }
    }

}