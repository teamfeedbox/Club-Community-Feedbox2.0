const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
// const user = require('./user')
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  name:{
    type:String
  },
  url: {
    type: String,
  },
  link: {
    type: String,
  },
  author: {
    type:ObjectId,
    ref:"users"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  skill:{
    type: String,
  },
  driveId:{
    type: String
  }
});

module.exports = mongoose.model("resources", resourceSchema);
