const express = require("express");
const router = express.Router();
const { createApplication, getMyApplications, getApplications, getApplicationStats } = require("../controllers/applicationController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", createApplication);
router.get("/me", protect, getMyApplications);
router.get("/stats", protect, admin, getApplicationStats);
router.get("/", protect, admin, getApplications);

module.exports = router;
