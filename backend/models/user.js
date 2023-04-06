const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


  name: {
    type: String,
    //required: [true, "Full name is required"],
    //minlength: 5,
    //maxlength: 50,
  },
  email: {
    type: String,
    //required: true,
    // minlength: 5,
    //maxlength: 50,
    // unique: true,
  },
  password: {
    type: String,
    //required: true,
    //minlength: 5,
    // maxlength: 20,
  },
  collegeName: {
    type: String,
    //required: true,
  },
  role: {
    type: String, enum: ['user', 'Club_Member', 'Lead', 'Admin', 'Super_Admin'],default:"user"
  },
  position: {
    type: String,
  },
  collegeYear: {
    type: String,
    //required: true,
  },
  coins: {
    type: Number,
    default:0
  },
  img: {
    type: String,default:"Images/defaultImg.png"
  },
  branch: {
    type: String
  },
  bio: {
    type: String
  },
  uniqueId: {
    type: String
  },
  skills: [],
  events: [],
  notifications:[
    {
        type:{type:String},
        message:{type:String},
        date:{type:String},
        status:{type:String},
        id:{type:String}
    }
]


});

module.exports = mongoose.model("users", userSchema);
