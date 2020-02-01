var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'cattack', { preload: preload, create: create, update: update });
let stat = true;
function preload ()
{
    game.load.image('sky', 'assets/sky.png');
    game.load.spritesheet('gato', 'assets/images/gatos_sprite_sheet.png', 32, 32, 96);
    game.load.spritesheet('coin', 'assets/images/coin-sprite-animation.png', 100, 100, 10);
}

function create ()
{
    game.physics.startSystem(Phaser.Physics.ARCADE);
    startScreen();
}

function update ()
{
    teclas();
    
}

function startScreen(){
    game.add.image(0, 0, 'sky');
    moneda(200,300);
    gato(1)
}

function moneda(x, y) {
    golden_coin = game.add.sprite(x, y, 'coin');
    game.physics.enable(golden_coin, Phaser.Physics.ARCADE);
    golden_coin.body.immovable = true;
    golden_coin.scale.setTo(.22, .22);
    golden_coin.body.setSize(5, 5, 3, 3);
    golden_coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
    golden_coin.animations.play('spin');
}

function gato(x) {
    gato = game.add.sprite(x * 24, x * 500, 'gato')
    game.physics.enable(gato, Phaser.Physics.ARCADE);
    gato.body.setSize(10, 10, 45, 45);
    gato.scale.setTo(3,3);
    gato.animations.add('walk_left', [12, 13, 14], 10, true);
    gato.animations.add('walk_right', [24, 25, 26], 10, true);
    gato.animations.play('walk_right');
}

function teclas() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        gato.x -= 3;
        // state = "left";
        // anima(state);
        console.log('izquierda')
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        gato.x += 3;
        // state = "right";
        // anima(state);
        console.log('derecha')
    }
}