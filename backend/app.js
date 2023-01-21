const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const dbService = require("./service/dbService");

const PORT = process.env.PORT || 5000;

const authController = require("./controllers/authController");
const icecreamController = require("./controllers/icecreamController");
const authenticationToken = require("./middleware/authenticationToken");
const cookieParser = require("cookie-parser");

// Use express JSON middleware
app.use(bodyParser.json());

// Use express URL-ENCODED middleware
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(
  cors({
    origin: process.env.FRONT_URL ?? "http://localhost:5173",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Controller
app.use("/auth", authController);

app.use("/", authenticationToken, icecreamController);

app.get("*", (_, res) => res.send("@xarielah - GitHub.com"));

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
