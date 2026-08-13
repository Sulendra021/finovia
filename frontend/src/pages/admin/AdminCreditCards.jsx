import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Name" }, { key: "bank", label: "Bank" },
  { key: "category", label: "Category" }, { key: "annualFee", label: "Annual Fee" }, { key: "rating", label: "Rating" },
];
const formFields = [
  { name: "name", label: "Card name", required: true },
  { name: "bank", label: "Bank", required: true },
  { name: "category", label: "Category", type: "select", options: ["Cashback", "Travel", "Rewards", "Premium"], required: true },
  { name: "joiningFee", label: "Joining fee", placeholder: "e.g. 1,000 or Free" },
  { name: "annualFee", label: "Annual fee", placeholder: "e.g. 1,000 or Free" },
  { name: "rewardRate", label: "Reward rate", placeholder: "e.g. 1-5%" },
  { name: "cashback", label: "Cashback highlight", placeholder: "e.g. 5% Online" },
  { name: "rating", label: "Rating (0-5)", type: "number" },
  { name: "tags", label: "Tags", type: "tags", placeholder: "Airport Lounge, Golf Access" },
];

export default function AdminCreditCards() {
  return <ResourceTable title="Credit Cards" api={adminResourceApi.creditCards} columns={columns} formFields={formFields} emptyLabel="credit cards" />;
}
