const express = require("express");
const router = express.Router();
const Transaction = require("mongoose-transactions");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Merchandise = require("../models/merchandise");
const multer = require("multer");
const upload = multer();
const { google } = require("googleapis");
const { Readable } = require("stream");
const users = require("../models/user");
const { log } = require("console");
const nodemailer = require("nodemailer");
// const { JWT } from 'google-auth-library';
const { JWT } = require("google-auth-library");
// import { GoogleSpreadsheet } from 'google-spreadsheet';
const { GoogleSpreadsheet, GoogleSpreadsheetRow } = require("google-spreadsheet");
const fdbx = require("./feedboxclubcommunity-419307-e85ba3424dee.json");
const moment = require('moment')



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

//Integrating with excel api

dotenv.config();

// router.post("/uploadToSheet/:productId", requireLogin, async (req, res) => {
//   try {
//     const serviceAccountAuth = new JWT({
//       fdbx,
//       keyFile: `${__dirname}\\feedboxclubcommunity-378dac7f18ec.json`,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     const doc = new GoogleSpreadsheet(
//       "1PINd4ywL97gIIzDCCM7XSFwiVF_cZ0ok7R0eV58Co6U",
//       serviceAccountAuth
//     );

//     console.log(serviceAccountAuth);

//     await doc.loadInfo(); // loads document properties and worksheets

//     await doc.updateProperties({ title: "Feedbox orders" });

//     const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

//     const HEADERS = [
//       "SERIAL NO",
//       "USER NAME",
//       "EMAIL",
//       "USER_ID",
//       "PRODUCT NAME",
//       "SIZE",
//       "PRODUCT_ID",
//     ];
//     await sheet.setHeaderRow(HEADERS);

//     const product = await Merchandise.findById(req.params.productId);
//     const user = await users.findById(req.user._id);

//     const newRow = {
//       "SERIAL NO": sheet.rowCount + 1, // Assuming SERIAL NO is a sequence number
//       "USER NAME": user.name, // Replace 'name' with the actual field name in your user model
//       EMAIL: user.email, // Assuming there's an 'email' field in your user model
//       USER_ID: user._id,
//       "PRODUCT NAME": product.name, // Replace 'name' with the actual field name in your product model
//       "SIZE": product.size, // Assuming there's a 'size' field in your product model
//       PRODUCT_ID: product._id,
//     };

//     await sheet.addRow(newRow);
//     // // adding / removing sheets
//     // const newSheet = await doc.addSheet({ title: "Feedbox Orders" });
//     // await newSheet.delete();

//     res
//       .status(200)
//       .json({ status: true, message: "Sheet updated successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: false, message: "Some error occured" });
//   }
// });

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

// 11/04/2024
router.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await Merchandise.findById(req.params.id);

    if (!product) res.status(200).json("Product could not be found!");
    else res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went Wrong!!" });
  }
});

router.put("/purchase/:productId", requireLogin, async function (req, res) {
  const { price, quantity } = req.body;
  const { role } = req.user;
  const { _id } = req.user;
  const userId = _id.toString();
  console.log(userId);

  if (role === "Super_Admin")
    return res
      .status(404)
      .json({ status: false, message: "You are not allowed to purchase" });

  if (!userId || !price) {
    return res
      .status(400)
      .json({ status: false, message: "Fill Missing fields" });
  }
  try {
    const findUser = await users.findById(userId);
    console.log(findUser);

    if (!findUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (findUser.coins < parseInt(price)) {
      return res
        .status(404)
        .json({ status: false, message: "Not enough coins" });
    }

    const findProduct = await Merchandise.findById(req.params.productId);

    if (findProduct.quantity < parseInt(quantity)) {
      return res
        .status(404)
        .json({ status: false, message: "Product out of stock!" });
    }

    // const user = await users.findOneAndUpdate(
    //   { _id: userId, coins: { $gte: parseInt(price) } }, //filter and update
    //   { $inc: { coins: -parseInt(price) } },
    //   // { $inc: { quantity: -parseInt(quantity) } },
    //   { new: true, runValidators: true }
    // );
    let calculatedCoins = parseInt(price) * parseInt(quantity);
    // console.log(calculatedCoins, " --------");
    const user = await users.findByIdAndUpdate(
      userId,
      { $inc: { coins: -calculatedCoins } },
      {
        new: true,
        runValidators: true,
        select: { coins: 1 }, // Specify the fields to return
      }
    );

    const merchandise = await Merchandise.findOneAndUpdate(
      { _id: req.params.productId },
      { $inc: { quantity: -parseInt(quantity) } },
      { new: true, runValidators: true }
    );
    /*
      // if(user.coins < price) 
      //   return res.status(400).json({message:"Not enough coins"});

      //   user.coins -= price;
      //   user.save();
*/
    res.json({
      message: "Product purchased successfully",
      status: true,
      quantity: merchandise.quantity,
      coins: "coins:->",
      remainingCoins: user.coins,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
    console.log(error);
  }
});

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
      const deleteProduct = await Merchandise.findOneAndDelete({
        _id: req.params.id,
      });

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

router.post("/sendmail", requireLogin, async (req, res) => {
  // const { _id } = req.user;
  console.log(req.user);
  const { name, email, size } = req.body;

  // let result = await users.findById(_id);

  // const product = await Merchandise.findById(req.params.productId);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "siddharth.fdbx@gmail.com",
      pass: "gmqm ybmr cqke bdkb",
    },
  });

  let mailOptions = {
    from: "siddharth.fdbx@gmail.com",
    to: `${email}`,
    subject: "Your order has been successfully placed",
    //text: ${result.name},
    html: `<div>Dear ${name},
       <br/><br/>
       Heartfelt thanks for your support and dedication to our community. Your purchase of our merchandise directly contributes to our initiatives' growth and sustainability, reflecting your appreciation for our club's artistry and creativity. Your support means everything to us.
       <br/><br/>
       Best regards,
       <br/><br/>
       Team Feedbox</div>`, // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(404).json({ status: false, message: "Some error occured !" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ status: true, message: "Mail sent to your mail ID" });
    }
  });
});

router.post("/submitProduct/:productId", requireLogin, async (req, res) => {
  const transaction = new Transaction();

  try {
    const { price, quantity } = req.body;
    const { role } = req.user;
    const { _id } = req.user;
    const userId = _id.toString();
    // console.log(userId);
    // console.log(price);

    if (role === "Super_Admin")
      return res
        .status(404)
        .json({ status: false, message: "You are not allowed to purchase" });

    if (!userId || !price) {
      return res
        .status(400)
        .json({ status: false, message: "Fill Missing fields" });
    }

    const findUser = await users.findById(userId);
    // console.log(findUser);

    if (!findUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (findUser.coins < parseInt(price)) {
      return res
        .status(404)
        .json({ status: false, message: "Not enough coins" });
    }

    const findProduct = await Merchandise.findById(req.params.productId);
    if(!findProduct) {
      return res.status(404).json({status: false, message: "Product not found!"})
    }

    if (findProduct.quantity < parseInt(quantity)) {
      return res
        .status(404)
        .json({ status: false, message: "Product out of stock!" });
    }

    // const user = await users.findOneAndUpdate(
    //   { _id: userId, coins: { $gte: parseInt(price) } }, //filter and update
    //   { $inc: { coins: -parseInt(price) } },
    //   // { $inc: { quantity: -parseInt(quantity) } },
    //   { new: true, runValidators: true }
    // );
    let calculatedCoins = parseInt(price) * parseInt(quantity);
    // console.log(calculatedCoins, " --------");
    // const user = await users.findByIdAndUpdate(
    //   userId,
    //   { $inc: { coins: -calculatedCoins } },
    //   {
    //     new: true,
    //     runValidators: true,
    //     select: { coins: 1 }, // Specify the fields to return
    //   }
    // );

    // const merchandise = await Merchandise.findOneAndUpdate(
    //   { _id: req.params.productId },
    //   { $inc: { quantity: -parseInt(quantity) } },
    //   { new: true, runValidators: true }
    // );

    transaction.update('users' , userId, { $inc: { coins: -calculatedCoins } });
    transaction.update('products' , req.params.productId, { $inc: { quantity: -parseInt(quantity) } });

    await transaction.run();
    /*
      // if(user.coins < price) 
      //   return res.status(400).json({message:"Not enough coins"});

      //   user.coins -= price;
      //   user.save();
*/
   const {size} = req.body;    

    const serviceAccountAuth = new JWT({
      fdbx,
      keyFile: `${__dirname}\\feedboxclubcommunity-419307-e85ba3424dee.json`,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(
      "1BcQMSq1FE9V8xdT_N4q5MovP4mR6hKCbBwsSBje9c08",
      serviceAccountAuth
    );

    await doc.loadInfo(); // loads document properties and worksheets

    await doc.updateProperties({ title: "Feedbox orders" });

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    const HEADERS = [
      "SERIAL NO",
      "USER NAME",
      "EMAIL",
      "USER_ID",
      "COLLEGE NAME",
      "YEAR",
      "PRODUCT NAME",
      "SIZE",
      "PRODUCT_ID",
      "ORDER DATE"
    ];
    await sheet.setHeaderRow(HEADERS);

    const product = await Merchandise.findById(req.params.productId);
    const user2 = await users.findById(req.user._id);

    console.log("--------------------------",sheet.rowCount);

    const rows = await sheet.getRows();
    console.log(rows);
    // let lastRow = rows ? rows[rows.length - 1] : 0;
    // console.log("last row ------------>");
    // let firstrow  = rows[1]._rowNumber;
    // const lastSerialNumber = rows.length > 0 ? parseInt(rows[rows.length-1]['SERIAL NO']) : 0;
    // console.log("rows---------->",rows);
    // console.log("Firstrows---------->",firstrow);
    // console.log("LastSerialNumber ---->",lastSerialNumber);

    const currentDate = moment().format('DD/MM/YY');
    const newRow = {
      "SERIAL NO": rows && rows.length > 0 ? rows[rows.length - 1]._rowNumber : 1, // Assuming SERIAL NO is a sequence number
      "USER NAME": user2.name, // Replace 'name' with the actual field name in your user model
      "EMAIL": user2.email, // Assuming there's an 'email' field in your user model
      "USER_ID": user2.uniqueId,
      "COLLEGE NAME": user2.collegeName,
      "YEAR": user2.collegeYear,
      "PRODUCT NAME": product.name, // Replace 'name' with the actual field name in your product model
      "SIZE": size, // Assuming there's a 'size' field in your product model
      "PRODUCT_ID": product._id,
      "ORDER DATE": currentDate
    };

    await sheet.addRow(newRow);
    // // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: "Feedbox Orders" });
    // await newSheet.delete();

    // res
    //   .status(200)
    //   .json({ status: true, message: "Sheet updated successfully" });

    console.log(req.user);
    const { name, email } = req.body;

    // let result = await users.findById(_id);

    // const product = await Merchandise.findById(req.params.productId);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "siddharth.fdbx@gmail.com",
        pass: "gmqm ybmr cqke bdkb",
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    let mailOptions = {
      from: "siddharth.fdbx@gmail.com",
      to: `${email}`,
      subject: "Your order has been successfully placed",
      //text: ${result.name},
      html: `<div>Dear ${name},
           <br/><br/>
           Heartfelt thanks for your support and dedication to our community. Your purchase of our merchandise directly contributes to our initiatives' growth and sustainability, reflecting your appreciation for our club's artistry and creativity. Your support means everything to us.
           <br/><br/>
           Best regards,
           <br/><br/>
           Team Feedbox</div>`, // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error in sending the mail => ",error);
        res
          .status(404)
          .json({ status: false, message: "Some error occured !" });
      } else {
        console.log("Email sent: " + info.response);

        res.status(200).json({
          message: "Product purchased successfully",
          message2: "Mail sent to your mail ID",
          status: true,
          // quantity: merchandise.quantity,
          // coins: "coins:->",
          // remainingCoins: user.coins,
        });
      }
    });

  } catch (err) {
    await transaction.rollback().catch(console.error);
    console.log(err);
    res.status(500).json({ status: false, message: "Some error occured !" });
  }

   finally{
    transaction.clean();
   }
});

module.exports = router;
