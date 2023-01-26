const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();
const authService = require("../service/authService");
const jwt = require("../service/jwtService");
require('dotenv').config()

router.post(
  "/signup",
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4, max: 16 })
    .withMessage("Min 4 chars, max 16 chars"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isStrongPassword({
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password too weak, Minimum of 4 length, 1 uppercase, 1 lowercase, 1 symbol"
    ),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(400).json({
        statusCode: 400,
        message: "Some inputs need your fix.",
        errors: errors,
      });

    // Register user.
    try {
      await authService.handleRegistration(
        req.body.username,
        req.body.password
      );
      return res
        .status(201)
        .json({ statusCode: 201, message: "user created!" });
    } catch (error) {
      if (error.code === 11000)
        return res.status(409).json({
          statusCode: 409,
          message: "Username already exists in the system...",
        });

      return res.status(500).json({
        statusCode: 500,
        message: "unknown error while processing your request",
      });
    }
  }
);

router.post(
  "/login",
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty"),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(400).json({
        statusCode: 400,
        message: "Some inputs need your fix.",
        errors: errors,
      });

    try {
      const { accessToken, refreshToken, username } =
        await authService.handleLogin(req.body.username, req.body.password);

      res.cookie("refresh", refreshToken, {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      return res.status(200).json({ accessToken, username: username });
    } catch (error) {
      return res.status(401).json({
        statusCode: 401,
        message: "Username or password are wrong...",
      });
    }
  }
);

router.get("/refresh", async (req, res) => {
  const currentRefreshToken = req.cookies.refresh;

  if (!currentRefreshToken)
    return res
      .status(403)
      .json({ statusCode: 403, message: "You're forbidden from doing that." });

  try {
    const isRefreshTokenValid = await jwt.verify(currentRefreshToken);
    const payload = {
      username: isRefreshTokenValid.username,
    };
    const newAccessToken = await jwt.sign(payload, "30s");

    /**
     * This sets a session cookie that will expire when user closes session.
     * Next time the user needs to be authenticated they will get new token by /refresh GET request.
     */
    res.cookie("token", newAccessToken);
    return res.status(201).json({
      statusCode: 201,
      message: "Access token created!",
      accessToken: newAccessToken,
      sameSite: 'None',
      secure: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ statusCode: 403, message: "You're forbidden from doing that." });
  }
});

router.post("/logout", (_, res) => {
  res.cookie("refresh", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res
    .status(204)
    .json({ statusCode: "204", message: "Logged out successfully" });
});

module.exports = router;
