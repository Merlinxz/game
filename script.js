document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from({ length: 9 }, () => null);
    const turnIndicator = document.getElementById('turnIndicator');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let gameActive = true;

    // Initialize the board
    cells.forEach((_, index) => {
        const cellElement = createCellElement(index);
        board.appendChild(cellElement);
    });

    // Event listeners
    resetButton.addEventListener('click', resetGame);
    board.addEventListener('click', handleCellClick);

    // Display initial turn
    updateTurnIndicator();

    function createCellElement(index) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        return cellElement;
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (!gameActive || cells[index] !== null) return;

        cells[index] = currentPlayer;
        renderBoard();

        if (isGameWon()) showResult(`Player ${currentPlayer} wins!`);
        else if (isGameDraw()) showResult("It's a draw!");
        else switchPlayer();

        function switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    }

    function isGameWon() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(cellIndex => cells[cellIndex] === currentPlayer)
        );
    }

    function isGameDraw() {
        return cells.every(cell => cell !== null);
    }

    function renderBoard() {
        cells.forEach((cell, index) => {
            const cellElement = document.querySelector(`.cell[data-index="${index}"]`);
            cellElement.textContent = cell || '';
            cellElement.innerHTML = cell ? getIcon(cell) : '';
        });
    }

    function showResult(message) {
        Swal.fire({
            title: message,
            icon: 'info',
            confirmButtonText: 'Play Again',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) resetGame();
        });
    }

    function resetGame() {
        cells.fill(null);
        renderBoard();
        currentPlayer = 'X';
        gameActive = true;
        updateTurnIndicator();
    }

    function getIcon(symbol) {
        return symbol === 'X' ? '<i class="fas fa-times"></i>' :
            symbol === 'O' ? '<i class="far fa-circle"></i>' : '';
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Turn: Player ${currentPlayer}`;
    }
});