const mongoose = require("mongoose");

// Tracks a user's "Apply Now" click through to a partner product -
// this is the lead that generates commission for Finovia (step 6 of the user journey).
const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productType: {
      type: String,
      enum: ["CreditCard", "BankAccount", "DematAccount", "Loan", "Insurance"],
      required: true,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    applicantName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    applicantPhone: { type: String, required: true },
    status: { type: String, enum: ["pending", "redirected", "approved", "rejected"], default: "pending" },
    commissionEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
