const router = require("express").Router();
const fileUploadSchema = require("../models/fileUpload");
const verifyToken = require("./verifyToken");

router.post("/uploadImage", verifyToken, async (req, res) => {
  const fileUpload = new fileUploadSchema({
    file: req.body.file,
  });
  try {
    const fileDetails = await fileUpload.save();
    res.send({ message: "File upload Success!", imapgePath: fileDetails.file });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
