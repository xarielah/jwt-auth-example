const iceCreamList = require("./icecreams");

function getIceCreamByDay() {
  //! This was refactored to be by day.
  const today = new Date().getDay();
  return iceCreamList[today];
}

module.exports = { getIceCreamByDay };
