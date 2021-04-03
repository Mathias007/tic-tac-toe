const fieldsElements = document.querySelectorAll(".board__item");

const fields = ["", "", "", "", "", "", "", "", ""];

let activePlayer = "X";

fieldsElements.forEach((field, index) => {
    field.addEventListener("click", (event) => {
        const { classList } = event.target;
        const { position } = event.target.dataset;

        if (!fields[position]) {
            fields[position] = activePlayer;
            classList.add(`board__item--filled-${activePlayer}`);
            activePlayer = activePlayer === "X" ? "O" : "X";
        }
    });
});
