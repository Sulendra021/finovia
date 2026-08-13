const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/offerController");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", protect, admin, ctrl.create);
router.put("/:id", protect, admin, ctrl.update);
router.delete("/:id", protect, admin, ctrl.remove);

module.exports = router;
