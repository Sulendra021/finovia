const prisma = require("../config/prisma");

// GET /api/admin/stats - aggregated counts for the admin dashboard
async function getDashboardStats(req, res, next) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      userCount,
      verifiedUserCount,
      cardCount,
      bankCount,
      dematCount,
      loanCount,
      insuranceCount,
      offerCount,
      blogCount,
      leadCount,
      recentLeadsCount,
      commissionAgg,
      recentLeads,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isVerified: true } }),
      prisma.creditCard.count(),
      prisma.bankAccount.count(),
      prisma.dematAccount.count(),
      prisma.loan.count(),
      prisma.insurance.count(),
      prisma.offer.count(),
      prisma.blogPost.count(),
      prisma.application.count(),
      prisma.application.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.application.aggregate({
        _sum: {
          commissionEarned: true,
        },
      }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    res.json({
      users: userCount,
      verifiedUsers: verifiedUserCount,
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
      recentLeadsCount: recentLeadsCount,
      totalCommission: commissionAgg._sum.commissionEarned || 0,
      recentLeads: recentLeads || [],
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardStats };
