// const express = require("express")
// const user = require("../models/user");
// const router = express.Router()
// const Jwt = require('jsonwebtoken')
// const jwtKey = require('../key')
// const requireLogin = require('../middleware/requireLogin')

// router.get('/protected',requireLogin,(req,res)=>{
//   res.send("hello")
// })
// router.post('/register',async(req,res)=>{
//     let data = new user(req.body);
//     let result = await data.save(); // saving the users in the database when users signup
//     result = result.toObject();// this is done not to show the password in res
//     delete result.password;
//     res.send(result);
//     // console.log(result)
// });

// router.post('/login',async(req,res)=>{

//     if (req.body.password && req.body.email) {
//         let data = await user.findOne(req.body).select("-password");
//         if (data) {

//           res.send(data);
//         } else {
//           res.send({ result: "no user found" });
//         }
//       } else {
//         res.send({ result: "no user found" });
//       }

//     //with jwt authentication
//   //   if (req.body.password && req.body.email) {
//   //   let data = await user.findOne(req.body).select("-password");
//   //   if (data) {

//   //     // this code is for jwt authentication
//   //    const token =  Jwt.sign({_id:data._id},jwtKey,(err,token)=>{
//   //       if(err){
//   //     res.send("Something went wrong");

//   //       }
//   //       res.send({token});
//   //       // res.send(data);
//   //     })

//   //   } else {
//   //     res.send({ result: "no user found" });
//   //   }
//   // } else {
//   //   res.send({ result: "no user found" });
//   // }

//   // console.log(data);
// })

// module.exports = router;

const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = require("../key");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const requireLogin = require("../middleware/requireLogin");
const { closeDelimiter } = require("ejs");

router.get("/get", requireLogin, (req, res) => {
  res.send("hello");
});

router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    collegeName,
    branch,
    skills,
    coins,
    role,
    position,
    collegeYear,
    bio,
    uniqueId,
    img,
    events
    
  } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          // password,
          name,
          collegeName,
          branch,
          skills,
          coins,
         role,
          position,
          uniqueId,
          collegeYear,
          bio,
          img,
          events,
      
        });

        user
          .save()
          .then((user) => {
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no-reply@insta.com",
            //     subject:"signup success",
            //     html:"<h1>welcome to instagram</h1>"
            // })
            // res.json({message:"saved successfully"})
            res.send(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the details" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ err: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, jwtKey);
          // const decodedToken = jwt.decode(token);

          res.json({ token});
        } else {
          return res.status(422).json({ error: "invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// router.get("/user/:email", (req, res) => {
//   const email = req.params.email;

//   User.findOne({ email: email })

//     .populate("email")
//     .select("-password")
//     .then((user) => {
//       res.json({ user });
//       // console.log(user)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


router.get('/user',requireLogin, async (req, res) => {
  // console.log(req.user)
  const email = req.user.email;
  // console.log(req.user.email)
  const user = await User.findOne({email}).populate("email") .select("-password");


  if (user) {
    res.send(user);
    // console.log(user)
  } else {
    res.status(404).send('User not found');
  }
});


router.get('/user/:id',requireLogin,async (req,res)=>{
  let result = await User.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }
  else{
    res.send("no product found")
  }
})



router.put('/updatePic/:id',requireLogin, async(req,res)=>{
  // console.log(req.params.email)
  // console.log(req.body.url)

  let result = await User.updateOne(
      {_id:req.params.id},
      { $set: { img: req.body.url} }
  )
  res.send(result)
})

router.put('/updateDetail/:id',requireLogin, async(req,res)=>{
  
//  console.log(req.body.email)
//   console.log(req.body.bio)
  let result = await User.updateMany(
    {_id:req.params.id},

      {
        //  $set: {email:req.body.email},
        //  $set: {bio:req.body.bio}
        $set: req.body
    
    }
  )
  res.send(result)
})

router.put('/updateSkills/:eventId',requireLogin, async(req,res)=>{
  let result = await Event.updateOne(
      {_id:req.params.eventId},
      {
         $push:{skills:req.body}
      }
  )
  res.send(result)
})

module.exports = router;
