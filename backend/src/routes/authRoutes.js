const express = require("express");
const router = express.Router();
const { register, login, getMe, forgotPassword, resetPassword, sendOtp, verifyOtp, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

module.exports = router;

