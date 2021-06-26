let btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e);
        let userSelection = e.toElement.className;
        console.log(userSelection);
        let result = playRound(userSelection, computerPlay());
        updateScore(result);
        checkScore();
    })
})

function playRound(userSelection, computerSelection) {
    // if user & computer choose the same
    if (userSelection == computerSelection) {
        return "Tie"; 
    }
    // if user beats computer
    else if (userSelection == "rock" && computerSelection == "scissors"|| 
            userSelection == "scissors" && computerSelection == "paper" ||
            userSelection == "paper" && computerSelection == "rock") {
        return "Win"; 
    }
    // if computer beats user
    else {
        return "Lose"; 
    }
}

function computerPlay() {   
    const possibleSelections = ["rock", "paper", "scissors"]; 
    // 0-2
    let randomIndex = Math.floor(Math.random() * 3); 
    // random array element
    return possibleSelections[randomIndex]; 
}




