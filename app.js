var wordConstructor = require("./word.js");
var fs = require("fs");

var currentWord;
var currentWordObj;
var currentGuess;
var guessesLeft;

function getRandomWord() {
  fs.readFile("./wordpool.txt", "utf8", function(err, data) {
    if (err) { console.log(err); }
    var arr = data.split(",");
    currentWord = arr[Math.floor(Math.random() * arr.length)];
  })
}

function reset() {
  guessesLeft = 10;
  getRandomWord();

  setTimeout(function() {
    console.log(currentWord), 200
  })
}

  // currentWord = new wordConstructor(tempW);
  // console.log(currentWord)
reset();