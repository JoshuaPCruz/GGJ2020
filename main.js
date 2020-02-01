var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'cattack', { preload: preload, create: create, update: update });
let gato;

function preload ()
{
    game.load.image('sky', 'assets/sky.png');
    game.load.spritesheet('gato', 'assets/images/gatos_sprite_sheet.png', 32, 32, 96);
    game.load.spritesheet('coin', 'assets/images/coin-sprite-animation.png', 100, 100, 10);
}

function create ()
{
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 50, 50);
    startScreen();
    game.physics.p2.enable(gato);
    game.camera.follow(gato, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function update ()
{
    teclas();
}

function startScreen(){
    game.add.image(0, 0, 'sky');
    moneda(200,300);
    gato_update(2)
}

function moneda(x, y) {
    golden_coin = game.add.sprite(x, y, 'coin');
    game.physics.enable(golden_coin, Phaser.Physics.P2JS);
    golden_coin.body.immovable = true;
    golden_coin.scale.setTo(.22, .22);
    //golden_coin.body.setSize(5, 5, 3, 3);
    golden_coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    golden_coin.animations.play('spin');
}

function gato_update(x) {
    gato = game.add.sprite(x * 24, x * 24, 'gato')
    game.physics.enable(gato, Phaser.Physics.P2JS);
    //gato.body.setSize(10, 10, 15, 15);
    
    gato.animations.add('walk_left', [12, 13, 14], 10, true);
    gato.animations.add('walk_right', [24, 25, 26], 10, true);
    

    gato.animations.play('walk_right');
}

function teclas() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        gato.body.moveUp(300);
        game.camera.x -=3;
        //state = "left";
        //anima(state);
        console.log('izquierda')
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        gato.x += 3;
        //state = "right";
        //anima(state);
        console.log('derecha')
    }
}