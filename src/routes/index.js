const express = require("express");
const router = express.Router();
const SuperMarket = require("../models/supermarket");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const multer = require('multer')


dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
});


var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/file", upload.single("logo"), (req, res, next) => {
  try {
    
    const fileName = req.file
    const ext = fileName.originalname.split('.')
  
  
    const params = {
        Bucket: process.env.BUCKET,
        Key: `${uuidv4()}.${ext[ext.length-1]}`, // File name you want to save as in S3
        Body: fileName.buffer,
        ContentType: fileName.mimetype,
        ACL: 'public-read'
    };


    s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      res.send(data.Location);
  });
    
  } catch (error) {
    res.status(400).send({ error: "Error upload: " + error });
  }
});

router.get("/", async (req, res) => {
  try {
    const supermarket = await SuperMarket.find();
    res.send({ supermarket });
  } catch (error) {
    res.status(400).send({ error: "Error list: " + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const supermarket = await SuperMarket.findById(req.params.id);
    res.send({ supermarket });
  } catch (error) {
    res.status(400).send({ error: "Error get register: " + error });
  }
});

router.post("/", async (req, res) => {
  try {
    const supermarket = await SuperMarket.create(req.body);
    res.send({ supermarket });
  } catch (error) {
    res.status(400).send({ error: "Error: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      superMarketName,
      superMarketMainImage,
      superMarketDescription,
      superMarketPhone,
    } = req.body;

    const supermarket = await SuperMarket.findByIdAndUpdate(
      req.params.id,
      {
        superMarketName,
        superMarketMainImage,
        superMarketDescription,
        superMarketPhone,
      },
      { new: true, useFindAndModify: false }
    );

    res.send({ supermarket });
  } catch (error) {
    res.status(400).send({ error: "Error get register: " + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const supermarket = await SuperMarket.findByIdAndDelete(req.params.id);
    return res.send();
  } catch (error) {
    res.status(400).send({ error: "Error delete: " + error });
  }
});

module.exports = (app) => app.use("/", router);
