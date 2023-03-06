const mongoose = require("mongoose");

const user = require('./user')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

user:{
  type:ObjectId,
  ref:user
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

  img: {
 type:String
  },


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
  postedDate: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    // type: String,
    type:ObjectId,
    ref:user

  },
  likes:[],

  comment: [
    {
      userId: {
        // type: String,
        type:ObjectId,
        ref:"user"
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
          type:ObjectId,
          ref:"user"
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
