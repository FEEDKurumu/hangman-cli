var wordConstructor = require("./word.js");
var inquirer = require("inquirer");
var fs = require("fs");

var currentWord;
var currentWordObj;
var currentWordBlanks;

var guessesLeft;
var allLetters;
var guessedLetters;

function getRandomWord() {
  fs.readFile("./wordpool.txt", "utf8", function(err, data) {
    if (err) { console.log(err); }
    var arr = data.split(",");
    currentWord = arr[Math.floor(Math.random() * arr.length)];
  })
}

function updateBlanks() {
  currentWordBlanks = [];
  for (key in currentWordObj) {
    var shown = currentWordObj[key].shown
    currentWordBlanks.push(shown + " ");
  }
}

function reset() {
  guessesLeft = 10;
  allLetters = "qwertyuiopasdfghjklzxcvbnm".split("");
  guessedLetters = [];
  getRandomWord();

  setTimeout(function() { 
    currentWordObj = new wordConstructor(currentWord);
    updateBlanks();
    prompt();
  }, 50);
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
  console.log(currentWordBlanks.join(" "));
  inquirer.prompt([
    {
      message: "Guess a letter!",
      name: "guess"
    }
  ]).then(function(resp) {
    var guess = resp.guess;
    if (guess.length === 0) {
      console.log("~~~~~~~~~~~~~~~");
      console.log(guessesLeft + " guesses left!");
      newGuess();
    } else if (guess.length > 1) {
      console.log("~~~~~~~~~~~~~~~");
      console.log(guessesLeft + " guesses left!");
      newGuess();
    } else {
      if (allLetters.indexOf(guess) >= 0 && currentWord.indexOf(guess) >= 0) {
        for (key in currentWordObj) {
          if (guess === currentWordObj[key].letter) {
            currentWordObj[key].guessed(guess);
          }
        }
        updateBlanks();
        if (currentWordBlanks.indexOf("_ ") < 0) {
          console.log("You win!");
          newGamePrompt();
        } else {
          allLetters.splice(allLetters.indexOf(guess), 1);
          console.log("~~~~~~~~~~~~~~~");
          console.log("Correct! " + guessesLeft + " guesses left!");
          newGuess();
        }
      } else if (allLetters.indexOf(guess) >= 0) {
        guessesLeft--;
        if (guessesLeft === 0) {
          console.log("~~~~~~~~~~~~~~~");
          console.log("No guesses left! You lose :(");
          console.log("The word was " + currentWord + "!");
          newGamePrompt();
        } else {
          allLetters.splice(allLetters.indexOf(guess), 1);
          guessedLetters.push(guess);
          console.log("~~~~~~~~~~~~~~~");
          console.log("Incorrect! " + guessesLeft + " guesses left!");
          newGuess();
        }
      } else {
        console.log(guessesLeft + " guesses left!");
        newGuess();
      }

    }
  })
}

reset();