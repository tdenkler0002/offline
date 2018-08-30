class Tile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.type = type;
    }
}

class MapManager {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        this.tiles = [];
    }

    drawFace(coords, fill, stroke) {
        this.context.beginPath();
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.moveTo(coords[0], coords[1]);
        this.context.lineTo(coords[2], coords[3]);
        this.context.lineTo(coords[4], coords[5]);
        this.context.lineTo(coords[6], coords[7]);
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
    }

    drawTiles() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        const xMin = 30;
        const xMid = 70;
        const xMax = 100;
        const yMin = 20;
        const yMid = 40;
        const yMax = 60;

        for (const tile of this.tiles) {
            if (tile.type === 0) {
                continue;
            }

            this.drawFace([tile.x + xMin, tile.y, tile.x, tile.y + yMid, tile.x + xMid, tile.y + yMid, tile.x + xMax, tile.y], '#fff', '#8e8e8e');
            this.drawFace([tile.x + xMax, tile.y, tile.x + xMax, tile.y + yMin, tile.x + xMid, tile.y + yMax, tile.x + xMid, tile.y + yMid], '#807f7e', '#666');
            this.drawFace([tile.x + xMid, tile.y + yMid, tile.x + xMid, tile.y + yMax, tile.x, tile.y + yMax, tile.x, tile.y + yMid], '#959492', '#c6b6a6');
        }
    }

    init() {
        let x = 0;
        let y = 0;
        let xOffset = -31;
        let xsize = 71;
        let ysize = 41;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const tile = new Tile(x, y, map[i][j]);

                map[i][j] = { id: j, x: x, y: y, xsize: xsize, ysize: ysize, type: map[i][j] };

                this.tiles.push(tile);

                x += xsize;

                if (j > maxXIndex) {
                    maxXIndex = j;
                }
            }

            x = xOffset;
            y += ysize;

            if (i > maxYIndex) {
                maxYIndex = i;
            }
        }

        this.drawTiles();
    }

    getTileCanvas() {
        return this.canvas;
    }
}

class Character {
    constructor() {
        this.x;
        this.y;
        this.width = 100;
        this.height = 100;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
    }

    drawFace(coords, fill, stroke) {
        this.context.save();
        this.context.scale(0.5, 0.5);
        this.context.beginPath();
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.moveTo(coords[0], coords[1]);
        this.context.lineTo(coords[2], coords[3]);
        this.context.lineTo(coords[4], coords[5]);
        this.context.lineTo(coords[6], coords[7]);
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }

    init() {
        const xMin = 30;
        const xMid = 70;
        const xMax = 100;
        const yMin = 20;
        const yMid = 40;
        const yMax = 60;


        const startX = 0;
        const startY = 20;

        this.drawFace([startX + xMin, startY, startX, startY + yMid, startX + xMid, startY + yMid, startX + xMax, startY], '#83d30b', '#4d7610');
        this.drawFace([startX + xMax, startY, startX + xMax, startY + yMin, startX + xMid, startY + yMax, startX + xMid, startY + yMid], '#69aa07', '#599106');
        this.drawFace([startX + xMid, startY + yMid, startX + xMid, startY + yMax, startX, startY + yMax, startX, startY + yMid], '#58890f', '#58821a');
    }

    getCharacterCanvas() {
        return this.canvas;
    }

}

const canvas = document.getElementById('game');
canvas.width = 900;
canvas.height = 600;

const gameContext = canvas.getContext('2d');
const mapManager = new MapManager(canvas.width, canvas.height);
const character = new Character();

const map = [
    [1, 1, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1]
];

let xIndex = 0;
let yIndex = 0;
let coord;
let maxXIndex = 0;
let maxYIndex = 0;

function draw() {
    // gameContext.clearRect(0, 0, canvas.width, canvas.height);

    gameContext.drawImage(mapManager.getTileCanvas(), 0, 0);
    gameContext.drawImage(character.getCharacterCanvas(), character.x, character.y);

    requestAnimationFrame(draw);
}

function addEventListeners() {
    window.onkeydown = (event) => {
        navigate(event);
    };
}

function navigate(event) {
    const keyCode = event.keyCode;

    // Navigate only if there is a valid keycode, the character is on the map,
    // and type is valid
    switch (keyCode) {
        case 65:
            if (xIndex - 1 > -1 && map[yIndex][xIndex - 1].type !== 0) {
                xIndex -= 1;
                moveCharacter();
            }
            break;
        case 68:
            if (xIndex + 1 < maxXIndex + 1 && map[yIndex][xIndex + 1].type !== 0) {
                xIndex += 1;
                moveCharacter();
            }
            break;
        case 87:
            if (yIndex - 1 > -1 && map[yIndex - 1][xIndex].type !== 0) {
                yIndex -= 1;
                moveCharacter();
            }
            break;
        case 83:
            if (yIndex + 1 < maxYIndex + 1 && map[yIndex + 1][xIndex].type !== 0) {
                yIndex += 1;
                moveCharacter();
            }
            break;
    }
}

function moveCharacter() {
    coord = {
        x: map[yIndex][xIndex].x,
        y: map[yIndex][xIndex].y
    };

    // Some offsets
    character.x = coord.x + 20;
    character.y = coord.y - 6;
}

function init() {
    mapManager.init();
    character.init();

    coord = {
        x: map[xIndex][yIndex].x,
        y: map[xIndex][yIndex].y
    };

    // Set character at start
    character.x = coord.x + 20;
    character.y = coord.y - 6;

    addEventListeners();

    draw();
}

init();