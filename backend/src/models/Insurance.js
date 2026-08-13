const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    provider: { type: String, required: true },
    premium: { type: String, required: true },
    coverage: { type: String },
    claimRatio: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insurance", insuranceSchema);
