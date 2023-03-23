const mongoose = require("mongoose");
// const user = require('./user')
const {ObjectId} = mongoose.Schema.Types

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },

  eventDate: {
    type: String,
    
  },
  eventTime:{
    type:String
  },

  venue: {
    type: String,
  },
  speaker: {
    type: String,
  },
  postedBy: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",

  },
  date: {
    type: Date,
    default: Date.now,
  },

  attendance: [],

  collegeName: {
    type: String,
  },
});

module.exports = mongoose.model("events", eventSchema);
