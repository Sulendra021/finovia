const createCRUDController = require("./factory");
const Offer = require("../models/Offer");
module.exports = createCRUDController(Offer);
