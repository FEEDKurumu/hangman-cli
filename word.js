var letterConstructor = require("./letter.js");

function wordConstructor(word) {
  console.log(word)
  console.log(typeof word)
  var arr = word.split("");
  for (var i = 0; i < arr.length; i++) {
    var temp = new letterConstructor(arr[i]);
    this[i] = temp;
  }
}

module.exports = wordConstructor;