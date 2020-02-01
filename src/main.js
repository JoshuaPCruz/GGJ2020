


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var map;

function preload() {

    game.load.spritesheet('dude', 'assets/images/gatos_sprite_sheet.png', 32, 32, 96);
    game.load.image('background', 'assets/images/dark_sky.jpeg');
    map = game.add.group();
}

var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;


    game.physics.arcade.gravity.y = 250;
    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.inputEnabled = true;
    player.input.enableDrag();
    
    
    player.events.onInputOver.add(onOver, this);
    player.events.onInputOut.add(onOut, this);
    player.events.onDragStart.add(onDragStart, this);
    player.events.onDragStop.add(onDragStop, this);
    
    dragPosition = new Phaser.Point(player.x, player.y);
    
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    
    for (let index = 0; index < 3; index++) {
        map.add(player);
        console.log('gato '+index)
        
    }
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function onOver(sprite, pointer) {

    sprite.tint = 0xff7777;

}

function onOut(sprite, pointer) {

    sprite.tint = 0xffffff;

}

function onDragStart(sprite, pointer) {

    dragPosition.set(sprite.x, sprite.y);

}

function onDragStop(sprite, pointer) {

    if (!sprite.overlap(dropZone))
    {
        game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }

}

function update() {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        game.camera._position.x += 1;
        console.log(game.camera._position.x)

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}