const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')
const multer = require('multer');
const cloudinary = require("../middleware/cloudinary");
const uploader = require("../middleware/multer");
const requireLogin = require('../middleware/requireLogin')





const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), async (req, res) => {
    const {title} = req.body
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      folder: 'pdfs'
    });
  
    const pdfUrl = result.secure_url;
    // console.log(pdfUrl)
    const pdf = await new Resource({
      title,
      // author:req.user,  
      name: req.file.originalname,
      url: pdfUrl
    });
    
    await pdf.save();
  });
  










router.post('/create-resource',async(req,res)=>{
    let resource = new Resource(req.body)
    let data = await resource.save();
    res.send(data);
    
})


//api to get all resource
//it will be used to display at the resources page
router.get('/getAllResource',(req,res)=>{
    Resource.find()
    .populate('author').select("-password")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})




//api to get all the resource created by user in their profile page
// router.get('/myResource/:id',(req,res)=>{
   
//     Resource.find({author:req.params.id})
  
//     .populate('author').select("-password")
//     .then(resource=>{
//         res.json({resource})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })



router.get('/myResource',requireLogin,async(req,res)=>{
   
  Resource.find({author:req.user._id})

  .populate('author').select("-password")

  .then(event=>{
      // console.log(event)
      res.json(event)
  })
  .catch(err=>{
      console.log(err)
  })


})


//update resource api
router.put('/updateResource/:id',async(req,res)=>{
    let result = await Resource.updateOne(
        {_id:req.params.id},
        
        {
            $set:req.body
            
        }
    )
    res.send(result)
  })

//delete resource
router.delete('/deleteResource/:eventId',async(req,res)=>{
    const result = await Resource.deleteOne({_id:req.params.eventId});
    res.send(result)
     
 })


 router.get('/search/:key', async (req,res)=>{
    let result = await Resource.find({
      "$or":[
        {title: {$regex:req.params.key}}
        
      ]
    })
    res.send(result);
    // console.log(result) 
  
  
  })

module.exports = router