var wordConstructor = require("./word.js");
var inquirer = require("inquirer");
var fs = require("fs");

var currentWord;
var currentWordObj;
var currentWordBlanks;

var guessesLeft;
var allLetters;
var guessedLetters;

function getRandomWord() {//picks a random word from wordpool.txt
  fs.readFile("./wordpool.txt", "utf8", function(err, data) {
    if (err) { console.log(err); }
    var arr = data.split(",");
    currentWord = arr[Math.floor(Math.random() * arr.length)];//picks random word and puts that word into currentWord var
  })
}

function updateBlanks() {
  currentWordBlanks = [];//reset array that gets logged to console
  for (key in currentWordObj) {
    var shown = currentWordObj[key].shown
    currentWordBlanks.push(shown + " ");//add blanks or letters to array
  }
}

function reset() {//starts a new game
  guessesLeft = 10;//reset guesses
  allLetters = "qwertyuiopasdfghjklzxcvbnm".split("");//reset available guesses array
  guessedLetters = [];//reset guessed already to none
  getRandomWord();

  setTimeout(function() { 
    currentWordObj = new wordConstructor(currentWord);//constructs object for current word
    updateBlanks();
    prompt();//starts prompting for guesses
  }, 30);
}

function newGuess() {
  console.log("Guessed already: " + guessedLetters.join(" "));
  updateBlanks();
  prompt();
}

function newGamePrompt() {
  inquirer.prompt([
    {
      type: "list",
      choices: ["yes", "no"],
      message: "Play again?",
      name: "playagain"
    }
  ]).then(function(resp) {
    if (resp.playagain === "yes") {
      reset();
    } else {
      console.log("Bye!");
      process.exit();
    }
  })
}

function prompt() {
  console.log(currentWordBlanks.join(" "));//shows blanks on console _ _ _ _ _ _ _ _
  inquirer.prompt([
    {
      message: "Guess a letter!",
      name: "guess"
    }
  ]).then(function(resp) {
    var guess = resp.guess;
    if (guess.length === 0) {//check if empty string guess
      console.log("~~~~~~~~~~~~~~~");
      console.log(guessesLeft + " guesses left!");
      newGuess();
    } else if (guess.length > 1) {//check if multiple letter guess
      console.log("~~~~~~~~~~~~~~~");
      console.log(guessesLeft + " guesses left!");
      newGuess();
    } else {
      if (allLetters.indexOf(guess) >= 0 && currentWord.indexOf(guess) >= 0) {//check if one letter guess and in available guesses array
        for (key in currentWordObj) {
          if (guess === currentWordObj[key].letter) {
            currentWordObj[key].guessed(guess);
          }
        }
        updateBlanks();
        if (currentWordBlanks.indexOf("_ ") < 0) {//check win con
          console.log("You win!");
          console.log("The word was " + currentWord + "!");
          newGamePrompt();//ask new game
        } else {
          allLetters.splice(allLetters.indexOf(guess), 1);//remove from available guesses array
          console.log("~~~~~~~~~~~~~~~");
          console.log("Correct! " + guessesLeft + " guesses left!");
          newGuess();//prompt a guess
        }
      } else if (allLetters.indexOf(guess) >= 0) {//check if in available guesses array
        guessesLeft--;
        if (guessesLeft === 0) {//check lose con
          console.log("~~~~~~~~~~~~~~~");
          console.log("No guesses left! You lose :(");
          console.log("The word was " + currentWord + "!");
          newGamePrompt();//ask new game
        } else {
          allLetters.splice(allLetters.indexOf(guess), 1);//remove from available guesses array
          guessedLetters.push(guess);//add to array of letters already guessed
          console.log("~~~~~~~~~~~~~~~");
          console.log("Incorrect! " + guessesLeft + " guesses left!");
          newGuess();//prompt a guess
        }
      } else {//this means letter was already guessed
        console.log(guessesLeft + " guesses left!");
        newGuess();//prompt a guess
      }

    }
  })
}

reset();