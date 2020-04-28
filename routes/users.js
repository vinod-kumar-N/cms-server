const router = require("express").Router();
const Post = require("../models/Post");

//Get all the users
router.get("/", async (req, res) => {
  try {
    const getData = await Post.find();
  } catch (err) {
    res.json({ message: err });
  }
});

//Get Specific User
router.get("/:userName", async (req, res) => {
  try {
    const userData = await Post.find({ name: req.params.userName });
    console.log(userData);
  } catch (err) {
    console.log(err);
  }
});

//Delete User
router.delete("/:userName", async (req, res) => {
  try {
    const deleteData = await Post.deleteOne({ name: req.params.userName });
  } catch (err) {
    console.log(err);
  }
});

//Update User
router.patch("/:userName", async (req, res) => {
  try {
    const updatedData = await Post.updateOne(
      { name: req.params.userName },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
        },
      }
    );
    console.log(res.json(updatedData));
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });
  try {
    const postData = await post.save();
    res.json(postData);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
