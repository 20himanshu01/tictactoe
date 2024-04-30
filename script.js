let gameCells = document.querySelectorAll(".box");
let resetGameButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let messageDisplay = document.querySelector("#msg");

let isPlayerOTurn = true; // Tracks the turn of Player O
let moveCount = 0; // To track the number of moves and identify a draw

const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const initializeGame = () => {
  isPlayerOTurn = true;
  moveCount = 0;
  activateGameCells();
  messageContainer.classList.add("hide");
};

gameCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isPlayerOTurn) {
      cell.innerText = "O";
      isPlayerOTurn = false;
    } else {
      cell.innerText = "X";
      isPlayerOTurn = true;
    }
    cell.disabled = true;
    moveCount++;

    let hasWinner = checkForWinner();

    if (moveCount === 9 && !hasWinner) {
      declareDraw();
    }
  });
});

const declareDraw = () => {
  messageDisplay.innerText = `Game was a Draw.`;
  messageContainer.classList.remove("hide");
  deactivateGameCells();
};

const deactivateGameCells = () => {
  gameCells.forEach((cell) => {
    cell.disabled = true;
  });
};

const activateGameCells = () => {
  gameCells.forEach((cell) => {
    cell.disabled = false;
    cell.innerText = "";
  });
};

const announceWinner = (winner) => {
  messageDisplay.innerText = `Congratulations, Winner is ${winner}`;
  messageContainer.classList.remove("hide");
  deactivateGameCells();
};

const checkForWinner = () => {
  for (let combination of winningCombinations) {
    let firstCell = gameCells[combination[0]].innerText;
    let secondCell = gameCells[combination[1]].innerText;
    let thirdCell = gameCells[combination[2]].innerText;

    if (firstCell !== "" && secondCell !== "" && thirdCell !== "") {
      if (firstCell === secondCell && secondCell === thirdCell) {
        announceWinner(firstCell);
        return true;
      }
    }
  }
  return false;
};

newGameButton.addEventListener("click", initializeGame);
resetGameButton.addEventListener("click", initializeGame);
