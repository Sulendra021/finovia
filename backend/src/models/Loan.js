const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rate: { type: String, required: true },
    amount: { type: String, required: true },
    tenure: { type: String, required: true },
    processingFee: { type: String },
    desc: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
