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
        return "Tie!"; // "tie" return value
    }
    // conditions if the user beats the computer
    else if (userSelection == "rock" && computerSelection == "scissors"|| 
    userSelection == "scissors" && computerSelection == "paper" ||
    userSelection == "paper" && computerSelection == "rock") {
        return "You win!"; // "win" return value
    }
    // computer wins if other cases are false
    else {
        return "You lose!"; // "lose" return value
    }
}

// Simulates multiple rounds of Rock-Paper-Scissors
// Takes one integer parameter representing # of rounds to play
function game(counter) {
    let userScore = 0; // user's score variable 
    let computerScore = 0; // computer's score variable
    let result; // declaration only

    // for loop using paramater as stopping value
    for (let i = 0; i < counter; i++) {
        result = playRound(userPlay(), computerPlay()); // storing result of each round in variable
        // switch statement to determine 
        switch (result) {
            case null:
                 

        
    }
}
















