import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Name" }, { key: "bank", label: "Bank" },
  { key: "type", label: "Type" }, { key: "interest", label: "Interest %" }, { key: "minBalance", label: "Min Balance" },
];
const formFields = [
  { name: "name", label: "Account name", required: true },
  { name: "bank", label: "Bank", required: true },
  { name: "type", label: "Type", type: "select", options: ["Savings", "Current", "Salary", "Zero Balance"], required: true },
  { name: "interest", label: "Interest rate (% p.a.)" },
  { name: "minBalance", label: "Minimum balance" },
  { name: "features", label: "Features", type: "tags", placeholder: "Free debit card, UPI enabled" },
];

export default function AdminBankAccounts() {
  return <ResourceTable title="Bank Accounts" api={adminResourceApi.bankAccounts} columns={columns} formFields={formFields} emptyLabel="accounts" />;
}
