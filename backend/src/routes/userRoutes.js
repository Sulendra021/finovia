const express = require("express");
const router = express.Router();
const { getUsers, updateUserRole, deleteUser, getMyWishlist, addToWishlist, removeFromWishlist } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/wishlist/me", protect, getMyWishlist);
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);

router.get("/", protect, admin, getUsers);
router.put("/:id/role", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
