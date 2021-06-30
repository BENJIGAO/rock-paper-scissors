getMusicPermission();
main();

function main() {
    let btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.addEventListener('click', playGame)});
}

function playGame(e) {
    let userSelection = e.toElement.className.split(' ')[0];
    let computerSelection = computerPlay();
    let result = playRound(userSelection, computerSelection);
    displayIcons(userSelection, computerSelection, result);
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
    document.getElementById('user-tally').textContent = "0";
    document.getElementById('computer-tally').textContent = "0";
    document.getElementById('display-message').textContent = '';
    restart.textContent = '';
    restart.style.visibility = 'hidden';
    restart.removeEventListener('click', reset)
    main();
}

function checkScore() {
    let userScore = +document.getElementById('user-tally').textContent;
    let compScore = +document.getElementById('computer-tally').textContent;
    const displayMessage = document.getElementById('display-message');
    if (userScore == 5 && compScore == 5) {
        displayMessage.textContent = 'It\'s a tie :|';
        return "Done";
    }
    else if (userScore == 5) {
        displayMessage.textContent = 'You win :)';
        document.getElementById('win-game-audio').play();
        return "Done";
    }
    else if (compScore == 5) {
        displayMessage.textContent = 'You lose :(';
        document.getElementById('lose-game-audio').play();
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

function displayIcons(userSelection, computerSelection, result) {
    const userIcon = document.getElementById('user-play-icon');
    const userExpression = document.getElementById('user-icon');
    const computerIcon = document.getElementById('computer-play-icon');

    switch (userSelection) {
        case 'rock':
            userIcon.setAttribute('src', 'imgs/rock.png')
            userIcon.style.visibility = 'visible';
            break;
        case 'paper':
            userIcon.setAttribute('src', 'imgs/paper.png')
            userIcon.style.visibility = 'visible';
            break;
        case 'scissors':
            userIcon.setAttribute('src', 'imgs/scissors.png')
            userIcon.style.visibility = 'visible';
            break;
    }
    switch (computerSelection) {
        case 'rock':
            computerIcon.setAttribute('src', 'imgs/rock-reverse.png')
            computerIcon.style.visibility = 'visible';
            break;
        case 'paper':
            computerIcon.setAttribute('src', 'imgs/paper-reverse.png')
            computerIcon.style.visibility = 'visible';
            break;
        case 'scissors':
            computerIcon.setAttribute('src', 'imgs/scissors-reverse.png')
            computerIcon.style.visibility = 'visible';
            break;
    }
    switch (result) {
        case 'Win':
            userExpression.setAttribute('src', 'imgs/user-win.png');
            break;
        case 'Tie':
            userExpression.setAttribute('src', 'imgs/user-normal.png');
            break;
        case 'Lose':
            userExpression.setAttribute('src', 'imgs/user-lose.png');
            break;
    }
}

function getMusicPermission() {
    document.getElementById('yes').addEventListener('click', () => {
        document.getElementById('background-music').play();
        document.getElementById('music-permission').style.visibility = 'hidden';
    })
    document.getElementById('no').addEventListener('click', () => {
        document.getElementById('music-permission').style.visibility = 'hidden';
    })
}