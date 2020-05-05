const express = require("express");
const mangoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const cookieParser = require("cookie-parser");

const app = express();
const bodyParser = require("body-parser");
const signInRoute = require("./routes/auth");
const fileRoute = require("./routes/file");
app.use(bodyParser.json());

//Middleware
app.use(cors());
app.use(cookieParser());
app.use("/users", signInRoute);
app.use("/file", fileRoute);

//Connetion to DB
mangoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(3002);
