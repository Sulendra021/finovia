const createCRUDController = require("./factory");
const Insurance = require("../models/Insurance");
module.exports = createCRUDController(Insurance);
