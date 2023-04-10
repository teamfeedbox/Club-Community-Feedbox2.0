const express = require("express");
// require("./db/config");
const mongoose = require('mongoose');


const Post = require("./models/post");
const port = 8000;
const app = express();
const cors = require("cors");
const user = require("./models/user");  


mongoose.set("strictQuery", false);

const db = "mongodb+srv://feedbox:feedbox@cluster0.f8qrcl7.mongodb.net/community?retryWrites=true&w=majority";
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connection successful 😎😎")
}).catch((err)=>console.log(err))




const post = require("./routes/Post");
const auth = require('./routes/auth')
const event = require('./routes/Event')
const resource = require('./routes/Resource')
const college = require('./routes/College')
const bodyParser = require('body-parser')



app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(express.json({ limit: '10mb' }));
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
app.use("/", college);

app.listen(port, console.log(`server is listening on the port: ${port}`));

