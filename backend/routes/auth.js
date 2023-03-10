const express = require("express")
const user = require("../models/user");  
const router = express.Router()
const Jwt = require('jsonwebtoken')
const jwtKey = require('../key')


router.post('/register',async(req,res)=>{
    let data = new user(req.body);
    let result = await data.save(); // saving the users in the database when users signup
    result = result.toObject();// this is done not to show the password in res
    delete result.password;
    res.send(result);
    // console.log(result)
})


router.post('/login',async(req,res)=>{
    
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



    //with jwt authentication
  //   if (req.body.password && req.body.email) {
  //   let data = await user.findOne(req.body).select("-password");
  //   if (data) {

  //     // this code is for jwt authentication
  //     Jwt.sign({data},jwtKey,(err,token)=>{
  //       if(err){
  //     res.send("Something went wrong");

  //       }
  //       res.send({data,auth:token});
  //       // res.send(data);
  //     })
      
  //   } else {
  //     res.send({ result: "no user found" });
  //   }
  // } else {
  //   res.send({ result: "no user found" });
  // }

  // console.log(data);
})



module.exports = router;
