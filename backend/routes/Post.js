const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const user = require('../models/user')
const mongoose = require('mongoose');
const multer = require('multer')
const requireLogin = require('../middleware/requireLogin');
const { closeDelimiter } = require('ejs');

router.post("/upload/images/get/link", async (req, res) => {
    try {
        // console.log(req.body)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/create-post', requireLogin, (req, res) => {
    const { desc, collegeName, img, scope } = req.body
    // console.log(scope);
    const post = new Post({
        desc,
        postedBy: req.user,
        collegeName,
        img: img,
        scope
    })
    post.save().then(result => {
        res.json({ post: result })
    }).catch(err => {
        console.log(err)
    })
})


//api to get all posts
//it will be used to display at the homepage feed
router.get('/getAllPost', requireLogin, (req, res) => {
    var mySort = { date: -1 };
    Post.find()
        .sort(mySort)
        .populate('postedBy').select("-password")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
        })
})




//api to get all the post created by user in their profile page
router.get('/myPost/:id', requireLogin, (req, res) => {
    //    let postedBy=req.user
    Post.find({ _id: req.params.id })

        .populate('postedBy').select("-password")
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            console.log(err)
        })
})



router.get('/myPost', requireLogin, async (req, res) => {
    var mySort = { date: -1 };

    Post.find({ postedBy: req.user._id })
        .sort(mySort)

        .populate('postedBy').select("-password")

        .then(event => {
            // console.log(event)
            res.json(event)
        })
        .catch(err => {
            console.log(err)
        })


})


router.get('/userPost/:postId', requireLogin, async (req, res) => {
    // var mySort = { date: -1 };
    //  console.log(req.params.postId)
      Post.findOne({_id:req.params.postId})
    //   .sort(mySort)
    
      .populate('postedBy').select("-password")
      .populate('comment.postedBy').select("-password")
      .populate('comment.reply.postedBy').select("-password")
  
      .then(post=>{
        //   console.log(post)
          res.json(post)
      })
      .catch(err=>{
          console.log(err)
      })
  
  
  })




//update post api
router.put('/updatePost/:postId', async (req, res) => {
    let result = await Post.updateOne(
        { _id: req.params.postId },
        {
            $set: req.body
        }
    )
    res.send(result)
})



//delete post
router.delete('/deletePost/:postId', async (req, res) => {
    const result = await Post.deleteOne({ _id: req.params.postId });
    res.send(result)

})

//like api
router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})


//unlike api
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})


// comment api

router.put('/comment', requireLogin, (req, res) => {
    // console.log(req.body.id)
    const comment = {
        postedBy: req.user,
        // date:req.body.date,
        message: req.body.message,
        // reply:{
        //     postedBy:req.user,
        //     replyMsg:req.body.replyMsg,
        // }
        // reply.replyMsg:req.body.replyMsg
    }
    Post.findByIdAndUpdate(req.body.id, {
        $push: { comment: comment }
    }, {
        new: true
    })
        .populate("comment.postedBy")
        .exec((err, result) => {
            if (err) {
                return res.json({ error: err })
            }
            else {
                // console.log(result)
                res.json(result)
            }
        })
})


router.put('/reply/:commentId',requireLogin,async(req,res)=>{
    // console.log(req.params.commentId)
    // console.log(req.body.id)

    const reply = {
        postedBy: req.user,
        // date:req.body.date,
        replyMsg: req.body.replyMsg,

    }
    Post.updateOne({_id: req.body.id,"comment._id":req.params.commentId},{
        $push:{"comment.$.reply":reply}
    },{
        new:true
    })
        .populate("reply.postedBy")
        .exec((err, result) => {
            if (err) {
                return res.json({ error: err })
            }
            else {
                // console.log(result)
                res.json(result)
            }
        })
})

//delete comment
router.put('/commentDel/:commentId', requireLogin,async (req, res) => {

    const result = await Post.updateOne({_id: req.body.id,"comment._id": req.params.commentId },{
        $pull:{comment : {_id: req.params.commentId} }
    });
    res.send(result)

})



router.put('/replyDel/:replyId', requireLogin,async (req, res) => {
 
        const result = await Post.updateOne({_id: req.body.id,"comment._id":req.body.commentId, },{
            $pull:{"comment.$.reply" : {_id: req.params.replyId} }
        });
        res.send(result)
    
    })






module.exports = router