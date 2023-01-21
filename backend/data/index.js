const iceCreamList = require("./icecreams");

function getRandomIceCream() {
  const randomNumber = Math.round(Math.random() * iceCreamList.length - 1);
  return iceCreamList[randomNumber];
}

module.exports = { getRandomIceCream };
