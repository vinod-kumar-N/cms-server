const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

module.exports = mongoose.model("Post", PostSchema);
