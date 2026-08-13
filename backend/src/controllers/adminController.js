const User = require("../models/User");
const CreditCard = require("../models/CreditCard");
const BankAccount = require("../models/BankAccount");
const DematAccount = require("../models/DematAccount");
const Loan = require("../models/Loan");
const Insurance = require("../models/Insurance");
const Offer = require("../models/Offer");
const BlogPost = require("../models/BlogPost");
const Application = require("../models/Application");

// GET /api/admin/stats - aggregated counts for the admin dashboard
async function getDashboardStats(req, res, next) {
  try {
    const [
      userCount, cardCount, bankCount, dematCount, loanCount,
      insuranceCount, offerCount, blogCount, leadCount, commissionAgg,
    ] = await Promise.all([
      User.countDocuments(),
      CreditCard.countDocuments(),
      BankAccount.countDocuments(),
      DematAccount.countDocuments(),
      Loan.countDocuments(),
      Insurance.countDocuments(),
      Offer.countDocuments(),
      BlogPost.countDocuments(),
      Application.countDocuments(),
      Application.aggregate([{ $group: { _id: null, total: { $sum: "$commissionEarned" } } }]),
    ]);

    res.json({
      users: userCount,
      products: {
        creditCards: cardCount,
        bankAccounts: bankCount,
        dematAccounts: dematCount,
        loans: loanCount,
        insurance: insuranceCount,
        offers: offerCount,
        blogPosts: blogCount,
      },
      leads: leadCount,
      totalCommission: commissionAgg[0]?.total || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardStats };
