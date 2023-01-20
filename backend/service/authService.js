const bcrypt = require("bcrypt");
const User = require("../model/userSchema");

async function handleRegistration(username, password) {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();
  } catch (error) {
    console.log(
      "🚀 ~ file: authService.js:12 ~ handleRegistration ~ error",
      error
    );
  }
}

module.exports = { handleRegistration };
