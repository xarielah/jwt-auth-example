const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Signs a JWT token.
 * @param {Object} payload payload data
 * @param {String} expiration optional expiresIn
 * @returns
 */
async function sign(payload, expiration) {
  const token = await jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiration,
  });
  return token;
}

/**
 * Verifies a token integrity by a secret key.
 * @param {string} token token
 * @returns true or false
 */
async function verify(token) {
  return await jwt.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
