const express = require("express");
const College = require("../models/college");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/college/add",async (req, res) => {
    try {
        const clg = await College.find({name:req.body.name});
        console.log(clg)
        if(clg.length>0){
            res.status(500).json("College Already Exists...");
        }else{
            const data = await College.create(req.body);
            res.status(200).json("College Added Successfully!");
        }
    } catch (error) {
        res.status(500).json(error)
    }
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


module.exports = router;
