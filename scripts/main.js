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
            return "User cancelled"; // returns "cancelled" string if true 
        }
        
        userSelection = userSelection.toLowerCase(); // lowercases userSelection (!= null/undefined)
    }
    return userSelection; // returns lowercased valid user input
}