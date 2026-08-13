const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bank: { type: String, required: true },
    type: { type: String, enum: ["Savings", "Current", "Salary", "Zero Balance"], required: true },
    interest: { type: String, default: "0.00" },
    minBalance: { type: String, default: "0" },
    features: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankAccount", bankAccountSchema);
