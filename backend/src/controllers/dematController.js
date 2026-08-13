const createCRUDController = require("./factory");
const DematAccount = require("../models/DematAccount");
module.exports = createCRUDController(DematAccount);
