const mongoose = require("mongoose");

// const user = require("./user");

const postSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  img: [{
    type: String,
  }],
  scope: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }],
  comment: [
    {
      postedBy: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
      },
      reply: {
        postedBy: {
          // type: String,
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replyMsg: {
          type: String,
        },
      },
    },
  ],
});

module.exports = mongoose.model("posts", postSchema);
