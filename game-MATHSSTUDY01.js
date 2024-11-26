let currentMap, currentMapID;
let freeze = false
let mapID, mapName, mapArray, locked;
let door1, door2, door3;
let gameState = 'running'
let toggle = 0;
let player, pickAble, textBox;
let inventory = []
let gameWorldItems = []
let insideTile, outsideTile, inspectTile;
let interactType = 'none';

function keyPressed() {
	if (keyCode == 73) {
		if (toggle == 0) {
			toggle = 1
		}
		else if (toggle == 1) {
			toggle = 0
		}
		//console.log(toggle)
	}
}

mapStorage = [ // map array, that should hold all the shapes, ID's and names of the maps
	{
		mapID: '1', mapName: "StarterMap", mapArray: [
			'11111111111111',
			'11111w1w111111',
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
		mapID: 3, mapName: "outside", mapArray: [
			'11111111111111',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'bFFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFF222FFFFF1',
			'1FFFFFFFFFFFF1',
			'11111111111111'
		]
	},
	{
		mapID: 4, mapName: "childBedroom", mapArray: [
			'11111111111111',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'bFFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFF222FFFFF1',
			'1FFFFFFFFFFFF1',
			'11111111111111'
		]
	},
	{
		mapID: 5, mapName: "corridor", mapArray: [
			'11111111111111',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'bFFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFF222FFFFF1',
			'1FFFFFFFFFFFF1',
			'11111111111111'
		]
	},
	{
		mapID: 6, mapName: "barn", mapArray: [
			'11111111111111',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'bFFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFFFFFFFFFF1',
			'1FFFF222FFFFF1',
			'1FFFFFFFFFFFF1',
			'11111111111111'
		]
	}
]

// doorStorage = [door1, door2, door3]

function preload() {
	img = loadImage('img.png')
	//spriteImg = loadImage('no.png')
	wall_text = loadImage('wall_text.png')
	playerSpriteSheet = loadImage('spritesheetfinal(1).png')
	floor_text = loadImage('floor_text(1).png')
	vingnetteOverlay = loadImage('oralvignette(2).png')
	grass = loadImage('grass.jpg')
	keyImg = loadImage('key.png')
	windowTex = loadImage('window_text.png')


	player = new Sprite(600, 600, 90, 110, 'd');
	player.spriteSheet = playerSpriteSheet
	player.anis.frameDelay = 10
	player.friction = 0
	player.addAnis({
		//standing: {row: 0, frames: 5},
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
	blinking()
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
	insideTile.layer = 4

	outsideTile = new Group();
	outsideTile.w = 60;
	outsideTile.h = 60;
	outsideTile.tile = 2;
	outsideTile.collider = 's';
	outsideTile.color = 'green'
	outsideTile.layer = 4

	windowTile = new Group();
	windowTile.w = 60;
	windowTile.h = 60;
	windowTile.tile = 'w';
	windowTile.image = windowTex
	windowTex.scale = 0.12
	windowTile.collider = 's';
	windowTile.layer = 4

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
	insideFloor.layer = 1

	outsideFloor = new Group()
	outsideFloor.w = 60;
	outsideFloor.h = 60;
	outsideFloor.tile = 'F';
	// insideFloor.image = floor_textds
	// floor_text.scale = 0.12
	outsideFloor.collider = 'n';
	outsideFloor.layer = 1
	outsideFloor.color = 'black'

	//\\\\\\\\\\\\\\\\\\\\\\\\\\ WALLS AND FLOORS /////////////////////////////

	//////////////////////////// DOORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	doors = new Group()
	doors.id = 0
	doors.w = 60;
	doors.h = 60;
	doors.tile = 3;
	doors.collider = 's';
	doors.color = 'lightblue';
	doors.layer = 2

	door1 = new Group()
	door1.id = 1, door1.layer = 2
	door1.w = 60;
	door1.h = 60;
	door1.tile = 'm';
	door1.collider = 's';
	door1.color = 'lightblue';

	door2 = new Group()
	door2.id = 2, door2.layer = 2
	door2.w = 60;
	door2.h = 60;
	door2.tile = 'n';
	door2.collider = 's';
	door2.color = 'lightblue';

	door3 = new Group()
	door3.id = 3, door3.layer = 2
	door3.w = 60;
	door3.h = 60;
	door3.tile = 'b';
	door3.collider = 's';
	door3.color = 'lightblue';
	//\\\\\\\\\\\\\\\\\\\\\\\\\\ DOORS /////////////////////////////


	vingnette = new Sprite(player.x, player.y, innerWidth, innerHeight, 'n');
	vingnette.image = vingnetteOverlay
	vingnetteOverlay.scale = 0.5
	vingnette.layer = 5


	imgSprite = new Sprite(10000, 10000, 1000, 1000, 'n')
	imgSprite.image = img

	starterMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)

	currentMap = starterMap
	currentMapID = mapStorage[0].mapID

	RectangleworldBounds = rect(0, 0, insideTile.w * 15, insideTile.h * 11);

	//  ITEMS 

	key1 = new Sprite(600, 700, 20, 20, 'n')
	key1.image = keyImg
	key1.layer = 1
	key1.pickable = true
	gameWorldItems.push(key1)

	key2 = new Sprite(1000, 1000, 20, 20, 'n')
	key2.image = keyImg
	key2.layer = 1
	key2.pickable = true
	gameWorldItems.push(key2)

	//interactBox()
	console.log(gameWorldItems[0].x, gameWorldItems[0].y)
}



function draw() {
	clear()
	noStroke()
	new Canvas(windowWidth, windowHeight)
	background(0)
	noSmooth()
	//noCursor()

	camera.zoom = 2.65

	playerControl()
	playerAnimation()
	mapSwitch()
	pickup()
	//inspectActive()

	if (kb.pressed('p')) {
		if (gameState === 'running') {
			interactType = 'takingItem';
			interactBox()
		} else if (gameState === 'paused') {
			textBox.remove()
		}
	} if (kb.pressed('f') || kb.pressed('e')) {
		if (gameState === 'running') {
			pauseGame()
		} else if (gameState === 'paused') {
			unpauseGame()
			//textBox.remove()
		}
	}

	if (player.y <= 456) {
		camera.y = 456
		vingnette.y = 456
	} else {
		camera.y = player.y
		vingnette.y = camera.y
	} if (player.x <= 600) {
		camera.x = 600
		vingnette.x = 600
	} else {
		camera.x = player.x
		vingnette.x = camera.x
	} if (player.y >= 700) {
		camera.y = 700
		vingnette.y = 700
	} if (player.x >= 690) {
		camera.x = 690
		vingnette.x = 690
	} if (toggle == 1) {
		inspect()
	}

	vingnette.x = player.x, vingnette.y = player.y

	allSprites.debug = mouse.pressing()
	// camera.x = Math.Clamp(camera.x, RectangleworldBounds.x + viewPort.Width * 0.5, worldBounds.X + worldBounds.Width - viewPort.Width * 0.5f);
}

async function mapSwitch() {
	//distance = dist(player.x, player.y, doors.x, doors.y)
	for (let i = 0; i <= inventory.length; i++) {
		if (kb.pressing('e') && player.collides(doors) && inventory[i] == key1) {
			interactBox()
			currentMap.remove()
			currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
			currentMapID = mapStorage[1].mapID
			player.y = 350;
		} else if (kb.pressing('e') && inventory[i] != key1) {
			console.log("You need a key!")
		}
		if (kb.pressing('e') && player.collides(door1)) {
			currentMap.remove()
			player.y = 750;
			currentMap = new Tiles(mapStorage[0].mapArray, 255, 255, insideTile.w, insideTile.h)
			currentMapID = mapStorage[0].mapID
		} if (kb.pressing('e') && player.collides(door2)) {
			currentMap.remove()
			player.x = 400, player.y = 560;
			currentMap = new Tiles(mapStorage[2].mapArray, 255, 255, insideTile.w, insideTile.h)
		} if (kb.pressing('e') && player.collides(door3)) {
			currentMap.remove()
			player.x = 900, player.y = 600;
			currentMap = new Tiles(mapStorage[1].mapArray, 255, 255, insideTile.w, insideTile.h)
		}
	}
}

// i am going to lose my mind

function playerControl() {

	if (kb.pressing('a')) {
		player.vel.x = -2;
	}
	else if (kb.pressing('d')) {
		player.vel.x = 2;
	}
	else player.vel.x = 0;

	if (kb.pressing('w')) {
		player.vel.y = -2;

	}
	else if (kb.pressing('s')) {
		player.vel.y = 2;
	}
	else {
		player.vel.y = 0, player.changeAni('idle');
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
	if (kb.pressing('d')) {
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
	if (toggle == 1 && currentMapID == 1) {
		freeze = true
		imgSprite.image = img
		imgSprite.x = 5000, imgSprite.y = 5000;
		camera.x = imgSprite.x, camera.y = imgSprite.y
		imgSprite.image.scale = 3.25
		imgSprite.layer = 0
		//console.log(mapStorage[0].mapID)
	} else {
		imgSprite.x = 10000, imgSprite.y = 10000
		toggle = 0
	}
}

// function pickup() {
//     for (let i = 0; i <= gameWorldItems.length; i++) {
//         if (kb.pressing('f')) {
//                 key1.remove()
//                 gameWorldItems.splice(gameWorldItems[0])
//                 inventory.push(key1)
//             }if (inventory[0] == key1) {
//                 console.log("key")
//         }
//     }
// }

function pickup() {
	let itemSprite;
	let i;
	for (let i = 0; i < gameWorldItems.length; i++) {
		distance = dist(player.x, player.y, gameWorldItems[i].x, gameWorldItems[i].y)
	}
	//console.log(distance)
	if (kb.pressed('f') && distance <= 150) {
		interactType = 'takingItem'
		player.freeze = true
		interactBox()
		console.log(distance)
		console.log(gameWorldItems)
		//textBox.remove()
	} else {

	}
	if (interactType == "takingItem") {
		if (mouse.pressing()) {
			key1.remove()
			//gameWorldItems.splice(gameWorldItems[0])
			gameWorldItems[0].x = 10000, gameWorldItems.y = 10000;
			inventory.push(key1)
			interactType = 'none'
			textBox.remove()
			player.freeze = false
			optionBox.remove()
		}
	} if (interactType == 'none') {

	}
}



function inspectActive() {
	//distance = dist(player.x, player.y, inspectTile.x, inspectTile.y)
	if (currentMapID == 1 && toggle == '1') {
		key1.x = 5200, key1.y = 5200
		key1.layer = 5
		if (key1.mouse.hovering()) {
			key1.color = 'blue'
			if (key1.mouse.pressing()) {
				console.log("clicked")
				text("Key Collected!", 255, 255);
				gameItems.splice(0)
				inv.push(key)
				console.log(inv)
				key1.remove()
			}
		}
		else {
			key1.color = 'red'
		}
	} else {
		key1.x = 5000, key1.y = 5000
	}
}

// opening sequence: close up of cats face, then zoom out perchance


async function blinking() {
	await player.changeAni('idle')
	if (player.ani.name = 'idle') {
		player.ani.frameDelay = 100
	}

}

function pauseGame() {
	//interactBox.style("display", "flex");
	gameState = "paused";
	allSprites.sleeping = true;
	player.ani.stop();
	player.freeze = true
	console.log(gameState)
}

function unpauseGame() {
	//interactBox.style("display", "flex");
	gameState = "running";
	allSprites.sleeping = false;
	player.freeze = false
	player.ani.play();
}

function interactBox() {
	// interactBox = createDiv(" ")
	// interactBox.id = ("interact-box")
	// interactBox.style("display", "flex")
	// interactBox.style("flex-direction", "column")
	// interactBox.style("background-color", color(0, 7, 14, 225));
	// interactBox.style("position", "absoloute")
	// interactBox.style("top", "50%")
	// interactBox.style("left", "50%")

	// let interactBoxinfo = createDiv("test text")
	// interactBoxinfo.style("color", color(255))
	// interactBoxinfo.style("font-size", "16px")
	// interactBoxinfo.parent(interactBox)

	textBox = new Group()
	textBox = new Sprite(player.x, player.y + 120, 200, 100, 'n')
	textBox.layer = 100
	textBox.color = 'white';

	if (interactType === 'takingItem') {
		textBox.text = "bbb"
		optionBox = new Sprite(textBox.x + 50, textBox.y, 75, 50, 'n')
		optionBox.layer = 101
	} else if (interactType === 'openDoor') {
		textBox.text = "aaa"
	}

}

