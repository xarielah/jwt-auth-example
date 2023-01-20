const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const dbService = require("./service/dbService");

const PORT = process.env.PORT || 5000;

const authController = require("./controllers/authController");

// Use express JSON middleware
app.use(bodyParser.json());

// Use express URL-ENCODED middleware
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

// Controller
app.use("/auth", authController);

app.use("*", (_, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Resource Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`[${PORT}] App is running...`);
  dbService.connectToDb().then(() => {
    console.log("MongoDB server is connected...");
  });
});
