const fieldsElements = document.querySelectorAll(".board__item");
const panel = document.querySelector(".panel");
const resetBtn = document.querySelector(".reset-button");

let fields;
let activePlayer;
let gameActive;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

// initialize/reset methods

const setDefaults = () => {
    fields = ["", "", "", "", "", "", "", "", ""];
    activePlayer = "X";
    gameActive = true;
};

const resetBoardClasses = () => {
    fieldsElements.forEach((field, index) => {
        field.classList.remove(
            "board__item--filled-X",
            "board__item--filled-O"
        );
    });
};

// message methods

const displayWinMessage = () => {
    panel.textContent = `Gratulacje ${activePlayer}, wygrałeś!`;
};

const displayTieMessage = () => {
    panel.textContent = `Remis!`;
};

const clearMessage = () => {
    panel.textContent = "";
};

// game validation

const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const [positionA, positionB, positionC] = winningConditions[i];

        const value1 = fields[positionA];
        const value2 = fields[positionB];
        const value3 = fields[positionC];

        if (value1 && value1 === value2 && value1 === value3) {
            gameWon = true;
            break;
        }
    }

    if (gameWon) {
        gameActive = false;
        displayWinMessage();
    } else if (isBoardFull()) {
        gameActive = false;
        displayTieMessage();
    }
};

const isBoardFull = () => {
    return fields.every((field) => field !== "");
};

// board item click method

const handleBoardItemClick = (event) => {
    const { classList } = event.target;
    const { position } = event.target.dataset;

    if (gameActive && !fields[position]) {
        fields[position] = activePlayer;
        classList.add(`board__item--filled-${activePlayer}`);
        validateGame();
        activePlayer = activePlayer === "X" ? "O" : "X";
    }
};

// reset button click method

const handleResetButtonClick = () => {
    setDefaults();
    resetBoardClasses();
    clearMessage();
};

// on load

setDefaults();

fieldsElements.forEach((field, index) => {
    field.addEventListener("click", handleBoardItemClick);
});

resetBtn.addEventListener("click", handleResetButtonClick);
