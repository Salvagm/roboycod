/**
 * Created by javi on 2/02/15.
 */
///<reference path="../../../build/phaser.d.ts"/>
///<reference path="../player/Player.ts"/>
///<reference path="../enemies/WalkingEnemy.ts"/>
///<reference path="../cdvs/CdvSprite.ts"/>
///<reference path="../cdvs/CdvLogic.ts"/>
///<reference path="../utils/KeyboardHandler.ts"/>
    ///<reference path="../utils/HUD.ts"/>


module Roboycod{

    export class Stage extends Phaser.State{

        private map         : Phaser.Tilemap;
        private groundLayer : Phaser.TilemapLayer;
        private finishZone  : Phaser.Sprite;
        private enemies     : Phaser.Group;
        private codevices   : Phaser.Group;
        private player      : Player;
        private numStage    : string;

        private cm          : CdvMatrix;
        private gameData    : any;

        public cdvLogicDemo : CdvLogic;

        //	Constants
        private ENEMY_L     : number = 3;
        private TRIGGER_L   : number = 4;

        //TODO convertir en hud de verdad
        private hudFake     : Phaser.Sprite;

        init(numStage : string){
            this.numStage = numStage;
        }

        create(){

            this.gameData = GameManager.getInstance().getData();
            this.cm = new CdvMatrix(this.gameData.cdvMatrix.data);

            this.loadStage();
            this.codevices = this.game.add.group();

            //TODO HUD FAKE DEMO
            this.hudFake = this.game.add.sprite(0, 0, 'hudfake', 0);
            this.hudFake.width = this.game.width;
            this.hudFake.height = this.game.height * 0.125;
            this.hudFake.fixedToCamera = true;

            //Definimos y mapeamos las teclas correspondientes
            KeyboardHandler.getInstance().setupStage(this, this.player);

            var cdvs : CdvLogic[] = this.cm.getEquiped();
            //Asiganmos teclas a los CDVs equipados
            KeyboardHandler.getInstance().setupCdvs(this, cdvs);
            //Compilamos los equipados

            for(var i = 0; i < cdvs.length; ++i){
                cdvs[i].compile();
            }
            GameManager.getInstance().fadeOut();
        }

        public navToInventory() {
            //TODO guardar datos de entidades
            GameManager.getInstance().save();
            this.game.state.start('Inventory', true, false, this.key, this.numStage);
        }

        /**
         * Segun el numero que tenga asignado el Stage, cargara unos datos u otros
         * NOTA : El orden en que creamos las capas determina que se pinta encima
         */
        public loadStage(){

            var tempJSON = this.game.cache.getJSON('jsonStage' + this.numStage);

            this.map = this.add.tilemap('tmStage' + this.numStage);
            this.map.addTilesetImage('tsStages');

            // El nombre es el valor "name:" del .json
            this.map.createLayer('background');
            this.map.createLayer('decoration');
            this.groundLayer = this.map.createLayer('ground');

            //id+1
            this.map.setCollisionBetween(1, 99, true, 'ground');
            this.groundLayer.resizeWorld();

            //Se define la zona donde acabamos el nivel
            this.finishZone = new Phaser.Sprite(
                this.game,
                tempJSON.layers[this.TRIGGER_L].objects[1].x,
                tempJSON.layers[this.TRIGGER_L].objects[1].y
            );
            this.game.physics.enable(this.finishZone);
            this.finishZone.body.width = tempJSON.layers[4].objects[1].width;
            this.finishZone.body.height = tempJSON.layers[4].objects[1].height;
            this.finishZone.tint = 0xff00ff;

            //Cargamos player
            this.player = new Player(
                this.game,
                tempJSON.layers[this.TRIGGER_L].objects[0].x,
                tempJSON.layers[this.TRIGGER_L].objects[0].y
            );

            //Cargamos enemigos
            this.loadEnemies(tempJSON.layers[this.ENEMY_L]);

        }

        private shootEnemy(enemy : Phaser.Sprite, shoot : Phaser.Sprite) : void
        {
            enemy.damage(shoot.health);
            shoot.kill();
        }

        private loadEnemies(enemyData : any) : void
        {
            this.enemies = this.game.add.group();
            for(var i = 0; i< enemyData.objects.length ; ++i)
                this.enemies.add(new WalkingEnemy(this.game,enemyData.objects[i].x,enemyData.objects[i].y));

        }
        private removeShoot(bullet : Phaser.Sprite, ground : Phaser.Tile) : void
        {
            bullet.kill();
        }

        /**
         * Esta funcion la implementara cada enemigo concreto. Si el enemigo muere,
         * se anyade un CDV en su posicion
         */
        private collideEnemy(player : Player , enemy : BaseEnemy) : void{

            enemy.collide(player, this.codevices);
        }
        private collideCdv(player : Player, cdv : SpriteCdv) : void{

            if(this.cm.add(cdv.logicType)){
                cdv.kill();
            }
            else{
                cdv.body.velocity.y = -300;
            }
        }

        private finishStage(){
            this.game.state.start('Stage', true, false, '0');
        }
        update(){
            this.game.debug.body(this.finishZone);

            this.game.physics.arcade.collide(this.groundLayer, this.player);
            this.game.physics.arcade.collide(this.groundLayer, this.enemies);
            this.game.physics.arcade.collide(this.groundLayer, this.codevices);

            this.game.physics.arcade.collide(this.enemies,this.enemies);
            this.game.physics.arcade.collide(this.player.gun,this.groundLayer,this.removeShoot);
            this.game.physics.arcade.collide(this.finishZone,this.player,this.finishStage,null,this);

            this.game.physics.arcade.overlap(this.enemies,this.player,this.collideEnemy, null, this);
            this.game.physics.arcade.overlap(this.codevices,this.player,this.collideCdv, null, this);
            this.game.physics.arcade.overlap(this.enemies,this.player.gun,this.shootEnemy);

        }
        public navToWorldMap() : void{

            GameManager.getInstance().save();
            this.game.state.start('WorldMap', true, false);

        }
        //TODO GODMODE
        public GENERATECDV(key : Phaser.Key, type : number ){

            var cdv : SpriteCdv = new SpriteCdv(
                this.game,
                this.player.x, this.player.y - this.player.height,
                CdvLogic.TYPES[type]
            );

            this.codevices.add(cdv);
            cdv.body.velocity.y = -200;
        }


    }
}