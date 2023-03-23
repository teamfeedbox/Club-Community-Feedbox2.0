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
          collegeYear,
          // pic
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
          const decodedToken = jwt.decode(token);

          res.json({ token, decodedToken });
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
  const id = req.user._id;
  const user = await User.findOne({ id }).populate("_id") .select("-password");

  if (user) {
    res.send(user);
    // console.log(user)
  } else {
    res.status(404).send('User not found');
  }
});





module.exports = router;
