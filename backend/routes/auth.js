const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = require("../key");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const requireLogin = require("../middleware/requireLogin");
const { closeDelimiter } = require("ejs");
const nodemailer = require('nodemailer');
const { google } = require("googleapis")
const { Readable } = require('stream');
const multer = require('multer');
const { log } = require("console");
const upload = multer({ limits: { fileSize: 5000000 } });

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/club-community-key.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: [process.env.USER_PROFILE_PIC],
  };

  const stream = new Readable();
  stream.push(file.buffer)
  stream.push(null)

  const media = {
    mimeType: file.mimetype,
    body: stream,
  };

  const driveService = google.drive({ version: "v3", auth });
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

router.get("/get", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Register a user
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
    return res.status(422).json({ data: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ data: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
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
            res.send({ data: "Registered successfully! Wait until you receive mail to login." });
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

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the details" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ err: "invalid email or password" });
    } else if (savedUser.role == 'user') {
      return res.status(500).json({ err: "You are not a part of club right now." });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, jwtKey, { expiresIn: '2d' });
          res.json({ token, id: savedUser._id, role: savedUser.role, college: savedUser.collegeName });
        } else {
          return res.status(422).json({ error: "invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


router.post("/login/superAdmin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the details" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ err: "invalid email or password" });
    } else if (savedUser.role == 'Super_Admin') {
      return res.status(500).json();
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

router.get('/user', requireLogin, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email }).populate("email").select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("This user doesn't exists...")
    }
  } catch (error) {
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

// Update picture
router.put('/update/details/pic/:id', upload.single('image'), async (req, res) => {

  try {
    if (req.file) {
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      console.log(response);
      if(response){
        const data = {};
        if (req.body.name) data['name'] = req.body.name;
        if (req.body.collegeYear) data['collegeYear'] = req.body.collegeYear;
        if (req.body.bio) data['bio'] = req.body.bio;
        data['img'] = `https://drive.google.com/uc?id=${response.data.id}`
        data['imgId'] = response.data.id

        let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
        res.status(200).json(result)
      }
    } else {
      let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
      res.status(200).json(result)
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete image form google drive on image update
router.delete('/delete/image/user/:imgId', async (req, res) => {
  console.log("delete");
  try {
    const auth = authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    const file_id = req.params.imgId;

    drive.files
      .delete({
        fileId: file_id,
      })
      .then(
        async function (response) {
          res.status(200).json("Image Deleted Successfully...")
        },
        function (err) {
          return res.status(400).json('Deletion Failed for some reason');
        }
      );
  } catch (error) {
    res.status(500).json(error)
  }
})


// Update Skills
router.put('/updateSkill/:id', requireLogin, async (req, res) => {
  // console.log(req.body,req.params.id);

  let result = await User.updateOne(
    { _id: req.params.id },
    { $push: { skills: req.body.skills } }
  )
  res.send(result)
  // console.log(result)
})

// update details of a user
router.put('/updateDetail/:id', async (req, res) => {
  // console.log(req.body,req.params.id);
  try {
    let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
})

// send mail
router.post('/sendmail/:id', async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id })
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: 'anushkashah02.feedbox@gmail.com',
        pass: 'dvtjbrrqhgjypuya' // this requires apps password not original password
      }
    });

    let info = await transporter.sendMail({
      from: '<anushkashah02.feedbox@gmail.com>', // sender address
      to: `${result.email}`, // list of receivers
      subject: `Your Account has been Verified`, // Subject line
      text: `Hello ${result.name}`, // plain text body
      html: `<div>Dear ${result.name},
      <br/><br/>
      We are pleased to inform you that your account has been successfully verified. You can now login to your account and start using all the features and services that our platform has to offer.<br/>
      To access your account, please visit our website at [website URL] and click on the login button. If you have any questions or concerns, please do not hesitate to contact us. Our support team is available 24/7 to assist you with any issues you may have.
      <br/><br/>
      Best regards,
      <br/><br/>
      Team Feedbox</div>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    res.status(200).json(info);
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

router.get('/getAllUser', (req, res) => {
  // var mySort = { date: -1 };
  User.find()
    // .sort(mySort)
    // .populate('postedBy').select("-password")
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
    })
})

// Update Coins and events
router.put('/update/coins/events/', async (req, res) => {
  try {
    req.body.attendees.map(async (data) => {
      const response = await User.updateOne(
        { _id: data.id },
        {
          $set: { coins: data.coins },
          $push: { events: req.body.currentEvent },
        }
      );
    });
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error);
  }
});


// ******* Notification *********//
// Add notification to a specific user

// Update Interested events
router.put('/update/interested/events/:userId', async (req, res) => {
  console.log(req.body);
  try {
    const response = await User.updateOne({ _id: req.params.userId }, {
      $push: { interestedEvents: req.body.event }
    }, { new: true })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;