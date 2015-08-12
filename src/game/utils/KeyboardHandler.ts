/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
    ///<reference path="../player/Player.ts"/>

module Roboycod {

    export class KeyboardHandler extends Phaser.Keyboard{

        private W       : Phaser.Key;
        private A       : Phaser.Key;
        private S       : Phaser.Key;
        private D       : Phaser.Key;
        private space   : Phaser.Key;
        private enter   : Phaser.Key;
        private tab     : Phaser.Key;

        private arrowUp     : Phaser.Key;
        private arrowLeft   : Phaser.Key;
        private arrowDown   : Phaser.Key;
        private arrowRight  : Phaser.Key;

        constructor(game: Phaser.Game) {

            super(game);

            this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.tab   = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);

            this.arrowUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.arrowLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.arrowDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.arrowRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        }
        public setupStage(player : Roboycod.Player) : void{

            this.arrowLeft.onHoldCallback = player.moveLeft;
            this.arrowLeft.onHoldContext = player;
            this.arrowRight.onHoldCallback = player.moveRight;
            this.arrowRight.onHoldContext = player;
            this.space.onHoldCallback = player.jump;
            this.space.onHoldContext = player;

            this.W.onHoldCallback = player.shoot;
            this.W.onHoldContext = player;

            this.addCallbacks(player, null, player.stopMove, null);

        }
        public setUpWorldMap(worldMap : Roboycod.WorldMap) : void{

            this.arrowUp.onDown.add(worldMap.moveSelection,worldMap,null,-1,0);
            this.arrowDown.onDown.add(worldMap.moveSelection,worldMap,null,1,0);
            this.arrowLeft.onDown.add(worldMap.moveSelection,worldMap,null,0,-1);
            this.arrowRight.onDown.add(worldMap.moveSelection,worldMap,null,0,1);

            this.tab.onDown.add(worldMap.navToInventory,worldMap);
            this.enter.onDown.add(worldMap.startStage,worldMap);
        }
        public setUpInventory(inventory : Roboycod.Inventory) : void{

            //this.arrowUp.onDown.add(worldMap.moveSelection,worldMap,null,-1,0);
            //this.arrowDown.onDown.add(worldMap.moveSelection,worldMap,null,1,0);
            //this.arrowLeft.onDown.add(worldMap.moveSelection,worldMap,null,0,-1);
            //this.arrowRight.onDown.add(worldMap.moveSelection,worldMap,null,0,1);

            this.tab.onDown.add(inventory.navToWorldMap,inventory);
            //this.enter.onDown.add(worldMap.startStage,worldMap);
        }
    }

}