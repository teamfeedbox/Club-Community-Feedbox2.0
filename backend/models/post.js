const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // userId:String,
  // // name:String,
  // desc: String,
  // img:
  // {
  //     data: Buffer,
  //     contentType: String
  // },
  // video:
  // {
  //     data: Buffer,
  //     contentType: String
  // },
  // document:{
  //     data: Buffer,
  //     contentType: String
  // },
  // postType:String,   //public or private

  title: {
    type: String,
  },
  desc: {
    type: String,

  },

  img: [{
    data: Buffer,
    contentType: String,
  }],
  postType: {
    type: String,
  },

  collegeName: {
    type: String,
  },
  visible: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: String,
  },
  likes:[],

  comment: [
    {
      userId: {
        type: String,
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
          type: String,
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
