function computerPlay() {   
    const possibleSelections = ["rock", "paper", "scissors"]; 
    // 0-2
    let randomIndex = Math.floor(Math.random() * 3); 
    // random array element
    return possibleSelections[randomIndex]; 
}

function userPlay() { 
    const validAnswers = ["rock", "paper", "scissors"];
    // user's input 
    let userSelection; 
    // loops until user cancels or puts valid input
    while (!validAnswers.includes(userSelection)) {
        userSelection = prompt("Choose 'rock', 'paper', or 'scissors'"); 
        // checking if user pressed "Cancel"
        if (userSelection == null) {
            return null; 
        }
        // to make input case-insensitive
        userSelection = userSelection.toLowerCase(); 
    }
    // returns valid input
    return userSelection; 
}

// computes one round of Rock-Paper-Scissors
function playRound(userSelection, computerSelection) {
    // if user cancelled
    if (userSelection == null) {
        return null;
    }
    // if user & computer choose the same
    else if (userSelection == computerSelection) {
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

// parameter == # of rounds of Rock-Paper-Scissors
function game(counter) {
    let userScore = 0; 
    let computerScore = 0; 
    let result; // result of one round

    // loops "counter" times
    for (let i = 0; i < counter; i++) {
        result = playRound(userPlay(), computerPlay()); // one round/iteration
        // To determine results of one round
        switch (result) {
            // User cancelled
            case null:
                console.log("User Cancelled");
                return;
            // User tied round
            case "Tie":
                userScore++;
                computerScore++;
                break;
            // User won round
            case "Win":
                userScore++;
                break;
            // User lost round
            case "Lose":
                computerScore++;
                break;
        }
    } // finals results are in; comparison time!
    // To determine who won overall
    switch (true) {
        // User tied
        case userScore == computerScore:
            console.log("Fucking tie I quit");
            break;
        // User won
        case userScore > computerScore:
            console.log("Let's fucking go, I take the dubs"); 
            break;
        // User lost
        case userScore < computerScore:
            console.log("Bruh this is rigged");
            break;
    }
    return; // after logging result, return no value
}
