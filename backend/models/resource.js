const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  pdf: {
    data: Buffer,
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  skills: [],
});

module.exports = mongoose.model("resources", resourceSchema);
