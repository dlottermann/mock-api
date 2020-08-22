const mongoose = require("../database");

const superMarketSchema = new mongoose.Schema({
  superMarketName: {
    type: String,
    require: true,
  },
  superMarketMainImage: {
    type: String,
    lowercase: true,
  },
  superMarketAdditionalImages: { type: Array },
  superMarketLocation: [
    {
      street: {
        type: String,
      },
      number: {
        type: String,
      },
      district: {
        type: String,
      },
      zip: {
        type: Number,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
  ],
  superMarketDescription: {
    type: String,
  },
  superMarketPhone: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const SuperMarket = mongoose.model("SuperMarket", superMarketSchema);

module.exports = SuperMarket;
