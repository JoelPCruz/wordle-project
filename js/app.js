document.addEventListener('DOMContentLoaded', () => {
    createSquares(); // execute the function when loaded.
    
    let guessedWords = [[]];
    let availableSpace = 1;
    const keys = document.querySelectorAll('.keyboard-row button'); /* Selecting the keys */
    let word = 'dairy'; /* creating a 5 letter word */
    let guessedWordCount = 0; /* starts at 1 */

    

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length; /* Checks the length of the array. */
        return guessedWords[numberOfGuessedWords - 1];
    }
    /* taking our values from the button and assigning them.  */
    function updateGuessedWords(letter) {   
        const currentWordArr = getCurrentWordArr();
        
        if (currentWordArr && currentWordArr.length < 5) { /* checking that we havnt filled in more than 5 letters. */
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace)) /* converting the number 1 to the string */
            availableSpace = availableSpace + 1; /* adding 1 to the variable then counting to 30.  */
            availableSpaceEl.textContent = letter;
        } 
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter); // seeing if the word includes the letter
        
        if(!isCorrectLetter) { // if its not the correct letter.
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index); // grabbing the letter in the word at the index value
        const isCorrectPosition = letter === letterInThatPosition; // letter needs to be in the right position.

        if (isCorrectLetter) {
            return "rgb(83, 141, 78)";
        }
        return "rgb(181, 151, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) { /* if the current words lenth is not equal to 5.  */
            window.alert('Word must be 5 letters!'); /* displays an alert message. */
        }
        const currentWord = currentWordArr.join('');

        const firstLetterId = guessedWordCount * 5 + 1; /* x 5  cause its 5 letters + 1 to get the first letter id. */
        const interval = 200; 
        currentWordArr.forEach((letter, index) =>  { // method executes a provided function once for each array element.
            setTimeout( () => { //sets a timer which executes a function or specified piece of code once the timer expires.
                const tileColor = getTileColor(letter, index); // setting tileColor to a function that chooses the correct color.
                const letterId = firstLetterId + index; /* gets the letter id for each letter in the word. */
                const letterEl = document.getElementById(letterId); /* getting the element */
                letterEl.classList.add('animate__flipInX'); // adding the animations class to  the letterEl id
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`;
            }, interval * index) // extending the interval each time for each letter. doubling the time for each letter.
        });

        guessedWordCount++;

        if(currentWord === word) {
            window.alert('Congrats Gamer, YOU WIN!');
        }

        if (guessedWords.length === 6) { /* if the length of the guessed words is already 6. */
            window.alert(`Sorry, you have no more guesses! The word is ${word}`);
        }
        guessedWords.push([]); /* pushing a new array in */
    }

    function createSquares() { // creating a function.
        const gameBoard = document.getElementById("board");  // selecting the board, and storing to variable.
        
        for ( let i = 0; i < 30; i++ ) {
            let square  = document.createElement('div');   // creating div element.  
            square.classList.add('square'); // giving the divs the same class.
            square.classList.add('animate__animated'); // giving the squares the animation class.
            square.setAttribute('id', i + 1); // adding ids to each of the created divs / numbering them from 1 tp 30.
            gameBoard.appendChild(square); // adding square  as child to gameBoard to place on the DOM.
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute('data-key'); /* Selects the data key attribute and sets it equal to key */
           
            if ( letter === 'enter') { /* If it is the 'enter' button */
                handleSubmitWord();
                return;
            }

            updateGuessedWords(letter);
        }
    }

});