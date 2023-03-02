const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },

  eventDate: {
    type: Date,
    default: Date.now,
  },

  venue: {
    type: String,
  },
  speaker: {
    type: String,
  },
  postedBy: {
    type: String,
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
