const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  return mongoose.connect(MONGODB_URI);
}

module.exports = { connectToDb };
