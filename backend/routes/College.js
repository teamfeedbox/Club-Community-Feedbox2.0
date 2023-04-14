const express = require("express");
const College = require("../models/college");
const router = express.Router();

// Get all Colleges
router.get("/colleges/get", async (req, res) => {
  try {
    const data = await College.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add College
router.post("/college/add", async (req, res) => {
  try {
    const clg = await College.find({ name: req.body.name });
    // console.log(clg)
    if (clg.length > 0) {
      res.status(500).json("College Already Exists...");
    } else {
      const data = await College.create(req.body);
      res.status(200).json("College Added Successfully!");
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

// Update Clg
router.put("/college/update/:id", async (req, res) => {
  try {
    const clg = await College.findOneAndUpdate({ _id: req.params.id },{
      name:req.body.name
    });
    res.status(200).json(clg)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
