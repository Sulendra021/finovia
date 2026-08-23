const prisma = require("../config/prisma");

// Helper to normalize product type strings to Prisma ProductType Enum values
function normalizeProductType(typeStr) {
  if (!typeStr) return "CreditCard";
  const s = String(typeStr).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (s.includes("card") || s.includes("credit")) return "CreditCard";
  if (s.includes("bank") || s.includes("account")) return "BankAccount";
  if (s.includes("demat") || s.includes("broker")) return "DematAccount";
  if (s.includes("loan")) return "Loan";
  if (s.includes("insurance")) return "Insurance";
  return "CreditCard";
}

// POST /api/applications - Idempotent lead creation with double-submit protection
async function createApplication(req, res, next) {
  try {
    const { productType, productId, applicantName, applicantEmail, applicantPhone } = req.body;
    if (!productType || !productId || !applicantName || !applicantEmail || !applicantPhone) {
      return res.status(400).json({ message: "Missing required application fields" });
    }

    const normalizedType = normalizeProductType(productType);
    const userId = req.user ? req.user.id : null;
    const cleanEmail = applicantEmail.toLowerCase().trim();

    // Idempotency check: Look for duplicate submission in last 60 seconds
    const sixtySecondsAgo = new Date(Date.now() - 60 * 1000);
    const recentDuplicate = await prisma.application.findFirst({
      where: {
        applicantEmail: cleanEmail,
        productType: normalizedType,
        productId: String(productId),
        createdAt: { gte: sixtySecondsAgo },
      },
    });

    if (recentDuplicate) {
      return res.status(200).json({
        ...recentDuplicate,
        _id: recentDuplicate.id,
        user: recentDuplicate.userId,
        idempotent: true,
      });
    }

    const application = await prisma.application.create({
      data: {
        userId,
        productType: normalizedType,
        productId: String(productId),
        applicantName: applicantName.trim(),
        applicantEmail: cleanEmail,
        applicantPhone: applicantPhone.trim(),
        status: "redirected",
      },
    });

    res.status(201).json({
      ...application,
      _id: application.id,
      user: application.userId,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/applications/me - user's own lead applications
async function getMyApplications(req, res, next) {
  try {
    const userEmail = req.user?.email ? req.user.email.toLowerCase().trim() : null;
    const applications = await prisma.application.findMany({
      where: {
        OR: [
          { userId: req.user.id },
          ...(userEmail ? [{ applicantEmail: userEmail }] : []),
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = applications.map((app) => ({
      ...app,
      _id: app.id,
      user: app.userId,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// GET /api/applications - admin: list all leads
async function getApplications(req, res, next) {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const formatted = applications.map((app) => ({
      ...app,
      _id: app.id,
      user: app.user
        ? {
            ...app.user,
            _id: app.user.id,
          }
        : null,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// GET /api/applications/stats - admin: commission & analytics summary with explicit rounding
async function getApplicationStats(req, res, next) {
  try {
    const total = await prisma.application.count();
    const approved = await prisma.application.count({
      where: { status: "approved" },
    });

    const commissionAgg = await prisma.application.aggregate({
      _sum: {
        commissionEarned: true,
      },
    });

    // Round total commission to 2 decimal places to eliminate floating point imprecision
    const rawSum = commissionAgg._sum.commissionEarned || 0;
    const roundedCommission = Math.round(rawSum * 100) / 100;

    res.json({
      totalLeads: total,
      approvedLeads: approved,
      totalCommission: roundedCommission,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createApplication, getMyApplications, getApplications, getApplicationStats };
