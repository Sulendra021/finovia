import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Plan" }, { key: "provider", label: "Provider" },
  { key: "premium", label: "Premium" }, { key: "claimRatio", label: "Claim ratio" },
];
const formFields = [
  { name: "name", label: "Plan name", required: true, placeholder: "e.g. Health Insurance" },
  { name: "provider", label: "Provider", required: true },
  { name: "premium", label: "Starting premium", required: true, placeholder: "e.g. 399 / month" },
  { name: "coverage", label: "Coverage", placeholder: "e.g. Up to ₹1 Cr" },
  { name: "claimRatio", label: "Claim settlement ratio", placeholder: "e.g. 98.5%" },
];

export default function AdminInsurance() {
  return <ResourceTable title="Insurance" api={adminResourceApi.insurance} columns={columns} formFields={formFields} emptyLabel="insurance plans" />;
}
