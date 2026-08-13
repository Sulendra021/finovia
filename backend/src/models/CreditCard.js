const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bank: { type: String, required: true },
    category: { type: String, enum: ["Cashback", "Travel", "Rewards", "Premium"], required: true },
    joiningFee: { type: String, default: "Free" },
    annualFee: { type: String, default: "Free" },
    rewardRate: { type: String },
    cashback: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    tags: [{ type: String }],
    gradient: { type: String, default: "from-blue-700 via-blue-600 to-blue-800" },
    active: { type: Boolean, default: true },
    description: { type: String },
    applyUrl: { type: String },
    buttonText: { type: String },
    imageUrl: { type: String },
    imageAlt: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditCard", creditCardSchema);
