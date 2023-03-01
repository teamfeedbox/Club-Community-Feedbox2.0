const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:String,
    // name:String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    video:
    {
        data: Buffer,
        contentType: String
    },
    document:{
        data: Buffer,
        contentType: String
    },
    postType:String,   //public or private

})

module.exports = mongoose.model('posts',postSchema);