function playGame() {
    const userChoice = prompt ("Выберите: камень, ножницы, бумага").toLowerCase();
    const choices = ["камень", "ножницы", бумага];
    const computerChoice = choices[Math.floor(Math.random()choices.length)];
}


    alert("Компьютер выбрал: "+ computerChoice);

    if (userChoice === computerChoice) {
        alert("Ничья");
    } else if (
        (userChoice === "камень" &&
            computerChoice === "ножницы") ||
        (userChoice === "ножницы" &&
            computerChoice === "бумага") ||
        )
        (userChoice === "бумага"&&
            computerChoice === "камень")

        