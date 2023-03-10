const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')


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
router.get('/myResource/:id',(req,res)=>{
   
    Resource.find({author:req.params.id})
  
    .populate('author').select("-password")
    .then(resource=>{
        res.json({resource})
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
    const result = await Resource.ddeleteOne({_id:req.params.eventId});
    res.send(result)
     
 })

module.exports = router