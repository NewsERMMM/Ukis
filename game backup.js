let currentMap
let mapID, mapName, mapArray
let door1, door2, door3

mapStorage = [ // map array, that should hold all the shapes, ID's and names of the maps
    {
        mapID: 1, mapName: "StarterMap", mapArray: [
            '.111111111111.',
            '11..........11',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            '11..........11',
            '.111113111111.'
        ]
    },
    {
        mapID: 2, mapName: "Map2", mapArray: [
            '.11111m111111.',
            '11..........11',
            '1............1',
            '1............1',
            '1...1....1...1',
            '1...1....1...n',
            '1...1....1...1',
            '1............1',
            '1.....2......1',
            '1............1',
            '11..........11',
            '.111111111111.'
        ]
    },
    {
        mapID: 3, mapName: "childBedroom", mapArray: [
            '11111111111111',
            '1............1',
            '1............1',
            '1............1',
            '1............1',
            'b............1',
            '1............1',
            '1............1',
            '1....222.....1',
            '1............1',
            '1............1',
            '11111111111111'
        ]
    }
]

doorStorage = [door1, door2, door3]

let inventory = []
let gameWorldItems = []
let insideTile, outsideTile

function preload() {

}

function setup() {
    allSprites.rotationLock = true

    new Canvas('pixelated x4')

    insideTile = new Group();
    insideTile.w = 60;
    insideTile.h = 60;
    insideTile.tile = 1;
    insideTile.collider = 's';

    outsideTile = new Group();
    outsideTile.w = 60;
    outsideTile.h = 60;
    outsideTile.tile = 2;
    outsideTile.collider = 's';
    outsideTile.color = 'green'

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

    player = new Sprite(600, 600, 30, 30, 'd');

    starterMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)

    currentMap = starterMap


}


function draw() {
    clear()
    noStroke()
    background(100)
    insideTile.color = 'darkred'
    camera.x = player.x;
    camera.y = player.y;

    playerControl()
    mapSwitch()

}

function mapSwitch() {
    if (player.collides(doors)) {
        console.log("0")
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
    if (kb.pressing('left')) {
        player.vel.x = -3;
    }
    else if (kb.pressing('right')) {
        player.vel.x = 3;
    }
    else player.vel.x = 0;

    if (kb.pressing('up')) {
        player.vel.y = -3;
    }
    else if (kb.pressing('down')) {
        player.vel.y = 3;
    }
    else player.vel.y = 0;
}

