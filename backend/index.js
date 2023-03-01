const express = require('express');
require('./db/config')
const user = require("./db/user");
const Post = require('./db/post')
const port = 8000;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("hello")
})


// signup api
app.post("/register", async (req, res) => {
    let data = new user(req.body);
    let result = await data.save(); // saving the users in the database when users signup
    result = result.toObject();// this is done not to show the password in res
    delete result.password;
    res.send(result);
    // console.log(result)
  });



  //login api
app.post("/login", async (req, res) => {


    if (req.body.password && req.body.email) {
      let data = await user.findOne(req.body).select("-password");
      if (data) {
        
        res.send(data);
      } else {
        res.send({ result: "no user found" });
      }
    } else {
      res.send({ result: "no user found" });
    }
})


// home page api

// add post
app.post('/add-post',async(req,res)=>{
    let post = new Post(req.body);
    let data = await post.save();
    res.send(data);
})

  
  

app.listen(port,console.log(`server is listening on the port: ${port}`));


