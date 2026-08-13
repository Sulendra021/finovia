const createCRUDController = require("./factory");
const BankAccount = require("../models/BankAccount");
module.exports = createCRUDController(BankAccount);
