const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/community');
// mongodb+srv://feedbox:<password>@cluster0.f8qrcl7.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://feedbox:feedbox@1908@cluster0.f8qrcl7.mongodb.net/community?retryWrites=true&w=majority')
.then(()=>{
    console.log("connection successfull")
}).catch((err)=>console.log(err))