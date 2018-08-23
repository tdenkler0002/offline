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
        this.context = canvas.getContext('2d');
        this.tiles = [];

        this.map = [
            [1, 1, 1, 1],
            [1, 0, 1, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1]
        ];
    }

    createFace(coords, fill, stroke) {
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

            this.createFace([tile.x + xMin, tile.y, tile.x, tile.y + yMid, tile.x + xMid, tile.y + yMid, tile.x + xMax, tile.y], '#fff', '#8e8e8e');
            this.createFace([tile.x + xMax, tile.y, tile.x + xMax, tile.y + yMin, tile.x + xMid, tile.y + yMax, tile.x + xMid, tile.y + yMid], '#807f7e', '#666');
            this.createFace([tile.x + xMid, tile.y + yMid, tile.x + xMid, tile.y + yMax, tile.x, tile.y + yMax, tile.x, tile.y + yMid], '#959492', '#c6b6a6');
        }
    }

    buildMap() {
        let x = 0;
        let y = 0;
        let xOffset = 41;
        let xsize = 71;
        const ysize = 41;

        for (let i = 0; i < this.map.length; i++) {
            x = xOffset * i;
            for (let j = 0; j < this.map[i].length; j++) {
                x += xsize;

                const tile = new Tile(x, y, this.map[i][j]);

                this.tiles.push(tile);
            }

            y += ysize;
        }

        this.drawTiles();
    }

    getTileCanvas() {
        return this.canvas;
    }
}

const canvas = document.getElementById('game');
canvas.width = 900;
canvas.height = 600;

const context = canvas.getContext('2d');
const mapManager = new MapManager(canvas.width, canvas.height);

function draw() {
    context.drawImage(mapManager.getTileCanvas(), 0, 0);

    requestAnimationFrame(draw);
}

function init() {
    mapManager.buildMap();

    draw();
}

init();