function letterConstructor(letter) {
  this.letter = letter;
  if (this.letter === " ") {//if space, letter -> space
    this.shown = " ";
  } else {//else becomes _
    this.shown = "_";
  }
  this.guessed = function(a) {//when guessed correctly, _ becomes letter
    if (a === this.letter) {
      this.shown = this.letter;
    }
  }
}

module.exports = letterConstructor;