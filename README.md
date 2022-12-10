# Rock Paper Scissors Lizard Spock Game

Rock Paper Scissors Lizard Spock game, is a JavaScript based online game that offers users an alternative to the world-known Rock Paper Scissors game. Created by internet pioneer Sam Kass, this game is an improvement of the classic game and adds an extra two choices to make a total of five. The game was popularized by Dr. Sheldon Cooper, a fictional character played by Jim Parsons from the acclaimed tv show The Big Bang Theory. Since the game was first introduced in the show it became quite popular amongst fans and general public.

In this particular version of the game, the user can choose one out of the five options per game to play against the computer, the first one to score ten points wins the round. The game is easy to play and the rules are well explained. To access the games rules the user has to click on the "Game Rules" button available right before the game area. Once the round is finished then the selection buttons are disabled and the user is advised that in order to play another round, they must click/tap on the "Restart Game" button. A score indicator is provided for the user to be able to see in real time both scores.

![Responsive Mock-up](documentation/am-i-responsive.png)

## UX

### Wireframing

To wireframe the website I used [Whimsical](https://whimsical.com/wireframes). Even though initially I planned on including the game rules via an always visible image, that plan changed given that, when considering screen space as well as a accessibility, I realized that the best course of action was to include the game rules within a modal and in written format so that screen readers would be able to read it.

![Wireframe](documentation/whimsical-muck-up.png)

### Fonts and Colors Selection

* __Fonts.__
    
    * I browsed [heyreliable](https://heyreliable.com/ultimate-google-font-pairings/) google fonts pairings available in their collection and selected number 20 based on the look and mood wanted for the game.
    
    ![Fonts](documentation/fonts-selected.png)

    * The fonts are clear to read and have a friendly and inviting style. Nothing too serious since the user is there just to have a bit of fun and entertainment.

* __Colors.__

    * For the colors selection, I used the [ColorSpace](https://mycolor.space/) website which provides the option to input any color you want and then it will provide a selection of matching/compatible colors that relate well to that "base" color you selected in the first place.
    * The base color I selected is [#00001D](https://mycolor.space/?hex=%2300001D&sub=1), all the related colors I used, I referenced them accordingly in the css style sheet.    

    ![Colors](documentation/colors-selected.png)

## Features

* __Game Name/Title__

    * The game title is included within the header as the first element in the html document to indicate the user (new or previous), that the site is a game and what the game is about. It is placed within good contrasting background which makes it easy to read.

![Game Name](documentation/game-title.png)

* __Game Rules Button__

    * The game rules button is very self explanatory, once the user clicks on it a modal opens, in this modal the game's general rules are explained as well as the round top score needed to win it.

    ![Game Rules Button](documentation/game-rules-button.png)

    * At the end of the rules button modal I included developer credits, within an anchor element I also included the game's GitHub link which opens in a new tab.
    * The button has visual cues to indicate the user that they're hovering over the button by changing color.
    * To exit the rules modal, the user can either click on the X at the top right corner or click anywhere outside of the modal.
    * The execution of this modal is possible thanks to JavaScript and the getModal() function. This function shows the modal when the function is called and allows for it to be closed by either clicking X or clicking anywhere outside of the modal.

    ```js
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
    ```

![Game Rules](documentation/game-rules.png)

* __Make Your Choice Heading__

    * This heading is an invitation to the user to start playing the game. A call to action for the user to make their choice and start playing.

![Call to Action](documentation/call-to-action.png)

* __Choice Options Buttons__

    * These buttons will allow the user to select their option from the options available to play against the computer.
    * The button have visual cues that allow the user to know when they're hovering over one of them by changing color.

    ![Options Buttons](documentation/options-buttons.png)

    * Once clicked the button will send the command to JavaScript to run the necessary logic to play the game.
    * When an option is selected, the image corresponding the selected option will appear in the user game area with its respective alt and aria-label attributes.

    ![Options Buttons Logic](documentation/options-buttons-logic.png)

    * Thanks to JavaScript and the document event listener at the start of the JS script, we're able to listen to user click and run the event handler function btnClicked() which assigns the user's choice variable, image, alt and aria-label attributes and calls the runGame() function. The run game function then gets the computer choice by running the getComputerAnswer() function first and then compares the two choices (user's and computer's) to increment the corresponding score.

    ```js
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
            image.addEventListener("click", chooseFromButtons);
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
                    
        runGame();
            
    }
    ``` 

* __Result Message__

    * This feature shows only when the user has started the game and shows a message indicating the result of the game congratulating them should they win or indicating that the computer has won.

    ![Message](documentation/message.png)

    * This functionality is embedded in the runGame() function, which based on the user's and computer's choices comparison result, it will assign and show a corresponding message to the user. This message is fully deleted once the game is reset.

    ```js
    function runGame() {

        getComputerAnswer();

        let userScore = parseInt(document.getElementById("user-score").innerText);
        let computerScore = parseInt(document.getElementById("computer-score").innerText);

        if (userChoice === computerChoice) {            
            document.getElementById("message").innerText = "The game is a tie!";

        } else if (userChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) {
            document.getElementById("user-score").innerText = ++userScore;            
            document.getElementById("message").innerText = "Congratulations! You win!";
        }

        ...
    }

    ``` 

* __Scoreboards__

    * The score boards are designed to show the user the current round score in real time, each game won will add a point to the winner's score.
    * The score is updated via a functionality embedded in the runGame() function as shown in the code snippet above.
    * Scoreboards are clearly identifiable thanks to their corresponding locations and colors.

    ![Scoreboards](documentation/scoreboards.png)

* __User and Computer Game Areas__

    * Initially, the game areas both contain the same image, in this image the five pictures of the five options are shown.

    ![Game Areas](documentation/user-computer-game-area.png)
    
    * Once the user selects one of the options by clicking one of the buttons the game starts and the corresponding image to the user selection will be shown in their area, the same will occur for the computer area. All the images will have their corresponding alt and aria-label attributes making it easier for screen readers to read which options have been selected by the parties in play as shown in the code snippet below for the computer choice case.

    ```js
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

    ``` 

    * In case the user gets confused and decides to click on the initial (game-area) image, a modal message has been added that indicates the user that they need to select an option from the options available above in the case of said images being clicked. This is possible thanks to the event listener when the DOM is loaded and the chooseFromButtons() function as shown below. Also a gentle reminder for the user was included in this modal, click on restart game to play again once the round is over.

    ```js
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
    ```

    ![Click Image Message](documentation/img-clicked-modal.png)

* __Restart Game__

    * The Restart Game clickable heading was designed to give the user the option to reset the game before the round is over and to allow the user to reset the game once the round is over.

    ![Reset](documentation/restart-game.png) 

    * An event listener was used to listen to user's click (please see previous code snippet) and a call to the resetGame() function when said event happens (please see previous code snippet).

    ```js
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

    ```

    * Once the function is called the options buttons will be re enabled given they're disabled when either score reaches ten points, also user and computer area images will be set back to the initial images, the scores will be set back to zero, and the game result message will dissapear.

    * The Endgame() function, is the one responsible for trigerring the disableBtns() function which disables the buttons so that the user can't keep playing until the game is restarted. This function runs at the end of the runGame() function, this way, it's able to monitor the scores and execute its logic when needed.

    ```js
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

    ```

    * The disabling and enabling of the options buttons and call to action heading, is achieved thanks to adding and removing a CSS class in the buttons elements in HTML, as well as the display style change in the elements to make them dissapear, managing to further reinforce the need to restart the game once the round is over. This way the user has no other choice but to click the rules button or the restart game heading.

    ```js
        function disableBtns() {
            document.getElementById("btn-options").style.display = "none";
            document.getElementById("cta").style.display = "none";
            buttons.forEach(button => {
                button.classList.add("btn-disabled");
            });
        }

        function enableBtns() {
            document.getElementById("btn-options").style.display = "block";
            document.getElementById("cta").style.display = "block";
            buttons.forEach(button => {
                button.classList.remove("btn-disabled");
            });
        }

    ```

    ```css
        .btn-disabled {
            pointer-events: none;
        }
    ```

    ![Restart Game Enforcement](documentation/restart-game-enforcement.png) 
    
* __End Game Win and Lose Modals__

    * Once the 10 points mark is reached by either party, a modal is trigerred which delivers a message depending on who the winner was. This message will explicitly indicate the user that the round is over and should they want to keep playing, they need to restart the game.
    * The finalScoreWinModal() function or the finalScoreLoseModal() function will be called in the endGame() function, depending on the round's result, showing then the corresponding HTML modal div.

    ```js
        
    function finalScoreWinModal() {    

        let finalModal = document.getElementById("final-score-win-modal");

        finalModal.style.display = "block";

        // Get the <span> element that closes the modal
        let btnClose = document.getElementById("final-score-win-close");        

        // When the user clicks on <span> (x), close the modal
        btnClose.addEventListener("click", modalClosed);
        function modalClosed() {
            finalModal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", windowClicked);
        function windowClicked(event) {
            if (event.target == finalModal) {
                finalModal.style.display = "none";
            }
        };
    }

    ```

    ![Win Modal](documentation/winning-round-modal.png) 

    ```js

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

    ```

    ![Lose Modal](documentation/losing-round-modal.png)

## Tools and Technologies

* HTML: It was used to structure the content of the game both semantically and visually.
* CSS: It was used for responsiveness, styling and layouts.
* JavaScript: It was used to code the logic and interactivity behind the game.
* [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox): It was used for improved responsiveness and more control while positioning elements instead of floats.
* [Git](https://git-scm.com/): It was used for version control throughout the project developement process.
* [GitHub](https://github.com/): It was used as a secure cloud-based files storage for my code and repositories in general. Also as a deployment platform via GitHub Pages.
* [Gitpod](https://www.gitpod.io/): It was used as a cloud-based IDE to develope the site.
* [Whimsical](https://whimsical.com/wireframes): It was used to wireframe the initial idea/mock-up of the project.
* [Adobe Photoshop](https://www.adobe.com/ie/products/photoshop.html): It was used to resize, cut and color images as well as framing several images together into one.

## Release History

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**September 1 2021:** Remove `PGHOSTADDR` environment variable.

**July 19 2021:** Remove `font_fix` script now that the terminal font issue is fixed.

**July 2 2021:** Remove extensions that are not available in Open VSX.

**June 30 2021:** Combined the P4 and P5 templates into one file, added the uptime script. See the FAQ at the end of this file.

**June 10 2021:** Added: `font_fix` script and alias to fix the Terminal font issue

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

------

## FAQ about the uptime script

**Why have you added this script?**

It will help us to calculate how many running workspaces there are at any one time, which greatly helps us with cost and capacity planning. It will help us decide on the future direction of our cloud-based IDE strategy.

**How will this affect me?**

For everyday usage of Gitpod, it doesn’t have any effect at all. The script only captures the following data:

- An ID that is randomly generated each time the workspace is started.
- The current date and time
- The workspace status of “started” or “running”, which is sent every 5 minutes.

It is not possible for us or anyone else to trace the random ID back to an individual, and no personal data is being captured. It will not slow down the workspace or affect your work.

**So….?**

We want to tell you this so that we are being completely transparent about the data we collect and what we do with it.

**Can I opt out?**

Yes, you can. Since no personally identifiable information is being captured, we'd appreciate it if you let the script run; however if you are unhappy with the idea, simply run the following commands from the terminal window after creating the workspace, and this will remove the uptime script:

```
pkill uptime.sh
rm .vscode/uptime.sh
```

**Anything more?**

Yes! We'd strongly encourage you to look at the source code of the `uptime.sh` file so that you know what it's doing. As future software developers, it will be great practice to see how these shell scripts work.

---

Happy coding!
