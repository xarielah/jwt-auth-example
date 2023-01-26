const express = require("express");
const router = express.Router();
const dataUtil = require("../data");

/**
 * Protected route, the middleware
 * is set on server.js file, on that router.
 */

router.get("/icecream", (req, res) => {
  return res.status(200).json(dataUtil.getIceCreamByDay());
});

module.exports = router;
