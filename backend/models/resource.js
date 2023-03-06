const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const user = require('./user')
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
    type:ObjectId,
    ref:"user"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  skills: [],
});

module.exports = mongoose.model("resources", resourceSchema);
