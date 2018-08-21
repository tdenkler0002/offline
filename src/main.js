const canvas = document.getElementById('game');
canvas.width = 900;
canvas.height = 600;

const context = canvas.getContext('2d');

const map = [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 0]
];

const tiles = [];

function Tile(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.type = type;
}

function buildMap() {
    const size = 51;
    for (let i = 0; i < map.length; i++) {
        const x = i * size;
        for (let j = 0; j < map[i].length; j++) {
            const y = j * size;
            const tile = new Tile(x, y, map[i][j]);

            tiles.push(tile);
        }
    }

}

function draw() {

    drawBackground();

    requestAnimationFrame(draw);
}

function drawBackground() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const tile of tiles) {
        context.moveTo(tile.x + (tile.width / 2), tile.y);
        context.lineTo(tile.x, tile.y + (tile.height) / 2);
        context.lineTo(tile.x + (tile.width / 2), tile.y + tile.height);
        context.lineTo(tile.x + tile.width, tile.y + (tile.height) / 2);

        context.fillStyle = tile.type === 1 ? '#000' : '#ff0000';
        context.fill();
    }
}

function init() {

    buildMap();

    draw();
}


init();