const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const jwtService = require("./jwtService");

async function handleRegistration(username, password) {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    displayName: username,
    username: username.toLowerCase(),
    password: hashPassword,
  });
  await newUser.save();
}

async function handleLogin(username, password) {
  const foundUser = await User.findOne({ username: username.toLowerCase() });
  if (!foundUser) throw new Error();

  const arePasswordsOk = await bcrypt.compare(password, foundUser.password);
  if (!arePasswordsOk) throw new Error();

  const accessToken = await jwtService.sign(
    { username: foundUser.displayName },
    "30s"
  );
  const refreshToken = await jwtService.sign(
    { username: foundUser.displayName },
    "365d"
  );
  return { accessToken, refreshToken, username: foundUser.username };
}

module.exports = { handleRegistration, handleLogin };
