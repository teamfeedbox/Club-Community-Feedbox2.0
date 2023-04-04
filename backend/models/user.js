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
<<<<<<< HEAD
    type: String, enum: ['user', 'Club_Member', 'Lead', 'Admin', 'Super_Admin'], default:'user'
    //required: true,
=======
    type: String, enum: ['user', 'Club_Member', 'Lead', 'Admin', 'Super_Admin'],default:"user"
>>>>>>> 56ea03a7b8a356450686a55b4167c1743760eec1
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
    // required:true,
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


});

module.exports = mongoose.model("users", userSchema);
