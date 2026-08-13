const createCRUDController = require("./factory");
const BlogPost = require("../models/BlogPost");
module.exports = createCRUDController(BlogPost);
