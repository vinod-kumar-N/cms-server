const express = require("express");
const mangoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();
const bodyParser = require("body-parser");
const signInRoute = require("./routes/auth");
app.use(bodyParser.json());

//Middleware
app.use(cors());
app.use("/users", signInRoute);

//Connetion to DB
mangoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(3002);
