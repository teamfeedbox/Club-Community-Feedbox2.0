const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Merchandise = require("../models/merchandise");
const multer = require("multer");
const upload = multer();
const { google } = require("googleapis");
const { Readable } = require("stream");

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
    parents: [process.env.USER_PROFILE_PIC],
  };

  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);

  const media = {
    mimeType: file.mimetype,
    body: stream,
  };

  const driveService = google.drive({ version: "v3", auth });
  const response = driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

router.get("/merchandise/getallproducts", async (req, res) => {
  try {
    const response = await Merchandise.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Something went Wrong!!" });
    console.log(error);
  }
});

router.post(
  "/merchandise/createproduct",
  requireLogin,
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      console.log(req.user);

      if (req.user.role !== "Super_Admin")
        return res.status(400).json({ error: "You don't have any access!" });

      if (response) {
        const { name, description, price, category, quantity } = req.body;
        const image = `https://drive.google.com/thumbnail?id=${response.data.id}`;
        const imageId = response.data.id;

        let product = await Merchandise.findOne({ imageId, name, description });

        if (product) res.status(400).json({ error: "Product already exists" });

        let result = await Merchandise.create({
          name,
          description,
          price,
          category,
          imageUrl: image,
          quantity,
          imageId,
        });
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: "Something went Wrong!!" });
      console.log(error);
    }
  }
);

router.put(
  "/merchandise/product/:id",
  requireLogin,
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const document = await Merchandise.findById(req.params.id);
      if (!document)
        return res.status(400).json({ error: "Document doesn't exist" });

      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);

      if (req.user.role !== "Super_Admin")
        return res.status(400).json({ error: "You don't have any access!" });

      if (response) {
        const { name, description, price, category, quantity } = req.body;
        const image = `https://drive.google.com/thumbnail?id=${response.data.id}`;
        const imageId = response.data.id;

        const newProduct = {};
        newProduct.name = name;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.category = category;
        newProduct.quantity = quantity;
        newProduct.imageUrl = image;
        newProduct.imageId = imageId;

        const updatedProduct = await Merchandise.findByIdAndUpdate(
          req.params.id,
          { $set: newProduct },
          { new: true }
        );

        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: "Something went Wrong!!" });
      console.log(error);
    }
  }
);

router.delete(
  "/merchandise/product/delete/:id",
  requireLogin,
  async (req, res) => {
    try {
      const deleteProduct = await Merchandise.findOneAndDelete({_id: req.params.id});

      if (!deleteProduct) {
        res.status(404).json("Product not found");
      } else {
        res.status(200).json("Product deleted successfully");
      }
    } catch (error) {
      res.json({ error: "Something went wrong" });
      console.log(error);
    }
  }
);

module.exports = router;
