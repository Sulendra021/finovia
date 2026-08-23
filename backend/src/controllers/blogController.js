const createCRUDController = require("./factory");
module.exports = createCRUDController("blogPost", { isPublishedField: true });
