const router = require("express").Router();
const registerSchema = require("../models/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("./verifyToken");
//validation
const {
  validateRegistration,
  validateLogin,
} = require("../validation/validation");

router.get("/getUsers", verifyToken, async (req, res) => {
  try {
    const getData = await registerSchema.find();
    console.log(getData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).send(error.details[0]);
  }
  const emailExists = await registerSchema.findOne({ email: req.body.email });
  console.log(emailExists);
  if (emailExists)
    return res.status(400).send({ message: "email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(req.body.password, salt);
  const hashConfirmPwd = await bcrypt.hash(req.body.confirmpwd, salt);
  const userInfo = new registerSchema({
    name: req.body.name,
    userName: req.body.userName,
    password: hashPwd,
    confirmpwd: hashConfirmPwd,
    email: req.body.email,
    designation: req.body.designation,
  });
  try {
    const registerData = await userInfo.save();
    const token = jwt.sign({ _id: registerData._id }, process.env.TOKEN_SECRET);
    res
      .header("auth_token", token)
      .send({
        message: "Registration Success!",
        token,
        name: registerData.name,
      });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }
  const user = await registerSchema.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send({ message: "Email  invalid" });
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd) return res.status(400).send({ message: "pwd is invalid" });
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .header("auth_token", token)
    .send({ message: "Login Success!", token, name: user.name });
});

module.exports = router;
