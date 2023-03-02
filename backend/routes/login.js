const express = require("express")
const user = require("../models/user");  
const router = express.Router()



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
})


module.exports = router;

