import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "readTime", label: "Read time" },
];
const formFields = [
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Category", required: true, placeholder: "e.g. Credit Cards" },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Full content", type: "textarea" },
  { name: "readTime", label: "Read time", placeholder: "e.g. 6 min read" },
  { name: "author", label: "Author", placeholder: "Finovia Team" },
];

export default function AdminBlog() {
  return <ResourceTable title="Blog & News" api={adminResourceApi.blog} columns={columns} formFields={formFields} emptyLabel="posts" />;
}
