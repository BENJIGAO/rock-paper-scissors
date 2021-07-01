getMusicPermission();
main();

function main() {
    let btns = document.querySelectorAll('div#rps-icons > button');
    btns.forEach((btn) => {btn.addEventListener('click', playGame)});
    return;
}

function playGame(e) {
    let userSelection = e.toElement.className.split(' ')[0];
    let computerSelection = computerPlay();
    let result = playRound(userSelection, computerSelection);
    displayIcons(userSelection, computerSelection, result);
    updateScore(result);
    if (checkScore() == 'Done') {
        endGame();
        return;
    }
    playRoundAudio(result);
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
    document.querySelector('.user-play-icon').style.visibility = 'hidden';
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

function displayIcons(userSelection, computerSelection, result) {
    const userExpression = document.getElementById('user-icon');
    const userIcon = document.querySelector('.user-play-icon');
    const computerIcon = document.getElementById('computer-play-icon');

    userIcon.classList.remove('reset-transition');
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
    userIcon.style.visibility = 'visible';
    userIcon.classList.add('emerging-element');
    userIcon.classList.add('reset-transition');
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