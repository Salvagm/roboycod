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
        private static _canInstantiate = false;

        constructor() {

            if(!KeyboardHandler._canInstantiate){
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            KeyboardHandler._instance = this;

        }
        public static getInstance():KeyboardHandler {
            if(KeyboardHandler._instance === null) {
                KeyboardHandler._canInstantiate = true;
                KeyboardHandler._instance = new KeyboardHandler();
                KeyboardHandler._canInstantiate = false;
            }
            return KeyboardHandler._instance;
        }
        public setupStage(stage : Roboycod.Stage, player : Roboycod.Player) : void{

            this.disableBrowserEvents(stage);

            var enter = stage.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var tab   = stage.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            stage.game.input.keyboard.addKeyCapture(tab.keyCode);
            tab.enabled=true;

            tab.onDown.add(stage.navToInventory,stage);
            enter.onDown.add(stage.navToWorldMap,stage);
            this.setupPlayer(player);

            //TODO GODMODE

            var one = stage.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            var two = stage.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            var three = stage.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            var four = stage.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

            var zero = stage.game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
            var gm = Roboycod.GameManager.getInstance();
            zero.onDown.add(gm.clearData, gm);
            var g = stage.game.input.keyboard.addKey(Phaser.Keyboard.G);
            g.onDown.add(gm.save, gm);

            one.onDown.add(stage.GENERATECDV, stage, null, 0);
            two.onDown.add(stage.GENERATECDV, stage, null, 1);
            three.onDown.add(stage.GENERATECDV, stage, null, 2);
            four.onDown.add(stage.GENERATECDV, stage, null, 3);

            //TODO FIN GODMODE
        }
        public setupPlayer(player : Roboycod.Player) : void{


            var arrowLeft = player.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            var arrowRight = player.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            arrowLeft.onHoldCallback = player.moveLeft;
            arrowLeft.onHoldContext = player;
            arrowRight.onHoldCallback = player.moveRight;
            arrowRight.onHoldContext = player;
            arrowLeft.onUp.add(player.stopMove, player);
            arrowRight.onUp.add(player.stopMove, player);


        }
        public setupWorldMap(worldMap : Roboycod.WorldMap) : void{

            this.disableBrowserEvents(worldMap);

            var enter = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            var tab   = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            worldMap.game.input.keyboard.addKeyCapture(tab.keyCode);
            tab.enabled=true;

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

            //TODO GODMODE

            var zero = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
            var gm = Roboycod.GameManager.getInstance();
            zero.onDown.add(gm.clearData, gm);
            var g = worldMap.game.input.keyboard.addKey(Phaser.Keyboard.G);
            g.onDown.add(gm.save, gm);

            //TODO FIN GODMODE
        }
        public setupInventory(inventory : Roboycod.Inventory) : void{

            this.disableBrowserEvents(inventory);

            var tab   = inventory.game.input.keyboard.addKey(Phaser.Keyboard.TAB);
            inventory.game.input.keyboard.addKeyCapture(tab.keyCode);
            tab.enabled=true;

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

            //TODO GOD MODE
            var gm = Roboycod.GameManager.getInstance();
            var g = inventory.game.input.keyboard.addKey(Phaser.Keyboard.G);
            g.onDown.add(gm.save, gm);
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
                    return item.runCode;
                }
                )(item);

                key.onDown.add(f,item);
            }
        }
        private disableBrowserEvents(state : Phaser.State){
            var ctrl = state.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
            state.game.input.keyboard.addKeyCapture(ctrl.keyCode);
            ctrl.enabled=true;
            var S = state.game.input.keyboard.addKey(Phaser.Keyboard.S);
            state.game.input.keyboard.addKeyCapture(S.keyCode);
            S.enabled=true;
        }
    }

}