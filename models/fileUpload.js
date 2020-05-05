const mongoose = require("mongoose");

const fileUploadSchema = mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("fileUpload", fileUploadSchema);
