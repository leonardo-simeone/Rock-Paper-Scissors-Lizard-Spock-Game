/* jshint esversion: 11 */

let userChoice = "";
let computerChoice = "";
let buttons = document.querySelectorAll(".btn");
/**
 * Once the DOM is loaded it gets button elements as an array,
 * "loops" through them and listens for user clicks
 * then it assigns the right value and image to the userChoice variable
 */
document.addEventListener("DOMContentLoaded", function () {
    getModal();
    buttons.forEach(button => { 
        button.addEventListener("click", btnClicked);
    });

    let images = document.querySelectorAll(".images");
    for (let image of images) {
        image.addEventListener("click", imgClicked);
    }

    let reset = document.getElementsByTagName("h3")[0];
    reset.addEventListener("click", resetGame);

});

function btnClicked(e) {
    let btn = e.target;    
    if(btn.nodeName === "I") {
        btn = btn.parentElement;
    }

    switch (btn) {
        case document.getElementById("rock"):
            userChoice = "rock";
            break;
        
        case document.getElementById("paper"):
            userChoice = "paper";
            break;
        
        case document.getElementById("scissors"):
            userChoice = "scissors";
            break;
                
        case document.getElementById("lizard"):
            userChoice = "lizard";
            break;
    
        case document.getElementById("spock"):
            userChoice = "spock";
            break;

        default:
            console.log("invalid choice");
    }

    document.getElementById("user-image").src = `assets/images/${userChoice}.png`;
    document.getElementById("user-image").alt = `${userChoice} image`;
    document.getElementById('user-image').setAttribute('aria-label', `user selected ${userChoice}`);
    
    console.log(userChoice);
    runGame();
        
}

/**
 * Generates a number between 0 and 4 and assigns it to the correspondent option
 * 0 = rock, 1 = paper, 2 = scissors, 3 = lizard and 4 = spock
 */
function getComputerAnswer() {
    computerChoice = Math.floor(Math.random() * 5);

    switch (computerChoice) {
        case 0:
            computerChoice = "rock";
            break;
        
        case 1:
            computerChoice = "paper";
            break;
        
        case 2:
            computerChoice = "scissors";
            break;
                
        case 3:
            computerChoice = "lizard";
            break;
    
        case 4:
            computerChoice = "spock";
            break;

        default:
            console.log("invalid choice");
    }

    document.getElementById("computer-image").src = `assets/images/${computerChoice}.png`;
    document.getElementById("computer-image").alt = `${computerChoice} image`;
    document.getElementById('computer-image').setAttribute('aria-label', `computer selected ${computerChoice}`);

    console.log(computerChoice);    
}

/**
 * This function kicks in once the user has selected one of the options,
 * it runs the getComputerAnswer() function first to determine the computer's choice
 * then it compares the user's and computer's choices and assigns a winner based on the rules
 * it also updates the scores and prints a message on the screen indicating the result
 */
function runGame() {

    getComputerAnswer();

    let userScore = parseInt(document.getElementById("user-score").innerText);
    let computerScore = parseInt(document.getElementById("computer-score").innerText);

    if (userChoice === computerChoice) {
        console.log("The game is a tie!");
        document.getElementById("message").innerText = "The game is a tie!";

    } else if (userChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) {
        document.getElementById("user-score").innerText = ++userScore;
        console.log("You win!");
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) {
        document.getElementById("user-score").innerText = ++userScore;
        console.log("You win!");
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) {
        document.getElementById("user-score").innerText = ++userScore;
        console.log("You win!");
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "lizard" && (computerChoice === "paper" || computerChoice === "spock")) {
        document.getElementById("user-score").innerText = ++userScore;
        console.log("You win!");
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "spock" && (computerChoice === "rock" || computerChoice === "scissors")) {
        document.getElementById("user-score").innerText = ++userScore;
        console.log("You win!");
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else {
        document.getElementById("computer-score").innerText = ++computerScore;
        console.log("Sorry, computer wins!");
        document.getElementById("message").innerText = "Computer wins! Better luck next time.";
    }   
    endGame();
}

/** it shows the game rules via a modal by clicking on the "game rules" button */
function getModal() {

    let modal = document.getElementById("rules-modal");

    // Get the button that opens the modal
    let btn = document.getElementById("btn-rules");

    // Get the <span> element that closes the modal
    let btnClose = document.getElementById("btn-close");

    // When the user clicks the button, open the modal 
    btn.addEventListener("click", modalClicked);
    function modalClicked() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    btnClose.addEventListener("click", modalClosed);
    function modalClosed() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", windowClicked);
    function windowClicked(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

/**
 * indicates the user to select their choice from one of the options above,
 * it lets the user know via an "alert" that the game area images are not interactive
 */
function imgClicked() { 

    alert ("Please select one of the options above!");
}

function endGame() {
    let finalUserScore = parseInt(document.getElementById("user-score").innerText);
    let finalComputerScore = parseInt(document.getElementById("computer-score").innerText);

    if(finalUserScore === 10 && finalComputerScore < 10) {
        document.getElementById("message").innerText = "Well Done! You Have Won this round!";
        disableBtns();
        finalScoreWinModal();        
        
    } else if (finalComputerScore === 10 && finalUserScore < 10) {
        document.getElementById("message").innerText = "Computer won this round";        
        disableBtns();
        finalScoreLoseModal();        
        
    } else {
        console.log("continue playing");
    }
}

function disableBtns() {
    buttons.forEach(button => {
        button.classList.add("btn-disabled");
    });
}

function enableBtns() {
    buttons.forEach(button => {
        button.classList.remove("btn-disabled");
    });
}
