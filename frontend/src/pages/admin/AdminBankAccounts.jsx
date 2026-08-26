import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Name" }, { key: "bank", label: "Bank" },
  { key: "type", label: "Type" }, { key: "interest", label: "Interest %" }, { key: "minBalance", label: "Min Balance" },
];
export const bankAccountFormFields = [
  { name: "name", label: "Account name", required: true },
  { name: "bank", label: "Bank", required: true },
  { name: "imageUrl", label: "Logo Image URL", placeholder: "https://example.com/bank-logo.png" },
  { name: "imageAlt", label: "Logo Alt Text", placeholder: "SBI Logo" },
  { name: "type", label: "Type", type: "select", options: ["Savings", "Current", "Salary", "Zero Balance"], required: true },
  { name: "interest", label: "Interest rate (% p.a.)" },
  { name: "minBalance", label: "Minimum balance" },
  { name: "features", label: "Features", type: "tags", placeholder: "Free debit card, UPI enabled" },
];

export default function AdminBankAccounts() {
  const navigate = useNavigate();

  return (
    <ResourceTable
      title="Bank Accounts"
      modelName="BankAccount"
      api={adminResourceApi.bankAccounts}
      columns={columns}
      formFields={bankAccountFormFields}
      emptyLabel="accounts"
      onEdit={(acc) => {
        const id = acc._id || acc.id;
        navigate(`/admin/bank-accounts/${id}/edit`);
      }}
      onBulkNavigate={() => navigate("/admin/bulk-json-pipeline?model=BankAccount")}
    />
  );
}

