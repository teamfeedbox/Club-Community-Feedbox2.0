const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const user = require("../models/user");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { closeDelimiter } = require("ejs");
const { google } = require("googleapis");
const { Readable } = require("stream");
const multer = require("multer");
const upload = multer();

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
    parents: [process.env.POST_IMAGE_KEY],
  };

  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);

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

router.post("/upload/images/get/link", async (req, res) => {
  try {
    // console.log(req.body)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/create-post",
  upload.array("img"),
  requireLogin,
  async (req, res) => {
    // console.log("Khsuhis");
    // console.log(req.files);
    // console.log(req.body);

    if (req.files && req.files.length > 0) {
      let ids = [];
      for (let i = 0; i < req.files.length; i++) {
        const auth = authenticateGoogle();
        const response = await uploadToGoogleDrive(req.files[i], auth);
        ids.push(response.data.id);
      }
      const post = new Post({
        desc: req.body.desc,
        postedBy: req.user,
        collegeName: req.body.collegeName,
        scope: req.body.scope,
        img: ids,
      });
      post
        .save()
        .then((result) => {
          res.json({ post: result });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { desc, collegeName, scope } = req.body;
      const post = new Post({
        desc: req.body.desc,
        postedBy: req.user,
        collegeName: req.body.collegeName,
        scope: req.body.scope,
      });
      post
        .save()
        .then((result) => {
          res.json({ post: result });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

//api to get all posts
//it will be used to display at the homepage feed
router.get("/getAllPost", requireLogin, (req, res) => {
  var mySort = { date: -1 };
  Post.find()
    .sort(mySort)
    .populate("postedBy")
    .select("-password")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

//api to get all the post created by user in their profile page
router.get("/myPost/:id", requireLogin, (req, res) => {
  //    let postedBy=req.user
  Post.find({ _id: req.params.id })

    .populate("postedBy")
    .select("-password")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myPost", requireLogin, async (req, res) => {
  var mySort = { date: -1 };

  Post.find({ postedBy: req.user._id })
    .sort(mySort)

    .populate("postedBy")
    .select("-password")

    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userPost/:postId", requireLogin, async (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy")
    .select("-password")
    .populate("comment.postedBy")
    .select("-password")
    .populate("comment.reply.postedBy")
    .select("-password")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update post api
router.put("/updatePost/:postId", async (req, res) => {
  let result = await Post.updateOne(
    { _id: req.params.postId },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//delete post
router.delete("/deletePost/:id", async (req, res) => {
  try {
    const auth = authenticateGoogle();
    const drive = google.drive({ version: "v3", auth });
    for (let i = 0; i < req.body.img.length; i++) {
    const file_id = req.body.img[i];
      drive.files
        .delete({
          fileId: file_id,
        })
        .then(
          async function (response) {
            // console.log(response);
          },
          function (err) {}
        );
    }
    const result = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//like api
router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//unlike api
router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

// comment api

router.put("/comment", requireLogin, (req, res) => {
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
  };
  Post.findByIdAndUpdate(
    req.body.id,
    {
      $push: { comment: comment },
    },
    {
      new: true,
    }
  )
    .populate("comment.postedBy")
    .exec((err, result) => {
      if (err) {
        return res.json({ error: err });
      } else {
        // console.log(result)
        res.json(result);
      }
    });
});

// router.put("/reply/:commentId", requireLogin, async (req, res) => {
//   // console.log(req.params.commentId,req.body.id)
//   // console.log(req.body.id)
//   const { userId } = req.user._id;

//   const reply = {
//     postedBy: req.user,
//     // date:req.body.date,
//     replyMsg: req.body.replyMsg,
//   };
//   const post = Post.findOne({
//     _id: req.body.id,
//     "comment._id": req.params.commentId,
//     "comment.reply.postedBy._id": userId,
//   }).exec((err, result) => {
//     if (err) {
//       return res.json({ error: err });
//     } else {
//       console.log(result)
//       if (!result) {
//         Post.updateOne(
//           { _id: req.body.id, "comment._id": req.params.commentId },
//           {
//             $push: { "comment.$.reply": reply },
//           },
//           {
//             new: true,
//           }
//         )
//           .populate("reply.postedBy")
//           .exec((err, result) => {
//             if (err) {
//               return res.json({ error: err });
//             } else {
//               // console.log(result)
//               res.json(result);
//             }
//           });
//       } else {
//         res.json("you are not allowed to reply more than one's");
//       }
//     }
//   });
//   // console.log(post)
// });

router.put("/reply/:commentId", requireLogin, async (req, res) => {
  try {
    // const { userId } = req.user._id;
    // console.log(req.user._id)

    const post = await Post.findOne({ _id: req.body.id }).exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comment.find(
      (c) => c._id.toString() === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const alreadyReplied = comment.reply.some(
      (r) => r.postedBy._id.toString() === req.user._id.toString()
    );

    if (alreadyReplied) {
      return res
        .status(400)
        .json({ error: "You have already replied to this comment" });
    }

    comment.reply.push({
      postedBy: req.user,
      replyMsg: req.body.replyMsg,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//delete comment
// router.put("/commentDel/:commentId", requireLogin, async (req, res) => {
//   console.log(req.body.postedById)
//   const result = await Post.updateOne(
//     {_id: req.body.id, "comment._id": req.params.commentId },
//     {
//       $pull: { comment: { _id: req.params.commentId } },
//     }
//   );
//   res.send(result);
// });

router.put("/commentDel/:commentId", requireLogin, async (req, res) => {
  // try {
  // Check if the logged in user is the creator of the post
  const post = await Post.findById(req.body.id);

  if (
    req.body.postedById === req.user._id.toString() ||
    req.user.role === "Super_Admin" ||
    req.user.role === "Admin"
  ) {
    const result = await Post.updateOne(
      { _id: req.body.id, "comment._id": req.params.commentId },
      { $pull: { comment: { _id: req.params.commentId } } }
    );
    res.send(result);
  } else {
    return res
      .status(401)
      .json({ error: "You are not authorized to delete this comment" });
  }

  // Remove the comment from the post's comments array

  // catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Server error" });
  // }
});

router.put("/replyDel/:replyId", requireLogin, async (req, res) => {
  // const {postedById} = req.body.postedById;
  // try {
  // Check if the logged in user is the creator of the post
  const post = await Post.findById(req.body.id);

  if (
    req.body.replyById === req.user._id.toString() ||
    req.user.role === "Super_Admin" ||
    req.user.role === "Admin"
  ) {
    const result = await Post.updateOne(
      { _id: req.body.id, "comment._id": req.body.commentId },

      {
        $pull: { "comment.$.reply": { _id: req.params.replyId } },
      }
    );
    res.send(result);
  } else {
    return res
      .status(401)
      .json({ error: "You are not authorized to delete this reply" });
  }

  // Remove the comment from the post's comments array
  //  catch (error) {
  // console.error(error);
  // res.status(500).json({ error: "Server error" });
  // }
});

// router.put("/replyDel/:replyId", requireLogin, async (req, res) => {
//   const{user}=req.user._id
//   const result = await Post.updateOne(
//     {_id: req.body.id, "comment._id": req.body.commentId },

//     {
//       $pull: { "comment.$.reply": { _id: req.params.replyId } },
//     }
//   );
//   res.send(result);
// });

module.exports = router;
