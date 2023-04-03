const mongoose = require("mongoose");

const clgSchema = new mongoose.Schema({
    name:{type:String},
    count:{type:String,default:0}
});

module.exports = mongoose.model("College", clgSchema);
