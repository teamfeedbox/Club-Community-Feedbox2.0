const express = require('express')
const router = express.Router()
const Event = require('../models/event')


//create event api
router.post('/createEvent',async(req,res)=>{
    let result = new Event(req.body)
    let data = await result.save();
    res.send(data);
})



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



//api to get all the events created by user in their profile page
router.get('/myEvent/:id',(req,res)=>{
   
    Event.find({postedBy:req.params.id})
  
    .populate('postedBy').select("-password")
    .then(event=>{
        res.json({event})
    })
    .catch(err=>{
        console.log(err)
    })
})



//update event api
router.put('/updateEvent/:eventId',async(req,res)=>{
    let result = await Event.updateOne(
        {_id:req.params.eventId},
        {
            $set:req.body
        }
    )
    res.send(result)
  })




//delete event api
router.delete('/deleteEvent/:eventId',async(req,res)=>{
    const result = await Event.deleteOne({_id:req.params.eventId});
    res.send(result)
     
 })








module.exports = router