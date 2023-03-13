const express = require("express");
// require("./db/config");
const mongoose = require('mongoose');


const Post = require("./models/post");
const port = 8000;
const app = express();
const cors = require("cors");
const user = require("./models/user");  

const db = "mongodb+srv://feedbox:feedbox@cluster0.f8qrcl7.mongodb.net/community?retryWrites=true&w=majority";
mongoose.connect(db)
.then(()=>{
    console.log("connection successfull")
}).catch((err)=>console.log(err))




const post = require("./routes/Post");
const auth = require('./routes/auth')
const event = require('./routes/Event')
const resource = require('./routes/Resource')
const bodyParser = require('body-parser')





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("hello");
});


//routes
// app.use("/", register);
// app.use("/", login);
app.use("/", auth);
app.use("/", post);
app.use("/", event);
app.use("/", resource);



app.listen(port, console.log(`server is listening on the port: ${port}`));

// mongodb+srv://feedbox:<password>@cluster0.f8qrcl7.mongodb.net/?retryWrites=true&w=majority