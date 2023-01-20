const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();
const authService = require("../service/authService");

const schemaOptions = {
  username: {
    id: "body",
    isString: true,
  },
};

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
    .isString("asd")
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
      return res.status(500).json({
        statusCode: 500,
        message: "unknown error while processing your request",
      });
    }
  }
);

router.post("/login", (req, res) => {
  res.send("/login");
});

module.exports = router;
