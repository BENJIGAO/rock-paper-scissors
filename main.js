main();

function main() {
    let btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.addEventListener('click', playGame)});
}

function playGame(e) {
    let userSelection = e.toElement.className;
    let result = playRound(userSelection, computerPlay());
    updateScore(result);
    if (checkScore() == "Done") {
        endGame();
    }
}

function endGame() {
    let btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.removeEventListener('click', playGame)});
    const tmpRef = document.getElementById('score-display');
    const restart = document.getElementById('restart');
    restart.textContent = 'Restart?';
    restart.style.visibility = 'visible';
    restart.addEventListener('click', reset)
}

function reset() {
    location.reload();

}


function checkScore() {
    let userScore = +document.getElementById('user-tally').textContent;
    let compScore = +document.getElementById('computer-tally').textContent;
    const displayMessage = document.getElementById('display-message');
    if (userScore == 5) {
        displayMessage.textContent = 'You win :)';
        return "Done";
    }
    else if (compScore == 5) {
        displayMessage.textContent = 'You lose :(';
        return "Done";
    }

    else if (userScore == 5 && compScore == 5) {
        displayMessage.textContent = 'It\'s a tie :|';
        return "Done";
    }
}

function updateScore(result) {
    const displayMessage = document.getElementById('display-message');
    if (result == 'Tie') {
        const userScore = document.getElementById('user-tally');
        let tmpUserScore = +userScore.textContent;
        userScore.textContent = ++tmpUserScore; 

        const CompScore = document.getElementById('computer-tally');
        let tmpCompScore = +CompScore.textContent;
        CompScore.textContent = ++tmpCompScore; 

        displayMessage.textContent = 'Tie!';
    }

    else if (result == 'Win') {
        const userScore = document.getElementById('user-tally');
        let tmpUserScore = +userScore.textContent;
        userScore.textContent = ++tmpUserScore; 

        displayMessage.textContent = 'Win!';
    }
    else {
        const CompScore = document.getElementById('computer-tally');
        let tmpCompScore = +CompScore.textContent;
        CompScore.textContent = ++tmpCompScore; 

        displayMessage.textContent = 'Lose!';
    }
}



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