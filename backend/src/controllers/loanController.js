const createCRUDController = require("./factory");
const Loan = require("../models/Loan");
module.exports = createCRUDController(Loan);
