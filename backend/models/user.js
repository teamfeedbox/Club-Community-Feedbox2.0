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
    type: String,
    //required: true,
  },
  position:{
    type:String,
  },
  collegeYear: {
    type: String,
    //required: true,
  },
  coins: {
    type: Number,
    // required:true,
  },
  profileImg: {
    data: Buffer,
    contentType: String,
  },
  branch:{
    type:String
  },
  bio:{
    type:String
  },
  skills: [],
  events: [],


 });

module.exports = mongoose.model("users", userSchema);
