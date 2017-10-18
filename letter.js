function letterConstructor(letter) {
  this.letter = letter;
  if (this.letter === " ") {
    this.shown = " ";
  } else {
    this.shown = "_";
  }
  this.guessed = function(a) {
    if (a === this.letter) {
      this.shown = this.letter;
    }
  }
}

module.exports = letterConstructor;