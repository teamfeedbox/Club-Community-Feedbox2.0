const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const requireLogin = require('../middleware/requireLogin')


//create event api
// router.post('/createEvent',async(req,res)=>{
//     let result = new Event(req.body)
//     let data = await result.save();
//     res.send(data);
// })


router.post('/createEvent',requireLogin,(req,res)=>{
    const {title,eventDate,eventTime,venue,desc,speaker,attendance} = req.body

    const event = new Event({
        title,
        eventDate,
        eventTime,
        venue,
        desc,
        speaker,
        postedBy:req.user ,
        attendance,
       

    })
    event.save().then(result=>{
        res.json({event:result})
    })
    .catch(err=>{
        console.log(err)
    })
    // console.log(req.user)
    // res.send("ok")

})




// router.post('/attendance',requireLogin,(req,res)=>{
//     // const {attendance} = req.body

//     const event = new Event({
//         attendance:req.user
//     })
//     event.save().then(result=>{
//         res.json(result)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
//     // console.log(req.user)
//     // res.send("ok")

// })



//api to get all events
router.get('/getAllEvent',(req,res)=>{
    var mySort = { eventDate: 1 };
    Event.find()
    .sort(mySort)
    .populate('postedBy').select("-password")
    .then(events=>{ 
        res.json(events)
    })
    .catch(err=>{
        console.log(err)
    })
})



router.get('/getEvent/:name',requireLogin,(req,res)=>{
    var mySort = { date: -1 };
    Event.find({title:req.params.name})
      .sort(mySort)
      .populate('postedBy').select("-password")
      .then(posts=>{
        // console.log(posts)
          res.json(posts)
      })
      .catch(err=>{
          console.log(err)
      })
  })



//api to get all the events created by user in their profile page
router.get('/myEvent',requireLogin,async(req,res)=>{
   
    Event.find({postedBy:req.user._id})
  
    .populate('postedBy').select("-password")

    .then(event=>{
        // console.log(event)
        res.json(event)
    })
    .catch(err=>{
        console.log(err)
    })


})



//update event api
router.put('/updateEvent/:eventId',requireLogin, async(req,res)=>{
    let result = await Event.updateOne(
        {_id:req.params.eventId},
        {
           $push:{attendance:req.user}
        }
    )
    res.send(result)
  })


// router.put('/updateEvent/:id',requireLogin, (req, res) => {
//     const _id = req.params.id;
//     const attendance = req.body;
  
//     Event.findByIdAndUpdate(_id, attendance, { new: true }, (err, user) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(user);
//       }
//     });
//   });



//delete event api
router.delete('/deleteEvent/:eventId',async(req,res)=>{
    const result = await Event.deleteOne({_id:req.params.eventId});
    res.send(result)
     
 })








module.exports = router