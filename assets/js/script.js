/* jshint esversion: 11 */

let userChoice = "";
let computerChoice = "";
/**
 * Once the DOM is loaded it gets button elements as an array,
 * "loops" through them and listens for user clicks
 * then it assigns the right value and image to the userChoice variable
 */
document.addEventListener("DOMContentLoaded", function () {
    getModal();
    let buttons = document.getElementsByClassName("btn");
    for (let button of buttons) {
        button.addEventListener("click", btnClicked);
    }

    let images = document.getElementsByClassName("images");
    for (let image of images) {
        image.addEventListener("click", imgClicked);
    }
});

function btnClicked(e) {
    let btn = e.target;
    if (btn === document.getElementById("rock")) {        

        userChoice = "rock";
        document.getElementById("user-image").src = "assets/images/rock.png";
        document.getElementById("user-image").alt = "rock image";
        document.getElementById('user-image').setAttribute('aria-label', 'user selected rock');

    } else if (btn === document.getElementById("paper")) {

        userChoice = "paper";
        document.getElementById("user-image").src = "assets/images/paper.png";
        document.getElementById("user-image").alt = "paper image";
        document.getElementById('user-image').setAttribute('aria-label', 'user selected paper');
        
    } else if (btn === document.getElementById("scissors")) {

        userChoice = "scissors";
        document.getElementById("user-image").src = "assets/images/scissors.png";
        document.getElementById("user-image").alt = "scissors image";
        document.getElementById('user-image').setAttribute('aria-label', 'user selected scissors');
        
    } else if (btn === document.getElementById("lizard")) {

        userChoice = "lizard";
        document.getElementById("user-image").src = "assets/images/lizard.png";
        document.getElementById("user-image").alt = "lizard image";
        document.getElementById('user-image').setAttribute('aria-label', 'user selected lizard');
        
    } else {

        userChoice = "spock";
        document.getElementById("user-image").src = "assets/images/spock.png";
        document.getElementById("user-image").alt = "spock image";
        document.getElementById('user-image').setAttribute('aria-label', 'user selected spock');
        
    }    
    console.log(userChoice);
    runGame();    
}

/**
 * Generates a number between 0 and 4 and assigns it to the correspondent option
 * 0 = rock, 1 = paper, 2 = scissors, 3 = lizard and 4 = spock
 */
function getComputerAnswer() {
    computerChoice = Math.floor(Math.random() * 5);

    if (computerChoice === 0) {
        
        computerChoice = "rock";
        document.getElementById("computer-image").src = "assets/images/rock.png";
        document.getElementById("computer-image").alt = "rock image";
        document.getElementById('computer-image').setAttribute('aria-label', 'computer selected rock');
        

    } else if (computerChoice === 1) {

        computerChoice = "paper";
        document.getElementById("computer-image").src = "assets/images/paper.png";
        document.getElementById("computer-image").alt = "paper image";
        document.getElementById('computer-image').setAttribute('aria-label', 'computer selected paper');
        

    } else if (computerChoice === 2) {

        computerChoice = "scissors";
        document.getElementById("computer-image").src = "assets/images/scissors.png";
        document.getElementById("computer-image").alt = "scissors image";
        document.getElementById('computer-image').setAttribute('aria-label', 'computer selected scissors');
        

    } else if (computerChoice === 3) {

        computerChoice = "lizard";
        document.getElementById("computer-image").src = "assets/images/lizard.png";
        document.getElementById("computer-image").alt = "lizard image";
        document.getElementById('computer-image').setAttribute('aria-label', 'computer selected lizard');
        

    } else {

        computerChoice = "spock";
        document.getElementById("computer-image").src = "assets/images/spock.png";
        document.getElementById("computer-image").alt = "spock image";
        document.getElementById('computer-image').setAttribute('aria-label', 'computer selected spock');
        
    }
    console.log(computerChoice);    
}
