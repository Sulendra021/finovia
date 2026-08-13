const User = require("../models/User");

// GET /api/users - admin: list all users
async function getUsers(req, res, next) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

// PUT /api/users/:id/role - admin: promote/demote a user
async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "role must be 'user' or 'admin'" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/users/:id - admin
async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/wishlist/me - the logged-in user's saved products
async function getMyWishlist(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.wishlist || []);
  } catch (err) {
    next(err);
  }
}

// POST /api/users/wishlist - add a product to the logged-in user's wishlist
async function addToWishlist(req, res, next) {
  try {
    const { productType, productId } = req.body;
    if (!productType || !productId) return res.status(400).json({ message: "productType and productId are required" });
    const user = await User.findById(req.user._id);
    const exists = user.wishlist.some((w) => String(w.productId) === String(productId) && w.productType === productType);
    if (!exists) {
      user.wishlist.push({ productType, productId });
      await user.save();
    }
    res.status(201).json(user.wishlist);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/users/wishlist/:productId - remove a saved product
async function removeFromWishlist(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter((w) => String(w.productId) !== String(req.params.productId));
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, updateUserRole, deleteUser, getMyWishlist, addToWishlist, removeFromWishlist };
