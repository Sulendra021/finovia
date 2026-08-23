const prisma = require("../config/prisma");

// GET /api/users - admin: list all users
async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedUsers = users.map((user) => ({
      ...user,
      _id: user.id,
    }));

    res.json(formattedUsers);
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

    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      ...updated,
      _id: updated.id,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    next(err);
  }
}

// DELETE /api/users/:id - admin
async function deleteUser(req, res, next) {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "User deleted" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    next(err);
  }
}

// GET /api/users/wishlist/me - the logged-in user's saved products
async function getMyWishlist(req, res, next) {
  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    const cardIds = items.filter((w) => w.productType === "CreditCard").map((w) => w.productId);
    const cards = cardIds.length > 0
      ? await prisma.creditCard.findMany({ where: { id: { in: cardIds } } })
      : [];

    const cardsMap = new Map(cards.map((c) => [c.id, c]));

    const formatted = items.map((w) => {
      const card = cardsMap.get(w.productId);
      return {
        _id: w.id,
        productType: w.productType,
        productId: w.productId,
        productName: card ? card.name : null,
        bank: card ? card.bank : null,
        imageUrl: card ? card.imageUrl : null,
        annualFee: card ? card.annualFee : null,
      };
    });

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// POST /api/users/wishlist - add a product to the logged-in user's wishlist
async function addToWishlist(req, res, next) {
  try {
    const { productType, productId } = req.body;
    if (!productType || !productId) return res.status(400).json({ message: "productType and productId are required" });

    await prisma.wishlistItem.upsert({
      where: {
        userId_productType_productId: {
          userId: req.user.id,
          productType,
          productId: String(productId),
        },
      },
      update: {},
      create: {
        userId: req.user.id,
        productType,
        productId: String(productId),
      },
    });

    const items = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
    });

    const formatted = items.map((w) => ({
      productType: w.productType,
      productId: w.productId,
    }));

    res.status(201).json(formatted);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/users/wishlist/:productId - remove a saved product
async function removeFromWishlist(req, res, next) {
  try {
    await prisma.wishlistItem.deleteMany({
      where: {
        userId: req.user.id,
        productId: req.params.productId,
      },
    });

    const items = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
    });

    const formatted = items.map((w) => ({
      productType: w.productType,
      productId: w.productId,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, updateUserRole, deleteUser, getMyWishlist, addToWishlist, removeFromWishlist };
