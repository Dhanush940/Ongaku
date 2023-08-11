const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://ongaaku.netlify.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" })); //Had to mention coz it says payload too heavy when file uploading
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const user = require("./controller/user");
const song = require("./controller/song");

app.use("/api/v2/user", user);
app.use("/api/v2/song", song);
app.use(ErrorHandler);
module.exports = app;
