const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    message:{type:String},
    messageScope:{type:String},
    userId:{type:String},
    date: {type:String},
    time:{type:String},
    venue:{type:String},
});

module.exports = mongoose.model("Notification", notificationSchema);
