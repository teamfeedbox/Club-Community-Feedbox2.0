const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const User = require('../models/user')
const requireLogin = require('../middleware/requireLogin')
const Notification = require('../models/notification')
const { default: mongoose } = require('mongoose')

// Create event
router.post('/createEvent', requireLogin, (req, res) => {
    const { title, eventDate, eventTime, venue, desc, speaker, attendance, scope } = req.body
    console.log(req.body)
    const event = new Event({
        title,
        eventDate,
        eventTime,
        venue,
        desc,
        speaker,
        postedBy: req.user,
        attendance,
        scope
    })
    event.save().then(result => {
        res.json({ event: result })
    })
        .catch(err => {
            console.log(err)
        })
})

// add notification
router.post('/addNotifications' , (req,res)=>{
  const { message, messageScope, userId, date, venue, time} = req.body

  const notification = new Notification({
    message,
    messageScope,
    userId,
    date,
    userId,
    venue,
    time,
  })

  notification.save().then(result => {
    res.json({ event: result })
})
    .catch(err => {
        console.log(err)
    })
})

// get all notifications
router.get('/getNotifications', async(req, res) => {
    try {
        // var mySort = { message: -1 };
        await Notification.find({})
      
        
            .then(events => {
                res.status(200).json(events)
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        res.status(500).json(error)
    }
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
router.get('/getAllEvent', (req, res) => {
    try {
        var mySort = { eventDate: 1 };
        Event.find({})
            .sort(mySort)
            .populate('postedBy').select("-password")
            .then(events => {
                res.status(200).json(events)
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        res.status(500).json(error)
    }
})


// get event by name
router.get('/getEvent/:id', requireLogin, (req, res) => {
    var mySort = { date: -1 };
    Event.find({ _id: req.params.id })
        .sort(mySort)
        .populate('postedBy').select("-password")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err)
        })
})

//api to get all the events created by user in their profile page
router.get('/myEvent', requireLogin, async (req, res) => {
    Event.find({ postedBy: req.user._id })
        .populate('postedBy').select("-password")
        .then(event => {
            // console.log(event)
            res.json(event)
        })
        .catch(err => {
            console.log(err)
        })
})

// update attendance of a event
router.put('/update/Event/:eventId', requireLogin, async (req, res) => {
    try {
        // console.log(req.body, req.params.eventId);
        let ids = req.body.absentees;
        if (ids.length > 0) {
            ids.map(async (data) => {
                const response = await Event.updateOne({ _id: req.params.eventId }, {
                    $pull: { attendance: { _id: mongoose.Types.ObjectId(data) } },
                    $set: { attendanceSubmitted: true, eventDuration: req.body.eventDuration }
                })
            })
        } else {
            const response = await Event.updateOne({ _id: req.params.eventId }, {
                $set: { attendanceSubmitted: true, eventDuration: req.body.eventDuration }
            })
        }
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json(error)
    }
})

//add interested student to event's attendance list
router.put('/updateEvent/:eventId', requireLogin, async (req, res) => {
    let result = await Event.updateOne(
        { _id: req.params.eventId },
        { $push: { attendance: req.user } }
    )
    res.send(result)
})

//delete event api
router.delete('/deleteEvent/:eventId', async (req, res) => {
    const result = await Event.deleteOne({ _id: req.params.eventId });
    res.send(result)

})

module.exports = router