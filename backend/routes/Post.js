const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const user = require('../models/user')
const mongoose = require('mongoose');


// api to create the post
router.post('/create-post',(req,res)=>{

    const {title,desc,postType,collegeName,postedDate,postedBy,pic} = req.body
    if( !desc){
        return res.status(422).json({error:"please fill all the fields"})
    }

    const post = new Post({
        title,
        desc,
        postType,
        collegeName,
        postedDate,
        postedBy,
        img:pic
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


//api to get all posts
//it will be used to display at the homepage feed
router.get('/getAllPost',(req,res)=>{
    Post.find()
    .populate('postedBy').select("-password")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})




//api to get all the post created by user in their profile page
router.get('/myPost/:id',(req,res)=>{
   
    Post.find({postedBy:req.params.id})
  
    .populate('postedBy').select("-password")
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})


//update post api
  router.put('/updatePost/:postId',async(req,res)=>{
    let result = await Post.updateOne(
        {_id:req.params.postId},
        {
            $set:req.body
        }
    )
    res.send(result)
  })



//delete post
router.delete('/deletePost/:postId',async(req,res)=>{
   const result = await Post.deleteOne({_id:req.params.postId});
   res.send(result)
    
})




module.exports = router