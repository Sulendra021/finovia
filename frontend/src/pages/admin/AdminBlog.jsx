import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "readTime", label: "Read time" },
];
export const blogFormFields = [
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Category", required: true, placeholder: "e.g. Credit Cards" },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Full content", type: "textarea" },
  { name: "readTime", label: "Read time", placeholder: "e.g. 6 min read" },
  { name: "author", label: "Author", placeholder: "Finovia Team" },
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

