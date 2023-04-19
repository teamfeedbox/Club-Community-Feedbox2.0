const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')
const multer = require('multer');
const requireLogin = require('../middleware/requireLogin')
const { google } = require("googleapis")
const { Readable } = require('stream');
const upload = multer({});

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
    parents: [process.env.RESOURCES_KEY],
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

// Upload pdf to google drive and then to mongodb
router.post("/upload", upload.single("file"), requireLogin, async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    } else {
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      console.log(response);
      const val = {
        title: req.body.title,
        url: `https://drive.google.com/file/d/${response.data.id}/view`,
        author: req.user,
        skill: req.body.skill,
        type: "pdf",
        driveId: response.data.id
      }
      const pdf = await new Resource(val)
      await pdf.save()
        .then(() => {
          res.status(200).json("PDF uploaded successfully!");
        })
    }
  } catch (err) {
    console.log(err);
  }
});

// Upload link to mongodb
router.post("/linkUpload", requireLogin, async (req, res) => {
  try {
    console.log(req.body);
    const val = {
      title: req.body.title,
      url: req.body.url,
      author: req.user,
      skill: req.body.skill,
      type: "link",
    }
    const pdf = await new Resource(val)
    await pdf.save()
      .then(() => {
        res.status(200).json("Link uploaded successfully!");
      })
  } catch (error) {
    res.status(500).json(error)
  }
})

//api to get all resource
//it will be used to display at the resources page
router.get('/getAllResource/:skill', requireLogin, (req, res) => {
  var mySort = { date: -1 };
  Resource.find({ skill: req.params.skill })
    .sort(mySort)
    .populate('author').select("-password")
    .then(posts => {
      // console.log(posts)
      res.json(posts)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/myResource', requireLogin, async (req, res) => {
  var mySort = { date: -1 };
  Resource.find({ author: req.user._id })
    .sort(mySort)
    .populate('author').select("-password")
    .then(event => {
      res.json(event)
    })
    .catch(err => {
      console.log(err)
    })
})


//update resource api
router.put('/updateResource/:id', async (req, res) => {
  let result = await Resource.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result)
})

//delete resource link from mongodb 
router.delete('/delete/Resource/link/:resId', async (req, res) => {
  try {
    const result = await Resource.deleteOne({ _id: req.params.resId });
    res.status(200).json("Link Deleted Successfully")
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete resource PDF from google drive and MongoDb
router.delete('/delete/Resource/pdf', async (req, res) => {
  try {
    const auth = authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    const file_id = req.body.driveId;

    drive.files
      .delete({
        fileId: file_id,
      })
      .then(
        async function (response) {
          const result = await Resource.deleteOne({ _id: req.body._id });
          res.status(200).json("Pdf Deleted Successfully...")
        },
        function (err) {
          return res.status(400).json('Deletion Failed for some reason');
        }
      );
  } catch (error) {
    res.status(500).json(error)
  }
})


router.get('/search/:key', async (req, res) => {
  let result = await Resource.find({
    "$or": [{ title: { $regex: req.params.key } }]
  })
  res.send(result);
})

module.exports = router