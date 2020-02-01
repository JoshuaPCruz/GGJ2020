var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    game.load.spritesheet('gato', 'assets/gatos_sprite_sheet.png', 32, 32, 96);
}

function create ()
{
}

function update ()
{
    teclas();
}

function teclas() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        gato.x -= 3;
        state = "left";
        anima(state);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        gato.x += 3;
        state = "right";
        anima(state);
    }
}

function gato_anima(x) {
    gato = game.add.sprite(x * 24, x * 24, 'gato')
    game.physics.enable(gato, Phaser.Physics.ARCADE);
    gato.body.setSize(10, 10, 15, 15);
    gato.body.collideWorldBounds = true;

    gato.animations.add('walk_front', [0, 1, 2], 10, true);
    gato.animations.add('walk_left', [12, 13, 14], 10, true);
    gato.animations.add('walk_right', [24, 25, 26], 10, true);
    gato.animations.add('walk_back', [36, 37, 38], 10, true);
}