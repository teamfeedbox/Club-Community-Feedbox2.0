const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: [true, "Full name is required"],
    //minlength: 5,
    //maxlength: 50,
  },
  lastModified:{type:Date,default:Date.now()},
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
    type: String, enum: ['user', 'Club_Member', 'Lead', 'Admin', 'Super_Admin'], default: "user"
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
    default: 0
  },
  img: {
    type: String, default: 'https://drive.google.com/uc?id=1ofwRPVbT3e4-Ry7mniGi5Cmg0br_-v6j'
  },
  imgId:{type:String,default:'1ofwRPVbT3e4-Ry7mniGi5Cmg0br_-v6j'},
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
  interestedEvents:[],
  notifications: [
    {
      type: { type: String },
      message: { type: String },
      date: { type: String },
      status: { type: String },
      id: { type: String }
    }
  ]
});

module.exports = mongoose.model("users", userSchema);
