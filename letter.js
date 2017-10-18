function letterConstructor(letter) {
  this.letter = letter;
  this.shown = "_";
  this.guessed = function() {
    this.shown = this.letter;
  }
}

module.exports = letterConstructor;