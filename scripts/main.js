// Simulates a computer playing a move for rock-paper-scissors
function computerPlay() {   
    const possibleSelections = ["rock", "paper", "scissors"]; // list of three possible choices

    let randomIndex = Math.floor(Math.random() * 3); // generating random number from 0-2

    return possibleSelections[randomIndex]; // return random array element using randomIndex
}

// Gets valid input from user for rock-paper-scissors game
function userPlay() { 
    const validAnswers = ["rock", "paper", "scissors"]; // array of acceptable answers

    let userSelection; 

    // while loop checking validity of user input
    while (!validAnswers.includes(userSelection)) {
        userSelection = prompt("Choose 'rock', 'paper', or 'scissors'"); // Storing user input

        // checking if user pressed "Cancel"
        if (userSelection == null) {
            return null; // returns "null" string if true 
        }
        
        userSelection = userSelection.toLowerCase(); // lowercases userSelection (!= null/undefined)
    }
    return userSelection; // returns lowercased valid user input
}

// Computes results of one round of Rock-Paper-Scissors
// Takes two inputs: computer's selection, user's selection
function playRound(userSelection, computerSelection) {
    // condition if user cancelled
    if (userSelection == null) {
        return null;
    }
    
    // condition if the user & computer choose the same
    else if (userSelection == computerSelection) {
        return "Tie"; // "tie" return value
    }
    // conditions if the user beats the computer
    else if (userSelection == "rock" && computerSelection == "scissors"|| 
    userSelection == "scissors" && computerSelection == "paper" ||
    userSelection == "paper" && computerSelection == "rock") {
        return "Win"; // "win" return value
    }
    // computer wins if other cases are false
    else {
        return "Lose"; // "lose" return value
    }
}

// Simulates multiple Rock-Paper-Scissors rounds
// One integer parameter --> # of rounds to play
function game(counter) {
    let userScore = 0; // user's score 
    let computerScore = 0; // computer's score 
    let result; // result of one round

    // for loop using paramater as stopping value
    for (let i = 0; i < counter; i++) {
        result = playRound(userPlay(), computerPlay()); // one round each iteration
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
