const createCRUDController = require("./factory");
const CreditCard = require("../models/CreditCard");
module.exports = createCRUDController(CreditCard);
