const boardSize = 10;
const mineCount = 10;
let board = [];
let gameOver = false;

function createBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    placeMines();
    calculateNumbers();
    renderBoard();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        if (board[x][y] !== 'M') {
            board[x][y] = 'M';
            minesPlaced++;
        }
    }
}

function calculateNumbers() {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (board[x][y] === 'M') continue;
            let mineCount = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newX = x + i;
                    const newY = y + j;
                    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                        if (board[newX][newY] === 'M') mineCount++;
                    }
                }
            }
            board[x][y] = mineCount;
        }
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.x = x;
            cellDiv.dataset.y = y;
            cellDiv.addEventListener('click', () => handleCellClick(x, y));
            gameBoard.appendChild(cellDiv);
        });
    });
}

function handleCellClick(x, y) {
    if (gameOver) return;
    const cellDiv = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (board[x][y] === 'M') {
        cellDiv.classList.add('mine');
        alert('Игра окончена! Вы попали на мину.');
        gameOver = true;
    } else {
        cellDiv.classList.add('revealed');
        cellDiv.textContent = board[x][y] > 0 ? board[x][y] : '';
    }
}

document.getElementById('restartButton').addEventListener('click', () => {
    gameOver = false;
    createBoard();
});

createBoard();
