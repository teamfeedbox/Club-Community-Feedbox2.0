const mongoose = require('mongoose')
// const router = express.Router();
const Jwt = require('jsonwebtoken')
const jwtKey = require('../key')
const user = require('../models/user')


module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
   const token = authorization.replace("Bearer ","")
   Jwt.verify(token,jwtKey,(err,payload)=>{
    if(err){
        return res.status(401).json({error:"you must be logged in"})
    }

    const{_id} = payload
    user.findById(_id).then(userData=>{
        req.user = userData
    next()

    })

   })
}

