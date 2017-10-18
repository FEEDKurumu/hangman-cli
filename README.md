# hangman-cli

wordpool.txt
strings separated by ,

letter.js
letterconstructor()
  construct letter object
  this.letter = letter
  this.shown = _
  function to change _ to letter if guessed

word.js
wordconstructor()
  construct word object
  calls letter() to populate

app.js
var current word
var current guess
var guessed left
reset();
  guessesleft = 10
  pick random word
  run wordconstructor() for an object
  store in current word var
  for in loop obj to create _ _ _ _ _
    put in current guess
checkwinloss()
  if current guess indexof _ === -1
    end game with win
  if guessesleft === 0
    end game with loss
prompt()
  checkwinloss()
  show current guess and guesses left
  inquirer.prompt input
    get letter
  .then
    guesses left -1
    if "" -> empty string
      prompt() again
    if "asdf" -> string.length > 1
      prompt() again
    if "a" -> string.length === 1
      for in loop obj
        if letter value = guess
          run guessed()

    prompt()