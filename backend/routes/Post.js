const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const user = require('../models/user')
const mongoose = require('mongoose');


// api to create the post
router.post('/create-post',async(req,res)=>{
    let post = new Post(req.body)
    
    let data = await post.save();
    res.send(data);
})


// router.post('/create-post',(req,res)=>{
//     const {title,desc,collegeName,postedDate,postedBy,likes,comment,pic} = req.body

//     const post = new Post({
//         title,
//         desc,
//         postedDate,
//         postedBy ,
//         collegeName,
//         likes,
//         comment,
//         img:pic,

//     })
//     post.save().then(result=>{
//         res.json({post:result})
//     })
//     .catch(err=>{
//         console.log(err)
//     })

// })


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

//like api
router.put('/like',(req,res)=>{
    Post.findByIdAndUpdate(req.body.postedBy,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


// comment api

router.put('/comment',(req,res)=>{
    const comment = {
        commentBy:req.user._id,
        date:req.body.date,
        message:req.body.message,
    }
    Post.findByIdAndUpdate(req.body.postedBy,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.commentBy","_id name")
    .exec((err,result)=>{
        if(err)
        {
            return res.json({error:err})
        }
        else{
            res.json(result)
        }
    })
})




module.exports = router