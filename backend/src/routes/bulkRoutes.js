const express = require("express");
const router = express.Router();
const { handleBulkOperation } = require("../controllers/bulkController");
const { protect, admin } = require("../middleware/authMiddleware");

// Secure bulk endpoint requiring admin authentication
router.post("/bulk", protect, admin, handleBulkOperation);

module.exports = router;
