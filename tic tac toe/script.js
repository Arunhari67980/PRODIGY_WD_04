const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const playerModeBtn = document.getElementById('playerModeBtn');
const aiModeBtn = document.getElementById('aiModeBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);
let isAiMode = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

playerModeBtn.addEventListener('click', () => startGame(false));
aiModeBtn.addEventListener('click', () => startGame(true));
resetBtn.addEventListener('click', resetGame);

function startGame(aiMode) {
    isAiMode = aiMode;
    resetGame();
    messageElement.textContent = isAiMode ? 'Player vs AI' : 'Player vs Player';
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] || !gameActive) return;

    updateGameState(cell, cellIndex);
    checkWinner();

    if (isAiMode && gameActive) {
        aiMove();
        checkWinner();
    }
}

function updateGameState(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function aiMove() {
    const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    currentPlayer = 'X';
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            highlightWinningCombination(winningCombinations[i]);
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
