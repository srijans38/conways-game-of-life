var running = false;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gridSize = 100;
var interval;
var grid = new Array(gridSize);
var delay = document.querySelector('#delay').value;
var delayText = document.querySelector('#delayText');

function fillArray() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize).fill(0);
  }
}

function generateRandomArray() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }
}

function addHelper(i, j) {
  try {
    return grid[i][j];
  } catch {
    return 0;
  }
}

function checkNeighbours(i, j) {
  return (
    addHelper(i, j + 1) +
    addHelper(i, j - 1) +
    addHelper(i - 1, j) +
    addHelper(i + 1, j) +
    addHelper(i + 1, j + 1) +
    addHelper(i - 1, j - 1) +
    addHelper(i - 1, j + 1) +
    addHelper(i + 1, j - 1)
  );
}

function draw() {
  var copy = new Array(gridSize);

  for (let i = 0; i < grid.length; i++) {
    copy[i] = new Array(gridSize).fill(0);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000000';
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      var neighs = checkNeighbours(i, j);
      if (grid[i][j] == 1) {
        ctx.fillStyle = '#000000';
        if (neighs < 2 || neighs > 3) {
          copy[i][j] = 0;
        } else {
          copy[i][j] = 1;
        }
      } else {
        ctx.fillStyle = '#FFFFFF';
        if (neighs == 3) {
          copy[i][j] = 1;
        } else {
          copy[i][j] = 0;
        }
      }

      if (i > 4 && j > 4 && i < gridSize - 4 && j < gridSize - 4) {
        ctx.fillRect(
          (canvas.width / gridSize) * i,
          (canvas.height / gridSize) * j,
          canvas.width / gridSize,
          canvas.height / gridSize
        );
      }
    }
  }

  grid = [...copy];
}

function repeatingPatterns() {
  grid[20][21] = 1;
  grid[20][22] = 1;
  grid[20][23] = 1;

  grid[41][40] = 1;
  grid[42][40] = 1;
  grid[43][40] = 1;
  grid[40][41] = 1;
  grid[41][41] = 1;
  grid[42][41] = 1;

  grid[30][31] = 1;
  grid[31][30] = 1;
  grid[31][31] = 1;
  grid[30][30] = 1;

  grid[32][32] = 1;
  grid[32][33] = 1;
  grid[33][32] = 1;
  grid[33][33] = 1;

  grid[60][60] = 1;
  grid[61][60] = 1;
  grid[62][60] = 1;

  grid[66][60] = 1;
  grid[67][60] = 1;
  grid[68][60] = 1;

  grid[58][62] = 1;
  grid[58][63] = 1;
  grid[58][64] = 1;

  grid[63][62] = 1;
  grid[63][63] = 1;
  grid[63][64] = 1;

  grid[65][62] = 1;
  grid[65][63] = 1;
  grid[65][64] = 1;

  grid[70][62] = 1;
  grid[70][63] = 1;
  grid[70][64] = 1;

  grid[60][65] = 1;
  grid[61][65] = 1;
  grid[62][65] = 1;

  grid[66][65] = 1;
  grid[67][65] = 1;
  grid[68][65] = 1;

  grid[60][67] = 1;
  grid[61][67] = 1;
  grid[62][67] = 1;

  grid[66][67] = 1;
  grid[67][67] = 1;
  grid[68][67] = 1;

  grid[58][68] = 1;
  grid[58][69] = 1;
  grid[58][70] = 1;

  grid[63][68] = 1;
  grid[63][69] = 1;
  grid[63][70] = 1;

  grid[65][68] = 1;
  grid[65][69] = 1;
  grid[65][70] = 1;

  grid[70][68] = 1;
  grid[70][69] = 1;
  grid[70][70] = 1;

  grid[60][72] = 1;
  grid[61][72] = 1;
  grid[62][72] = 1;

  grid[66][72] = 1;
  grid[67][72] = 1;
  grid[68][72] = 1;
}

function gosperGliderGun() {
  grid[10][20] = 1;
  grid[11][20] = 1;
  grid[10][21] = 1;
  grid[11][21] = 1;

  grid[20][20] = 1;
  grid[20][21] = 1;
  grid[20][22] = 1;

  grid[21][19] = 1;
  grid[21][23] = 1;

  grid[22][18] = 1;
  grid[22][24] = 1;
  grid[23][18] = 1;
  grid[23][24] = 1;

  grid[24][21] = 1;

  grid[25][19] = 1;
  grid[25][23] = 1;

  grid[26][20] = 1;
  grid[26][21] = 1;
  grid[26][22] = 1;

  grid[27][21] = 1;

  grid[30][18] = 1;
  grid[30][19] = 1;
  grid[30][20] = 1;
  grid[31][18] = 1;
  grid[31][19] = 1;
  grid[31][20] = 1;

  grid[32][17] = 1;
  grid[32][21] = 1;

  grid[34][17] = 1;
  grid[34][21] = 1;
  grid[34][16] = 1;
  grid[34][22] = 1;

  grid[44][18] = 1;
  grid[45][18] = 1;
  grid[44][19] = 1;
  grid[45][19] = 1;
}

function init() {
  fillArray();
  switch (document.querySelector('#pattern').value) {
    case 'random':
      generateRandomArray();
      break;

    case 'repeating':
      repeatingPatterns();
      break;

    case 'glider':
      gosperGliderGun();
      break;
  }
  draw();
}

function run(delay) {
  running = true;
  return setInterval(draw, delay);
}

document.querySelector('button').addEventListener('click', () => {
  if (!running) {
    interval = run(delay);
  } else {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    running = false;
  }
});

document.querySelector('#pattern').addEventListener('change', init);

document.querySelector('#delay').addEventListener('input', (e) => {
  delay = e.target.value;
  delayText.innerHTML = delay;
  if (running) {
    clearInterval(interval);
    interval = run(delay);
  }
});

window.onload = init;
