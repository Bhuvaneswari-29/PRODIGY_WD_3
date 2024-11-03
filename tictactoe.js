const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
let isXTurn = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations for a 3x3 Tic Tac Toe board
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Event listener for each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index), { once: true });
});

// Handle cell click
function handleCellClick(cell, index) {
  // Place the mark (X or O)
  boardState[index] = isXTurn ? "X" : "O";
  cell.classList.add(isXTurn ? "x" : "o");
  cell.innerText = isXTurn ? "X" : "O";

  // Check for win or draw
  if (checkWin()) {
    statusText.innerText = `Player ${isXTurn ? "X" : "O"} Wins!`;
    endGame();
  } else if (boardState.every(cell => cell !== "")) {
    statusText.innerText = "It's a Draw!";
  } else {
    isXTurn = !isXTurn;
    statusText.innerText = `Player ${isXTurn ? "X" : "O"}'s Turn`;
  }
}

// Check if there's a winner
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === (isXTurn ? "X" : "O"));
  });
}

// End the game by disabling clicks
function endGame() {
  cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
}

// Restart the game
restartButton.addEventListener("click", () => {
  isXTurn = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.innerText = "";
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  statusText.innerText = "Player X's Turn";
});
