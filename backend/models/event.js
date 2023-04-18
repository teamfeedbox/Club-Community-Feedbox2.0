const mongoose = require("mongoose");
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
  scope:{type:String},
  speaker: {
    type: String,
  },
  attendanceSubmitted:{type:Boolean,default:false},
  eventDuration:{type:Number,default:0},
  postedBy: {
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
  }
});

module.exports = mongoose.model("events", eventSchema);
