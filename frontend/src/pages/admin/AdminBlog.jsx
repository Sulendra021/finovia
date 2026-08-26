import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "readTime", label: "Read time" },
];
export const blogFormFields = [
  { name: "title", label: "Title", required: true, placeholder: "Post Title" },
  { name: "category", label: "Category", required: true, placeholder: "e.g. Credit Cards, Personal Finance" },
  { name: "imageUrl", label: "Featured Image URL", placeholder: "https://images.unsplash.com/photo-..." },
  { name: "readTime", label: "Read Time", placeholder: "e.g. 5 min read" },
  { name: "author", label: "Author Name", placeholder: "Finovia Editorial Team" },
  { name: "excerpt", label: "Short Summary / Excerpt", type: "textarea", required: true, placeholder: "A brief summary of the blog post..." },
  { name: "content", label: "Full Article Content", type: "textarea", required: true, placeholder: "Write full blog article here..." },
];

export default function AdminBlog() {
  const navigate = useNavigate();

  return (
    <ResourceTable
      title="Blog & News"
      modelName="BlogPost"
      api={adminResourceApi.blog}
      columns={columns}
      formFields={blogFormFields}
      emptyLabel="posts"
      onEdit={(post) => {
        const id = post._id || post.id;
        navigate(`/admin/blog/${id}/edit`);
      }}
      onBulkNavigate={() => navigate("/admin/bulk-json-pipeline?model=BlogPost")}
    />
  );
}

