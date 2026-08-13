const Application = require("../models/Application");

// POST /api/applications  - fired when a user clicks "Apply Now" on any product;
// this is the lead-generation step that earns Finovia a commission.
async function createApplication(req, res, next) {
  try {
    const { productType, productId, applicantName, applicantEmail, applicantPhone } = req.body;
    if (!productType || !productId || !applicantName || !applicantEmail || !applicantPhone) {
      return res.status(400).json({ message: "Missing required application fields" });
    }
    const application = await Application.create({
      user: req.user ? req.user._id : undefined,
      productType,
      productId,
      applicantName,
      applicantEmail,
      applicantPhone,
      status: "redirected",
    });
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
}

// GET /api/applications/me  - the logged-in user's own applications
async function getMyApplications(req, res, next) {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    next(err);
  }
}

// GET /api/applications  - admin: list all leads
async function getApplications(req, res, next) {
  try {
    const applications = await Application.find().sort({ createdAt: -1 }).populate("user", "name email");
    res.json(applications);
  } catch (err) {
    next(err);
  }
}

// GET /api/applications/stats  - admin: quick commission/analytics summary
async function getApplicationStats(req, res, next) {
  try {
    const total = await Application.countDocuments();
    const approved = await Application.countDocuments({ status: "approved" });
    const commissionAgg = await Application.aggregate([
      { $group: { _id: null, totalCommission: { $sum: "$commissionEarned" } } },
    ]);
    res.json({
      totalLeads: total,
      approvedLeads: approved,
      totalCommission: commissionAgg[0]?.totalCommission || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createApplication, getMyApplications, getApplications, getApplicationStats };
