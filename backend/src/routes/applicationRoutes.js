const express = require("express");
const router = express.Router();
const { createApplication, getMyApplications, getApplications, getApplicationById, getApplicationStats, updateApplication } = require("../controllers/applicationController");
const { protect, optionalAuth, admin } = require("../middleware/authMiddleware");

// Allow unauthenticated guests or authenticated users to submit leads
router.post("/", optionalAuth, createApplication);
router.get("/me", protect, getMyApplications);
router.get("/stats", protect, admin, getApplicationStats);
router.get("/", protect, admin, getApplications);
router.get("/:id", protect, admin, getApplicationById);
router.put("/:id", protect, admin, updateApplication);

module.exports = router;
