const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')
const multer = require('multer');
const cloudinary = require("../middleware/cloudinary");
const uploader = require("../middleware/multer");
const requireLogin = require('../middleware/requireLogin')
const { google } = require("googleapis")
const fs = require("fs");
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
    parents: ["1iystXLT8-ZL8pBbFj6n4Wlm96Bx_B723"],
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

router.post("/upload", upload.single("file"), requireLogin, async (req, res, next) => {
  console.log("jiiijijiji");
  console.log(req.body.title, "ffff");
  console.log(req.file);
  try {
    if (!req.file) {
      console.log("1");
      res.status(400).send("No file uploaded.");
      return;
    } else {
      console.log("2");
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      console.log(response);
      const val = {
        title: req.body.title,
        driveId: `https://drive.google.com/file/d/${response.data.id}/view`,
        author: req.user,
        skill: req.body.skill
      }
      const pdf = await new Resource(val)
      await pdf.save()
        .then(() => {
          res.status(200).json({ data: "PDF uploaded successfully!" });
        })
    }
  } catch (err) {
    console.log(err);
  }
});

// router.post('/upload', upload.single('file'), requireLogin, async (req, res) => {
//   const { title, skill, pdfLink } = req.body
//   // console.log(pdfLink)

//   if (pdfLink === 'undefined') {
//     //  alert("Add files");
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: 'raw',
//       folder: 'pdfs',
//       // allowed_formats: ['pdf','doc','docx'],

//     });

//     const pdfUrl = result.secure_url;
//     console.log(pdfUrl);
//     // console.log(req.user)
//     const pdf = await new Resource({
//       title,
//       skill,
//       author: req.user,
//       name: req.file.originalname,
//       url: pdfUrl,

//       // link:pdfLink
//     });
//     // console.log(pdf);

//     await pdf.save()
//       .then(() => {
//         res.send({ data: "PDF uploaded successfully!" });
//       })

//   }

//   else {
//     const pdfSave = await new Resource({
//       title,
//       skill,
//       author: req.user,
//       // name: req.file.originalname,
//       // url: pdfUrl,
//       link: pdfLink
//     });
//     // console.log(pdfSave);

//     await pdfSave.save()
//       .then(() => {
//         res.send({ data: "PDF uploaded successfully!" });
//       })

//   }



//     // const result = await cloudinary.uploader.upload(req.file.path, {
//     //   resource_type: 'raw',
//     //   folder: 'pdfs'
//     // });

//     // const pdfUrl = result.secure_url;
//     // // console.log(pdfUrl)
//     // // console.log(req.user)
//     // const pdf = await new Resource({
//     //   title,
//     //   skill,
//     //   author:req.user,  
//     //   name: req.file.originalname,
//     //   url: pdfUrl,
//     //   link:pdfLink
//     // });
//     // // console.log(pdf);

//     // await pdf.save();
// });

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
      // console.log(event)
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

//delete resource
router.delete('/deleteResource/:eventId', async (req, res) => {
  const result = await Resource.deleteOne({ _id: req.params.eventId });
  res.send(result)

})


router.get('/search/:key', async (req, res) => {
  let result = await Resource.find({
    "$or": [
      { title: { $regex: req.params.key } }

    ]
  })
  res.send(result);
  // console.log(result) 


})

module.exports = router