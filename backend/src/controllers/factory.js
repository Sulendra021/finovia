const prisma = require("../config/prisma");

// Generic CRUD controller factory using Prisma for product/content models
function createCRUDController(modelName, options = {}) {
  const delegate = prisma[modelName];
  const activeFilterKey = options.activeFilterKey || "active";
  const isPublishedField = options.isPublishedField || false;

  return {
    // GET /api/<resource> - list all active records, newest first
    getAll: async (req, res, next) => {
      try {
        const where = {};
        if (isPublishedField) {
          where.published = true;
        } else {
          where[activeFilterKey] = true;
        }

        if (req.query.category) {
          where.category = req.query.category;
        }

        const items = await delegate.findMany({
          where,
          orderBy: { createdAt: "desc" },
        });

        // Format _id virtual to preserve API contract for frontend
        const formattedItems = items.map((item) => ({
          ...item,
          _id: item.id,
        }));

        res.json(formattedItems);
      } catch (err) {
        next(err);
      }
    },

    // GET /api/<resource>/:id
    getOne: async (req, res, next) => {
      try {
        const item = await delegate.findUnique({
          where: { id: req.params.id },
        });
        if (!item) return res.status(404).json({ message: "Not found" });
        res.json({
          ...item,
          _id: item.id,
        });
      } catch (err) {
        next(err);
      }
    },

    // POST /api/<resource> - admin only
    create: async (req, res, next) => {
      try {
        const item = await delegate.create({
          data: req.body,
        });
        res.status(201).json({
          ...item,
          _id: item.id,
        });
      } catch (err) {
        next(err);
      }
    },

    // PUT /api/<resource>/:id - admin only
    update: async (req, res, next) => {
      try {
        const item = await delegate.update({
          where: { id: req.params.id },
          data: req.body,
        });
        res.json({
          ...item,
          _id: item.id,
        });
      } catch (err) {
        if (err.code === "P2025") {
          return res.status(404).json({ message: "Not found" });
        }
        next(err);
      }
    },

    // DELETE /api/<resource>/:id - admin only
    remove: async (req, res, next) => {
      try {
        await delegate.delete({
          where: { id: req.params.id },
        });
        res.json({ message: "Deleted successfully" });
      } catch (err) {
        if (err.code === "P2025") {
          return res.status(404).json({ message: "Not found" });
        }
        next(err);
      }
    },
  };
}

module.exports = createCRUDController;
