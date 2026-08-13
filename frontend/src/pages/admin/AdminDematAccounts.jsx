import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Broker" }, { key: "brokerage", label: "Brokerage" },
  { key: "amc", label: "AMC" }, { key: "rating", label: "Rating" },
];
const formFields = [
  { name: "name", label: "Broker name", required: true },
  { name: "brokerage", label: "Brokerage", required: true, placeholder: "e.g. ₹20 flat / order" },
  { name: "amc", label: "AMC (₹/year)" },
  { name: "opening", label: "Account opening fee", placeholder: "Free" },
  { name: "rating", label: "Rating (0-5)", type: "number" },
  { name: "features", label: "Features", type: "tags", placeholder: "Kite trading app, Free equity investing" },
];

export default function AdminDematAccounts() {
  return <ResourceTable title="Demat Accounts" api={adminResourceApi.dematAccounts} columns={columns} formFields={formFields} emptyLabel="broker accounts" />;
}
