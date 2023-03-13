const mongoose = require("mongoose");

// const user = require("./user");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  // profile: {
  //   type:ObjectId,
  //   ref: 'user',
  // },

  // img: [{
  //   data: Buffer,
  //   contentType: String,
  // }],

  img: [{
    type: String,
  }],

  // postType: {
  //   type: String,
  //   enum: ['public', 'private'],
  //   // default: 'public',
  // },

  postType: {
    type: String,
  },

  collegeName: {
    type: String,
  },
  visible: {
    type: String,
  },
  date: {
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
      commentBy: {
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
        userId: {
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
