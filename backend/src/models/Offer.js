const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    bank: { type: String, required: true },
    category: { type: String, required: true },
    expiry: { type: String, required: true },
    color: { type: String, default: "blue" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
