var letterConstructor = require("./letter.js");

function wordConstructor(word) {
  var arr = word.split("");
  for (var i = 0; i < arr.length; i++) {//for each letter in word
    var temp = new letterConstructor(arr[i]);
    this[i] = temp;//create a new letter object
  }
}

module.exports = wordConstructor;