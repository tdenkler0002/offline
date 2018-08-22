const canvas = document.getElementById('game');
canvas.width = 900;
canvas.height = 600;

const context = canvas.getContext('2d');

const map = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1]
];

const tiles = [];

function Tile(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.type = type;
}

function buildMap() {
    let x = 0;
    let y = 0;
    let xsize = 71;
    const ysize = 41;
    for (let i = 0; i < map.length; i++) {

        for (let j = 0; j < map[i].length; j++) {
            x += xsize;

            const tile = new Tile(x, y, map[i][j]);

            tiles.push(tile);
        }
        x = 0;
        y += ysize;
    }

}

function draw() {

    drawBackground();

    requestAnimationFrame(draw);
}

function drawBackground() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    const xMin = 30;
    const xMid = 70;
    const xMax = 100;
    const yMin = 20;
    const yMid = 40;
    const yMax = 60;


    for (const tile of tiles) {
        if (tile.type === 0) {
            continue;
        }
        
        context.beginPath();
        context.fillStyle = '#fff';
        context.strokeStyle = '#8e8e8e';
        context.moveTo(tile.x + xMin, tile.y);
        context.lineTo(tile.x, tile.y + yMid);
        context.lineTo(tile.x + xMid, tile.y + yMid);
        context.lineTo(tile.x + xMax, tile.y);
        context.stroke();
        context.fill();
        context.closePath();
        
        context.beginPath();
        context.fillStyle = '#807f7e';
        context.strokeStyle = '#666';
        context.moveTo(tile.x + xMax, tile.y);
        context.lineTo(tile.x + xMax, tile.y + yMin)
        context.lineTo(tile.x + xMid, tile.y + yMax);
        context.lineTo(tile.x + xMid, tile.y + yMid);
        context.stroke();
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = '#959492';
        context.strokeStyle = '#6c6b6a';
        context.moveTo(tile.x + xMid, tile.y + yMid);
        context.lineTo(tile.x + xMid, tile.y + yMax);
        context.lineTo(tile.x, tile.y + yMax);
        context.lineTo(tile.x, tile.y + yMid);
        context.stroke();
        context.fill();
        context.closePath();
    }
}

function init() {

    buildMap();

    draw();
}


init();