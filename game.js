let currentMap, currentMapID;
let freeze = false
let mapID, mapName, mapArray, locked;
let mID, door1, door2, door3, door4, door5;
let gameState = 'running'
let toggle = 0;
let player, pickAble, textBox, optionBox;
let inventory = []
let gameWorldItems = []
let insideTile, outsideTile, inspectTile;
let interactType = 'none', playState = 0;
let textBoxOpen = false;

function keyPressed() {
    if (keyCode == 73) {
        if (toggle == 0) {
            toggle = 1
        }
        else if (toggle == 1) {
            toggle = 0
        }
    }
}

mapStorage = [ // map array, that should hold all the shapes, ID's and names of the maps
    {
        mapID: '1', mapName: "StarterMap", mapArray: [
            '11111111111',
            '1111w1w1111',
            '1fffffffff1',
            '1fgffffgff1',
            '1fffffffff1',
            '1ffgffffff3',
            '1fffffffff1',
            '1gffffffff1',
            '1ffgffgfff1',
            '11111111111',
        ]
    },
    {
        mapID: 2, mapName: "Map2", mapArray: [
            '11111111111',
            '1fffffffff1',
            '1fffffffff1',
            '1fffffffff1',
            '1fffffffff1',
            'mffffffffFn',
            '1fffffffFF1',
            '1ffffffFFF1',
            '11111111111'
        ]
    },
    {
        mapID: 3, mapName: "outside", mapArray: [
            '12222222222',
            '1FFRFFFFFF2',
            '1FFFFFFFFR2',
            '1FFRFFFFFF2',
            '1FFFFFFFFR2',
            'bFFFRRFRFF2',
            '1FRFFFFRFR2',
            '1FFFFFRFFF2',
            '12222222222'
        ]
    },
    {
        mapID: 4, mapName: "childBedroom", mapArray: [
            '11111111111',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            'bFFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '11111111111'
        ]
    },
    {
        mapID: 5, mapName: "corridor", mapArray: [
            '11111111111',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            'bFFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '11111111111'
        ]
    },
    {
        mapID: 6, mapName: "barn", mapArray: [
            '11111111111',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            'bFFFFFFFFF1',
            '1FFFFFFFFF1',
            '1FFFFFFFFF1',
            '11111111111'
        ]
    }
]

// doorStorage = [door1, door2, door3]

function preload() {
    backgroundAudio = loadSound('backgroundAmbiance.mp3')
    img = loadImage('img.png')
    //spriteImg = loadImage('no.png')
    wall_text = loadImage('wall_text.png')
    playerSpriteSheet = loadImage('spritesheetfinal(1).png')
    floor_text = loadImage('floor_text(1).png'), floor_text2 = loadImage('floor_text2.png')
    vingnetteOverlay = loadImage('oralvignette(2).png')
    rocks = loadImage('rocks.png')
    dirt1 = loadImage('dirt_text.png'), dirt2 = loadImage('dirt_text2.png');
    keyImg = loadImage('key.png')
    windowTex = loadImage('window_text.png')
    textBoxImg = loadImage('textBox.png')
    optionBoxImg = loadImage('optionBox.png')
    font = loadFont('Merriweather-Regular.ttf')
    doorImg = loadImage('door.png')
    mainMenuBg = loadImage('mainMenuBackground.png')

    chairImg = loadImage('chair.png')
    tableImg = loadImage('table.png')


    player = new Sprite(600, 600, 90, 110, 'd');
    player.spriteSheet = playerSpriteSheet
    player.anis.frameDelay = 10
    player.friction = 0
    player.addAnis({
        idle: { row: 0, frames: 4 },
        bIdle: { row: 3 },
        fWalk: { row: 1, frames: 9 },
        bWalk: { row: 2, frames: 8 },
        sideWalkR: { row: 4, frames: 11 },
        sideWalkL: { row: 5, frames: 11 }
    })
    playerSpriteSheet.scale = 3
    player.anis.scale = 1
    player.layer = 2

}

function setup() {
    allSprites.rotationLock = true
    backgroundAudio.play()
    backgroundAudio.loop()
    backgroundAudio.setVolume(0.7);


    new Canvas('pixelated x4')

    //////////////////////////// WALLS AND FLOORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    insideTile = new Group();
    insideTile.w = 60;
    insideTile.h = 60;
    insideTile.tile = 1;
    insideTile.image = wall_text
    wall_text.scale = 0.12
    insideTile.collider = 's';
    insideTile.layer = 4

    outsideTile = new Group();
    outsideTile.w = 60;
    outsideTile.h = 60;
    outsideTile.tile = 2;
    outsideTile.collider = 's';
    outsideTile.color = 'green'
    outsideTile.layer = 4, outsideTile.image = rocks

    windowTile = new Group();
    windowTile.w = 60;
    windowTile.h = 60;
    windowTile.tile = 'w';
    windowTile.image = windowTex
    windowTex.scale = 0.12
    windowTile.collider = 's';
    windowTile.layer = 4

    insideFloor = new Group()
    insideFloor.w = 60;
    insideFloor.h = 60;
    insideFloor.tile = 'f';
    insideFloor.image = floor_text
    floor_text.scale = 0.12
    insideFloor.collider = 'n';
    insideFloor.layer = 1

    insideFloor2 = new Group()
    insideFloor2.w = 60;
    insideFloor2.h = 60;
    insideFloor2.tile = 'g';
    insideFloor2.image = floor_text2
    floor_text2.scale = 0.12
    insideFloor2.collider = 'n';
    insideFloor2.layer = 1

    outsideFloor = new Group(), outsideFloor2 = new Group()
    outsideFloor.w = 60, outsideFloor2.w = 60;
    outsideFloor.h = 60, outsideFloor2.h = 60;
    outsideFloor.tile = 'F', outsideFloor2.tile = 'R';
    outsideFloor.image = dirt1, outsideFloor2.image = dirt2;
    outsideFloor.collider = 'n', outsideFloor2.collider = 'n';
    outsideFloor.layer = 1, outsideFloor2.layer = 1;



    //\\\\\\\\\\\\\\\\\\\\\\\\\\ WALLS AND FLOORS /////////////////////////////

    //////////////////////////// DOORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\



    doors = new Group()
    doors.w = 60, doors.h = 60

    door1 = new doors.Group()
    door1.mID = 1
    door1.tile = 3;
    door1.collider = 's';
    door1.color = 'lightblue', door1.image = doorImg;
    doorImg.scale = 0.8
    door1.layer = 2

    door2 = new doors.Group()
    door2.mID = 2, door2.layer = 2
    door2.tile = 'm';
    door2.image = doorImg;
    door2.collider = 's';
    door2.color = 'lightblue';

    door3 = new doors.Group()
    door3.mID = 3, door3.layer = 2
    door3.tile = 'n';
    door3.collider = 's';
    door3.color = 'lightblue', door3.image = doorImg;

    door4 = new doors.Group()
    door4.mID = 4, door4.layer = 2
    door4.tile = 'b';
    door4.collider = 's';
    door4.color = 'lightblue', door4.image = doorImg;

    door5 = new doors.Group()
    door5.mID = 5, door5.layer = 2
    door5.collider = 's'
    door5.image = doorImg

    //\\\\\\\\\\\\\\\\\\\\\\\\\\ DOORS /////////////////////////////





    //\\\\\\\\\\\\\\\\\\\\\\\\\\ OBJECTS /////////////////////////////

    objects = new Group()
    chair = new objects.Group()
    chair.w = 60, chair.h = 60, chair.collider = 's'
    chair.image = chairImg
    chair.tile = 'c'









    // ///////////////////////// OBJECTS /////////////////////////////



    // ///////////////////////// ITEMS /////////////////////////////


    vingnette = new Sprite(player.x, player.y, innerWidth, innerHeight, 'n');
    vingnette.image = vingnetteOverlay
    vingnetteOverlay.scale = 0.5
    vingnette.layer = 5


    imgSprite = new Sprite(5000, 5000, 1000, 1000, 'n')
    imgSprite.image = img

    starterMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)

    currentMap = starterMap
    currentMapID = mapStorage[0].mapID

    RectangleworldBounds = rect(0, 0, insideTile.w * 15, insideTile.h * 11);

    key1 = new Sprite(600, 700, 20, 20, 'n')
    key1.image = keyImg
    key1.layer = 1
    key1.pickable = true
    gameWorldItems.push(key1)

    key2 = new Sprite(1000, 1000, 20, 20, 'n')
    key2.image = keyImg
    key2.layer = 1
}



function draw() {
    background(53)
    fullscreen(true)
    if (playState == 0) {
        mainMenu();
    }

    if (playState == 1) {
        game();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

async function mapSwitch() {
    //distance = dist(player.x, player.y, doors.x, doors.y)
    for (let i = 0; i <= inventory.length; i++)
        if (kb.pressing('e') && player.collides(door1) && inventory[i] == key1) {
            currentMap.remove()
            currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
            currentMapID = mapStorage[1].mapID
            player.y = 550, player.x = 350;
        } else if (kb.pressing('e') && inventory[i] != key1) {
            console.log("You need a key!")
        }
    if (kb.pressing('e') && player.collides(door2)) {
        currentMap.remove()
        player.y = 550, player.x = 750;
        currentMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)
        currentMapID = mapStorage[0].mapID
    } if (kb.pressing('e') && player.collides(door3)) {
        currentMap.remove()
        player.x = 350, player.y = 560;
        currentMap = new Tiles(mapStorage[2].mapArray, 255, 255, insideTile.w, insideTile.h)
    } if (kb.pressing('e') && player.collides(door4)) {
        currentMap.remove()
        player.x = 755, player.y = 530;
        currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
    }
}

function playerControl() {
    player.vel.x = 0
    player.vel.y = 0
    if (kb.pressing('')) {
        player.vel.x = 0
        player.vel.y = 0
    }


    if (kb.pressing('a')) {
        player.vel.x -= 2;
    }
    if (kb.pressing('d')) {
        player.vel.x += 2;
    }

    if (kb.pressing('w')) {
        player.vel.y -= 2;

    }
    else if (kb.pressing('s')) {
        player.vel.y += 2;
    }
    else {
        player.changeAni('idle');
    }
    if (player.freeze == true) {
        player.vel.x = 0, player.vel.y = 0;
    }

    if ((Math.abs(player.vel.x) != 0) && (Math.abs(player.vel.y) != 0)) {
        player.vel.x *= 0.707
        player.vel.y *= 0.707
    }
}

function playerAnimation() {
    if (kb.pressing('a')) {
        player.changeAni('sideWalkL')
    }
    else if (kb.pressing('d')) {
        player.changeAni('sideWalkR')
    }
    if (kb.pressing('w')) {
        player.changeAni('bWalk')
    }
    else if (kb.pressing('s')) {
        player.changeAni('fWalk')
    }
}

async function inspect() {
    if (toggle == 1 && currentMapID == 2) {
        freeze = true
        imgSprite.image = img
        camera.x = imgSprite.x, camera.y = imgSprite.y
        imgSprite.image.scale = 3.25
        imgSprite.layer = 0
    } else if (toggle == 1 && currentMap == 3) {
        freeze = true
        imgSprite.image = img
        camera.x = imgSprite.x, camera.y = imgSprite.y
        imgSprite.image.scale = 3.25
        imgSprite.layer = 0
    }
    else {
        toggle = 0
    }
}



function pickup() {
    for (let i = 0; i < gameWorldItems.length; i++) {
        distance = dist(player.x, player.y, gameWorldItems[i].x, gameWorldItems[i].y)
    }
    //console.log(distance)
    if (kb.pressed('f') && distance <= 150 && textBoxOpen == false) {
        textBoxOpen = true;
        interactType = 'takingItem'
        player.freeze = true
        interactBox()
        //textBox.remove()
    }
    if (interactType === "takingItem") {
        if (optionBox.mouse.pressing()) {
            textBoxOpen = false;

            key1.remove()
            gameWorldItems[0].x = 10000, gameWorldItems[0].y = 10000;
            inventory.push(key1)
            gameWorldItems.splice(gameWorldItems[0], 0)
            interactType = 'none'
            textBox.remove(), optionBox.remove()
            textBoxOn = true
            player.freeze = false
            //optionBox.remove()
        } else if (interactType == 'none') {
            textBox.remove(), optionBox.remove()
            player.freeze = false

        }
    }
}
// opening sequence: close up of cats face, then zoom out perchance

function pauseGame() {
    //interactBox.style("display", "flex");
    gameState = "paused";
    allSprites.sleeping = true;
    player.ani.stop();
    player.freeze = true
}

function unpauseGame() {
    //interactBox.style("display", "flex");
    gameState = "running";
    allSprites.sleeping = false;
    player.freeze = false
    player.ani.play();
}

function interactBox() {
    textBox = new Sprite(player.x, player.y + 50, 300, 100, 'k')
    textBox.layer = 100

    textBox.image = textBoxImg
    textBox.image.offset.y = 25
    textBox.textColor = 'white'
    //textBox.text = message

    optionBox = new Sprite(textBox.x + 70, textBox.y, 200, 120, 'k')
    optionBox.image = optionBoxImg
    optionBox.scale = 0.3
    optionBox.image.offset.y = 25
    optionBox.layer = 101
    optionBox.textColor = 'white'

    textBox.overlaps(player), optionBox.overlaps(player);
    if (interactType === 'takingItem') {
        textBox.text = "Pick up?"
        optionBox.text = "Yes"
        textBox.text.align = 'left'
    } else if (interactType === 'openDoor') {
        textBox.text = "Go through door?"
        optionBox.text = "Yes"
    }
    player.freeze = true;
}

// function doorInteract() {
//     if (kb.pressed('e')) {
//         let doorFound = null;

//         if (player.colliding(doors)) {
//             doorFound = doors, console.log("aaa");
//         }
//         else if (player.collides(door1)) {
//             doorFound = door1;
//         }
//         else if (player.collides(door2)) {
//             doorFound = door2;
//         }
//         else if (player.collides(door3)) {
//             doorFound = door3;
//         }

//         if (doorFound) { // basically if doorfound != null, this if statement goes ahead
//             if (doorFound.mID === 1 || doorFound.mID === 4) { // locked doors
//                 if (inventory.includes(key1)) { // condition check
//                     interactType = 'openDoor'
//                     interactBox("You have the key."), () => {
//                         openDoor(doorFound);
//                     }
//                 } else {
//                     interactBox("you need a key")
//                 }
//             } else {
//                 interactType = 'openDoor';
//                 interactBox("click to go through door", () => {
//                     openDoor(doorFound);
//                 });
//             }
//         }
//     }
// }

// function doorInt() {
//     let doorFound = null;
//     if (kb.pressed('e')) {
//         interactType = 'openDoor'
//         interactBox()

//         if (player.colliding(doors)) {
//             doorFound = doors //, console.log("aaa");
//         }
//         else if (player.collides(door1)) {
//             doorFound = door1;
//         }
//         else if (player.collides(door2)) {
//             doorFound = door2;
//         }
//         else if (player.collides(door3)) {
//             doorFound = door3;
//         }
//     }

//     if (doorFound) {
//         console.log(interactType)
//         console.log(doorFound.mID)
//         if (interactType == 'openDoor' && doorFound.mID == 1) {
//             if (inventory.includes(key1)) {
//                 if (optionBox.mouse.pressing()) {
//                     console.log("aa")
//                 }
//             } else {
//                 console.log("you need a key to open this door")
//             }
//      
//
//
//         if (interactType === 'opendoor') {
//             console.log("pingas")
//         }
//     }
// }

function mainMenu() {
    menuSprite = new Sprite(5000, 100, 40, 40, 's')
    menuSprite.image = mainMenuBg
    menuSprite.layer = 1, menuSprite.image.scale = 2

    playButton = new Sprite(menuSprite.x + 50, menuSprite.y + 70, 200, 120, 'k')
    playButton.image = textBoxImg
    playButton.image.offset.y = 25

    playButton.scale = 0.3;
    playButton.text = "play", playButton.textColor = 'white'
    camera.zoom = 3
    camera.x = menuSprite.x, camera.y = menuSprite.y

    if (mouse.pressing()) {
        playState = 1
        menuSprite.remove(), playButton.remove()
    } else {
        //console.log("ough")
    }
}

function game() {
    clear()
    noStroke()
    new Canvas(windowWidth, windowHeight)
    background(0)
    noSmooth()





    camera.zoom = 2.7

    playerControl()
    playerAnimation()
    mapSwitch()
    pickup()

    // cursor show / hide
    if (interactType === 'none') {
        noCursor()
    } else if (interactType === 'takingItem' || interactType === 'openDoor') {
        cursor()
    }

    // pausing and unpausing 

    //doorInteract()
    //doorInt()

    // camera bounds 

    if (player.y <= 456) {
        camera.y = 456
        vingnette.y = 456
    } else {
        camera.y = player.y
        vingnette.y = camera.y
    } if (player.x <= 530) {
        camera.x = 530
        vingnette.x = 530
    } else {
        camera.x = player.x
        vingnette.x = camera.x
    } if (player.y >= 650) {
        camera.y = 650
        vingnette.y = 650
    } if (player.x >= 580) {
        camera.x = 580
        vingnette.x = 580
    } if (toggle == 1) {
        inspect()
    }

    vingnette.x = player.x, vingnette.y = player.y

    //allSprites.debug = mouse.pressing()
    // camera.x = Math.Clamp(camera.x, RectangleworldBounds.x + viewPort.Width * 0.5, worldBounds.X + worldBounds.Width - viewPort.Width * 0.5f);
}