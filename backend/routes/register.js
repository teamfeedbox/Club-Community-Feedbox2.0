const express = require("express") 
const user = require("../models/user");
const router = express.Router()

router.post('/register',async(req,res)=>{
    let data = new user(req.body);
    let result = await data.save(); // saving the users in the database when users signup
    result = result.toObject();// this is done not to show the password in res
    delete result.password;
    res.send(result);
    // console.log(result)
})




module.exports = router;

