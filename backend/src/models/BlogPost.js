const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    author: { type: String, default: "Finovia Team" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
