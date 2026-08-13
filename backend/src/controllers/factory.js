// Generic CRUD controller factory - each product type (CreditCard, BankAccount,
// DematAccount, Loan, Insurance, Offer, BlogPost) shares the same list/read/
// create/update/delete shape, so we build it once and reuse it per model.
function createCRUDController(Model) {
  return {
    // GET /api/<resource>  - list all active records, newest first
    getAll: async (req, res, next) => {
      try {
        const filter = { active: { $ne: false } };
        if (req.query.category) filter.category = req.query.category;
        const items = await Model.find(filter).sort({ createdAt: -1 });
        res.json(items);
      } catch (err) {
        next(err);
      }
    },

    // GET /api/<resource>/:id
    getOne: async (req, res, next) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });
        res.json(item);
      } catch (err) {
        next(err);
      }
    },

    // POST /api/<resource>  - admin only
    create: async (req, res, next) => {
      try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      } catch (err) {
        next(err);
      }
    },

    // PUT /api/<resource>/:id  - admin only
    update: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) return res.status(404).json({ message: "Not found" });
        res.json(item);
      } catch (err) {
        next(err);
      }
    },

    // DELETE /api/<resource>/:id  - admin only
    remove: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
      } catch (err) {
        next(err);
      }
    },
  };
}

module.exports = createCRUDController;
