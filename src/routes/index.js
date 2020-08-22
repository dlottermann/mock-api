const express = require("express");
const router = express.Router();
const SuperMarket = require("../models/supermarket");

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
