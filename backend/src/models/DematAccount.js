const mongoose = require("mongoose");

const dematAccountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brokerage: { type: String, required: true },
    amc: { type: String, default: "0" },
    opening: { type: String, default: "Free" },
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    features: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DematAccount", dematAccountSchema);
