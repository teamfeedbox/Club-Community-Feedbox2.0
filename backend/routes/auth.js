const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = require("../key");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const requireLogin = require("../middleware/requireLogin");
const { closeDelimiter } = require("ejs");

router.get("/get", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
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

          res.json({ token });
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


router.get('/user', requireLogin, async (req, res) => {
  // console.log(req.user)
  const email = req.user.email;
  // console.log(req.user.email)
  const user = await User.findOne({ email }).populate("email").select("-password");
  if (user) {
    res.send(user);
    // console.log(user)
  } else {
    res.status(404).send('User not found');
  }
});


router.get('/user/:id', requireLogin, async (req, res) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result)
  }
  else {
    res.send("not found")
  }
})



router.put('/updatePic/:id', requireLogin, async (req, res) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    { $set: { img: req.body.url } }
  )
  res.send(result)
})


router.put('/updateSkill/:id', requireLogin, async (req, res) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    { $push: { skills: req.body.skill } }
  )
  res.send(result)
})


// router.put('/updateDetail/:id', async(req,res)=>{
  
// //  console.log(req.body.email)
// //   console.log(req.body.bio)
//   let result = await User.updateMany(
//     {_id:req.params.id},

// update details of a user
router.put('/updateDetail/:id', async (req, res) => {
  // console.log(req.body,req.params.id);
  try {
    let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body}, { new: true })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete a user
router.delete('/user/:id', async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((error) => {
    res.status(500).send(error);
  })
})

// router.put('/updateSkills/:eventId', requireLogin, async (req, res) => {
//   let result = await Event.updateOne(
//     { _id: req.params.eventId },
//     {
//       $push: { skills: req.body }
//     }
//   )
//   res.send(result)
// })



router.get('/getAllUser',(req,res)=>{
  // var mySort = { date: -1 };
  User.find()
  // .sort(mySort)
  // .populate('postedBy').select("-password")
  .then(user=>{
      res.json(user)
  })
  .catch(err=>{
      console.log(err)
  })
})

module.exports = router;
