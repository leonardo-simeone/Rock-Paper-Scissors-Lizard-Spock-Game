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
