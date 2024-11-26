let currentMap
let mapID, mapName, mapArray, locked, inspectable
let door1, door2, door3
let toggle = 0
let player

function keyPressed() {
    if (keyCode == 75) {
        if (toggle == 0) {
            toggle = 1
        }
        else if (toggle == 1) {
            toggle = 0
        }
        console.log(toggle)
    }
}

mapStorage = [ // map array, that should hold all the shapes, ID's and names of the maps
    {
        mapID: 1, mapName: "StarterMap", mapArray: [
            '11111111111111',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '11111131111111'
        ]
    },
    {
        mapID: 2, mapName: "Map2", mapArray: [
            '111111m1111111',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1ffffffffffff1',
            '1fff2ffff2fff1',
            '1fff2ffff2fffn',
            '1fff2ffff2fff1',
            '1ffffffffffff1',
            '1fffff22fffff1',
            '1ffffffffffff1',
            '11111111111111'
        ]
    },
    {
        mapID: 3, mapName: "childBedroom", mapArray: [
            '11111111111111',
            '1FFFFFFFFFFFF1',
            '1FFFFFFFFFFFF1',
            '1FFFFFFFFFFFF1',
            '1FFFFFFFFFFFF1',
            'bFFFFFFFFFFFF1',
            '1FFFFFFFFFFFF1',
            '1FFFFFFFFFFFF1',
            '1....222.....1',
            '1FFFFFFFFFFFF1',
            '11111111111111'
        ]
    }
]

// doorStorage = [door1, door2, door3]

let inventory = []
let gameWorldItems = []
let insideTile, outsideTile
let inspectTile

function preload() {
    img = loadImage('img.png')
    spriteImg = loadImage('catfront2.png')
    wall_text = loadImage('wall_text.png')
    floor_text = loadImage('floor_text(1).png')
    vingnetteOverlay = loadImage('ovalvignette.png')
}

function setup() {
    allSprites.rotationLock = true

    new Canvas('pixelated x4')

    //////////////////////////// WALLS AND FLOORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    insideTile = new Group();
    insideTile.w = 60;
    insideTile.h = 60;
    insideTile.tile = 1;
    insideTile.image = wall_text
    wall_text.scale = 0.12
    insideTile.collider = 's';

    outsideTile = new Group();
    outsideTile.w = 60;
    outsideTile.h = 60;
    outsideTile.tile = 2;
    outsideTile.collider = 's';
    outsideTile.color = 'green'

    inspectTile = new Group();
    inspectTile.w = 60;
    inspectTile.h = 60;
    inspectTile.tile = 'i';
    inspectTile.collider = 's';

    insideFloor = new Group()
    insideFloor.w = 60;
    insideFloor.h = 60;
    insideFloor.tile = 'f';
    insideFloor.image = floor_text
    floor_text.scale = 0.12
    insideFloor.collider = 'n';
    insideFloor.layer = -1

    outsideFloor = new Group()
    outsideFloor.w = 60;
    outsideFloor.h = 60;
    outsideFloor.tile = 'F';
    // insideFloor.image = floor_text
    // floor_text.scale = 0.12
    outsideFloor.collider = 'n';
    outsideFloor.layer = -1
    outsideFloor.color = '#301934'

    //\\\\\\\\\\\\\\\\\\\\\\\\\\ WALLS AND FLOORS /////////////////////////////

    //////////////////////////// DOORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    doors = new Group()
    doors.id = 0
    doors.w = 60;
    doors.h = 60;
    doors.tile = 3;
    doors.collider = 's';
    doors.color = 'lightblue';

    door1 = new Group()
    door1.id = 1
    door1.w = 60;
    door1.h = 60;
    door1.tile = 'm';
    door1.collider = 's';
    door1.color = 'lightblue';

    door2 = new Group()
    door2.id = 2
    door2.w = 60;
    door2.h = 60;
    door2.tile = 'n';
    door2.collider = 's';
    door2.color = 'lightblue';

    door3 = new Group()
    door3.id = 3
    door3.w = 60;
    door3.h = 60;
    door3.tile = 'b';
    door3.collider = 's';
    door3.color = 'lightblue';
    //\\\\\\\\\\\\\\\\\\\\\\\\\\ DOORS /////////////////////////////


    player = new Sprite(600, 600, 30, 30, 'd');
    player.image = spriteImg
    spriteImg.scale = 0.7
    player.layer = 0

    vingnette = new Sprite(player.x, player.y, innerWidth, innerHeight, 'n');
    vingnette.image = vingnetteOverlay
    vingnetteOverlay.scale = 0.5
    vingnette.layer = 1


    imgSprite = new Sprite(10000, 10000, 1000, 1000, 'n')
    imgSprite.image = img
    imgSprite.layer = 3

    starterMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)

    currentMap = starterMap

    RectangleworldBounds = rect(0,0, insideTile.w * 15, insideTile.h * 11);
    key = new Sprite(1000,1000,20,20,'k')
}


function draw() {
    clear()
    noStroke()
    background(100)

    camera.x = player.x, camera.y = player.y;
    camera.zoom = 2.5

    vingnette.x = camera.x, vingnette.y = camera.y;

    playerControl()
    mapSwitch()
    house()
    //inspectActive()

    if (player.y <= 456 ){
        camera.y = 456
        vingnette.y = 456
    } else{
        camera.y = player.y
        vingnette.y = camera.y
    } if (player.x <= 600){
        camera.x = 600
        vingnette.x = 600
    } else {
        camera.x = player.x
        vingnette.x = camera.x
    }  if (player.y >= 690 ){
        camera.y = 690
        vingnette.y = 690
    } if (player.x >= 690){
        camera.x = 690
        vingnette.x = 690
    }
    console.log(player.x)
    // camera.x = Math.Clamp(camera.x, RectangleworldBounds.x + viewPort.Width * 0.5, worldBounds.X + worldBounds.Width - viewPort.Width * 0.5f);
}

function mapSwitch() {
    if (player.collides(doors)) {
        currentMap.remove()
        console.log("CM is", currentMap)
        currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
        player.y -= 500;
    } if (player.collides(door1)) {
        currentMap.remove()
        player.x = 600, player.y = 600;
        currentMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)
    } if (player.collides(door2)) {
        currentMap.remove()
        player.x = 600, player.y = 600;
        currentMap = new Tiles(mapStorage[2].mapArray, 255, 255, insideTile.w, insideTile.h)
    } if (player.collides(door3)) {
        currentMap.remove()
        player.x = 600, player.y = 600;
        currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
    }
}

// i am going to lose my mind

function playerControl() {

    if (kb.pressing('a')) {
        player.vel.x = -3;
    }
    else if (kb.pressing('d')) {
        player.vel.x = 3;
    }
    else player.vel.x = 0;

    if (kb.pressing('w')) {
        player.vel.y = -3;
    }
    else if (kb.pressing('s')) {
        player.vel.y = 3;
    }
    else player.vel.y = 0;

    if (toggle == 1) {
        player.vel.x = 0, player.vel.y = 0;
    }

}

async function house() {
    // distance = dist(player.x, player.y, inspectTile.x, inspectTile.y)
    if (inspectTile.mouse.hovering()) {
        inspectTile.color = 'blue'
    }
    else {
        inspectTile.color = 'red'
    }

    if (toggle == 1 && mapStorage[0].mapID == 1) {
        imgSprite.image = img
        imgSprite.x = player.x, imgSprite.y = player.y;
        imgSprite.image.scale = 3.6
        imgSprite.layer = 999
        //console.log(mapStorage[0].inspectable)
        console.log(mapStorage[0].mapID)
    } else {
        imgSprite.x = 10000, imgSprite.y = 10000
    }
}

function inspectActive() {
    distance = dist(player.x, player.y, inspectTile.x, inspectTile.y)
    if (mapStorage[0].mapID && toggle == 1) {
        key.x = 255, key.y = 255
        if (key.mouse.hovering()) {
            key.color = 'blue'
            if (key.mouse.pressing()) {
                console.log("clicked")
                textSize(20);
                text("Key Collected!", 255, 255);
                gameItems.splice(0)
                inv.push(key)
                console.log(inv)
                key.remove()
            }
        }
        else {
            key.color = 'red'
        }
    } else {
        key.x = 5000, key.y = 5000
    }
}