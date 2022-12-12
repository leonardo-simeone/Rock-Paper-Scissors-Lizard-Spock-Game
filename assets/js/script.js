/* jshint esversion: 11 */

let userChoice = "";
let computerChoice = "";
let buttons = document.querySelectorAll(".btn");
let moveCounter = 0;
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
        image.addEventListener("click", chooseFromButtons);
    }

    let reset = document.getElementsByTagName("h3")[0];
    reset.addEventListener("click", resetGame);

});

/**
 * this function executes the logic to assign the userChoice variable a value based on the button the user clicked,
 * also forces the icons to be seen as part of the button they're in in case they're clicked
 */
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
        document.getElementById("message").innerText = "The game is a tie!";

    } else if (userChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) {
        document.getElementById("user-score").innerText = ++userScore;        
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) {
        document.getElementById("user-score").innerText = ++userScore;        
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) {
        document.getElementById("user-score").innerText = ++userScore;        
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "lizard" && (computerChoice === "paper" || computerChoice === "spock")) {
        document.getElementById("user-score").innerText = ++userScore;        
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else if (userChoice === "spock" && (computerChoice === "rock" || computerChoice === "scissors")) {
        document.getElementById("user-score").innerText = ++userScore;        
        document.getElementById("message").innerText = "Congratulations! You win!";

    } else {
        document.getElementById("computer-score").innerText = ++computerScore;        
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
    }

    // When the user clicks on <span> (x), close the modal
    btnClose.addEventListener("click", modalClosed);
    function modalClosed() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", windowClicked);
    function windowClicked(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/**
 * indicates the user to select their choice from one of the options above,
 * it lets the user know via modal that the game area images are not interactive
 */
function chooseFromButtons() {    

    let modalWarning = document.getElementById("choose-from-button");

    modalWarning.style.display = "block";

    // Get the <span> element that closes the modal
    let btnClose = document.getElementById("choose-from-btn-close");        

    // When the user clicks on <span> (x), close the modal
    btnClose.addEventListener("click", modalClosed);
    function modalClosed() {
        modalWarning.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", windowClicked);
    function windowClicked(event) {
        if (event.target == modalWarning) {
            modalWarning.style.display = "none";
        }
    }
}

/**
 * this function monitors both scores the user's and the computer's, once either score
 * has reached ten points, it executes the logic to stop the game and let the user
 * know that the round is over and that to play again they need to restart game
 */
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
        moveCounter++;
    }
}

/**
 * it disables and hides the options buttons and the call to action (make your choice) heading
 */
function disableBtns() {
    document.getElementById("btn-options").style.display = "none";
    document.getElementById("cta").style.display = "none";
    buttons.forEach(button => {
        button.classList.add("btn-disabled");
    });
}

/**
 * it enables and shows the options buttons and the call to action (make your choice) heading
 */
function enableBtns() {
    document.getElementById("btn-options").style.display = "block";
    document.getElementById("cta").style.display = "block";
    buttons.forEach(button => {
        button.classList.remove("btn-disabled");
    });
}

/**
 * this function executes the logic to reset the game. it sets the scores back to zero,
 * it sets the game area images back to the initial one and it deletes the game result message
 */
function resetGame() {
    enableBtns();
    document.getElementById("user-image").src = "assets/images/rpsls.png";
    document.getElementById("user-image").alt = "Rock-Paper-Scissors-Lizard-Spock";
    document.getElementById("computer-image").src = "assets/images/rpsls.png";
    document.getElementById("computer-image").alt = "Rock-Paper-Scissors-Lizard-Spock";

    document.getElementById("user-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;

    document.getElementById("message").innerText = "";
}

/**
 * this function triggers a modal message that indicates the user they have won
 */
function finalScoreWinModal() {    

    let finalModal = document.getElementById("final-score-win-modal");

    finalModal.style.display = "block";

    // Get the <span> element that closes the modal
    let btnClose = document.getElementById("final-score-win-close");        

    // When the user clicks on <span> (x), close the modal
    btnClose.addEventListener("click", modalClosed);
    function modalClosed() {
        finalModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", windowClicked);
    function windowClicked(event) {
        if (event.target == finalModal) {
            finalModal.style.display = "none";
        }
    }
}

/**
 * this function triggers a modal message that indicates the user the computer has won
 */
function finalScoreLoseModal() {    

    let finalModal = document.getElementById("final-score-lose-modal");

    finalModal.style.display = "block";

    // Get the <span> element that closes the modal
    let btnClose = document.getElementById("final-score-lose-close");        

    // When the user clicks on <span> (x), close the modal
    btnClose.addEventListener("click", modalClosed);
    function modalClosed() {
        finalModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", windowClicked);
    function windowClicked(event) {
        if (event.target == finalModal) {
            finalModal.style.display = "none";
        }
    }
}