// Clase Game principal

var game = new Phaser.Game(600,550, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player = null;
var level = null;
var hud = null;
var bullet = null;
var keyboardHandler = null;

function preload()
{
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    hud = new HUD(game);

	level = new Level(game);
    level.preload();

    bullet = new Bullet(game);
    bullet.preload();

    player = new Player(game);
    player.preload();

    keyboardHandler = new KeyboardHandler(game);    
}

function create()
{
    level.create();    
    player.create();
    bullet.create();
    hud.create();
    keyboardHandler.create(); 
    
    this.game.camera.follow(player.sprite);   
}

function update() 
{
    player.update();
    level.update();
    bullet.update();  
    // game.debug.body(player.sprite);   
}


function render() {

    // game.debug.body(p);
    // game.debug.bodyInfo(player.sprite,12,34);

}