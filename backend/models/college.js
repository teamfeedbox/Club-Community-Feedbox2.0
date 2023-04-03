const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{}
});

module.exports = mongoose.model("users", userSchema);
