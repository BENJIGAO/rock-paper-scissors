getMusicPermission();
main();

function main() {
    const btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.addEventListener('click', playGame)});
    return;
}

function playGame(e) {
    let userSelection = e.toElement.className.split(' ')[0];
    let computerSelection = computerPlay();
    let result = playRound(userSelection, computerSelection);
    displayUserPlay(userSelection);
    disableButtons();
    hideComputerIcon();
    setTimeout(playRestOfGame, 1000, computerSelection, result);
}

function hideComputerIcon() {
    const computerIcon = document.getElementById('computer-play-icon');
    computerIcon.style.visibility = 'hidden';
}

function playRestOfGame (computerSelection, result) {
    displayOtherIcons(computerSelection, result);
    updateScore(result);
    animateScore(result);
    enableButtons();
    if (checkScore() == 'Done') {
        endGame();
        return;
    }
    playRoundAudio(result);
    
}

function animateScore(result) {
    const userTally = document.getElementById('user-tally');
    const computerTally = document.getElementById('computer-tally');
    if (result == 'tie') {
        userTally.classList.add('tally-animation');
        computerTally.classList.add('tally-animation');
        return;
    }

    else if (result == 'win') {
        userTally.classList.add('tally-animation');
        return;
    }
    else {
        computerTally.classList.add('tally-animation');
        return;
    }
}

function playRound(userSelection, computerSelection) {
    // if user & computer choose the same
    if (userSelection == computerSelection) {
        return 'tie'; 
    }
    // if user beats computer
    else if (userSelection == 'rock' && computerSelection == 'scissors'|| 
            userSelection == 'scissors' && computerSelection == 'paper' ||
            userSelection == 'paper' && computerSelection == 'rock') {
        return 'win'; 
    }
    // if computer beats user
    else {
        return 'lose'; 
    }
}

function disableButtons() {
    const btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.disabled = true});
}


function enableButtons() {
    const btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.disabled = false});
    
}

function displayUserPlay(userSelection) {
    const userIcon = document.querySelector('.user-play-icon');
    resetTransition(userIcon);

    switch (userSelection) {
        case 'rock':
            userIcon.setAttribute('src', 'imgs/rock.png');
            break;
        case 'paper':
            userIcon.setAttribute('src', 'imgs/paper.png');
            break;
        case 'scissors':
            userIcon.setAttribute('src', 'imgs/scissors.png');
            break;
    }
    userIcon.classList.remove('remove-transition');
    userIcon.style.visibility = 'visible';
    userIcon.classList.add('emerging-element');

}

function displayOtherIcons(computerSelection, result) {
    const userExpression = document.getElementById('user-icon');
    const computerIcon = document.getElementById('computer-play-icon');

    
    switch (computerSelection) {
        case 'rock':
            computerIcon.setAttribute('src', 'imgs/rock-reverse.png');
            break;
        case 'paper':
            computerIcon.setAttribute('src', 'imgs/paper-reverse.png');
            break;
        case 'scissors':
            computerIcon.setAttribute('src', 'imgs/scissors-reverse.png');
            break;
    }
    computerIcon.style.visibility = 'visible';

    switch (result) {
        case 'win':
            userExpression.setAttribute('src', 'imgs/user-win.png');
            break;
        case 'tie':
            userExpression.setAttribute('src', 'imgs/user-normal.png');
            break;
        case 'lose':
            userExpression.setAttribute('src', 'imgs/user-lose.png');
            break;
    }
    return;
}

function playRoundAudio(result) {
    if (result == 'win') {
        const audio = document.getElementById('win-round-audio');
        audio.currentTime = 0;
        audio.play()
        return;
    }
    else if (result == 'tie') {
        const audio = document.getElementById('tie-round-audio');
        audio.currentTime = 0;
        audio.play()
        return;
    }
    else {
        const audio = document.getElementById('lose-round-audio');
        audio.currentTime = 0;
        audio.play()
        return;

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
    return;
}

function reset() {
    document.getElementById('user-tally').textContent = '0';
    document.getElementById('computer-tally').textContent = '0';
    document.getElementById('display-message').textContent = '';
    const restart = document.getElementById('restart');
    restart.textContent = '';
    restart.style.visibility = 'hidden';
    restart.removeEventListener('click', reset);
    document.getElementById('user-icon').setAttribute('src', 'imgs/user-normal.png');
    const userIcon = document.querySelector('.user-play-icon')
    resetTransition(userIcon);
    userIcon.style.visibility = 'hidden';
    document.getElementById('computer-play-icon').style.visibility = 'hidden';
    main();
    return;
}

function checkScore() {
    let userScore = +document.getElementById('user-tally').textContent;
    let compScore = +document.getElementById('computer-tally').textContent;
    const displayMessage = document.getElementById('display-message');
    if (userScore == 5 && compScore == 5) {
        displayMessage.textContent = 'It\'s a tie :|';
        playFinishedGameAudio('tie');
        return 'Done';
    }
    else if (userScore == 5) {
        displayMessage.textContent = 'You win :)';
        playFinishedGameAudio('win');
        return 'Done';
    }
    else if (compScore == 5) {
        displayMessage.textContent = 'You lose :(';
        playFinishedGameAudio('lose');
        return 'Done';
    }
}

function playFinishedGameAudio(endResult) {
    const audio = document.getElementById(`${endResult}-game-audio`)
    audio.currentTime = 0;
    audio.play()
}

function updateScore(result) {
    const displayMessage = document.getElementById('display-message');
    if (result == 'tie') {
        const userScore = document.getElementById('user-tally');
        let tmpUserScore = +userScore.textContent;
        userScore.textContent = ++tmpUserScore; 

        const CompScore = document.getElementById('computer-tally');
        let tmpCompScore = +CompScore.textContent;
        CompScore.textContent = ++tmpCompScore; 

        displayMessage.textContent = 'Tie!';
        return;
    }

    else if (result == 'win') {
        const userScore = document.getElementById('user-tally');
        let tmpUserScore = +userScore.textContent;
        userScore.textContent = ++tmpUserScore; 

        displayMessage.textContent = 'Win!';
        return;
    }
    else {
        const CompScore = document.getElementById('computer-tally');
        let tmpCompScore = +CompScore.textContent;
        CompScore.textContent = ++tmpCompScore; 
        displayMessage.textContent = 'Lose!';
        return;
    }
}

function playRound(userSelection, computerSelection) {
    // if user & computer choose the same
    if (userSelection == computerSelection) {
        return 'tie'; 
    }
    // if user beats computer
    else if (userSelection == 'rock' && computerSelection == 'scissors'|| 
            userSelection == 'scissors' && computerSelection == 'paper' ||
            userSelection == 'paper' && computerSelection == 'rock') {
        return 'win'; 
    }
    // if computer beats user
    else {
        return 'lose'; 
    }
}

function computerPlay() {   
    const possibleSelections = ['rock', 'paper', 'scissors']; 
    // 0-2
    let randomIndex = Math.floor(Math.random() * 3); 
    // random array element
    return possibleSelections[randomIndex]; 
}

function resetTransition(element) {
    element.classList.add('remove-transition');
    element.classList.remove('emerging-element');
    element.offsetTop;
}

function getMusicPermission() {
    document.getElementById('yes').addEventListener('click', () => {
        document.getElementById('background-music').play();
        document.getElementById('music-permission').style.visibility = 'hidden';
    })
    document.getElementById('no').addEventListener('click', () => {
        document.getElementById('music-permission').style.visibility = 'hidden';
    })
    return;
}
