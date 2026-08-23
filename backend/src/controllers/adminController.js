const prisma = require("../config/prisma");

// GET /api/admin/stats - aggregated counts for the admin dashboard
async function getDashboardStats(req, res, next) {
  try {
    const [
      userCount,
      cardCount,
      bankCount,
      dematCount,
      loanCount,
      insuranceCount,
      offerCount,
      blogCount,
      leadCount,
      commissionAgg,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.creditCard.count(),
      prisma.bankAccount.count(),
      prisma.dematAccount.count(),
      prisma.loan.count(),
      prisma.insurance.count(),
      prisma.offer.count(),
      prisma.blogPost.count(),
      prisma.application.count(),
      prisma.application.aggregate({
        _sum: {
          commissionEarned: true,
        },
      }),
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
      totalCommission: commissionAgg._sum.commissionEarned || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardStats };
