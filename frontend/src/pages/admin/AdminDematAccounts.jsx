import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Broker" },
  { key: "brokerage", label: "Brokerage" },
  { key: "amc", label: "AMC" },
  { key: "rating", label: "Rating" },
];

export const dematAccountFormFields = [
  { name: "name", label: "Broker name", required: true },
  { name: "imageUrl", label: "Logo Image URL", placeholder: "https://example.com/logo.png" },
  { name: "imageAlt", label: "Logo Alt Text", placeholder: "Zerodha Logo" },
  { name: "brokerage", label: "Brokerage", required: true, placeholder: "e.g. ₹20 flat / order" },
  { name: "amc", label: "AMC (₹/year)" },
  { name: "opening", label: "Account opening fee", placeholder: "Free" },
  { name: "rating", label: "Rating (0-5)", type: "number" },
  { name: "features", label: "Features", type: "tags", placeholder: "Kite trading app, Free equity investing" },
];

export default function AdminDematAccounts() {
  const navigate = useNavigate();

  return (
    <ResourceTable
      title="Demat Accounts"
      modelName="DematAccount"
      api={adminResourceApi.dematAccounts}
      columns={columns}
      formFields={dematAccountFormFields}
      emptyLabel="broker accounts"
      onEdit={(acc) => {
        const id = acc._id || acc.id;
        navigate(`/admin/demat-accounts/${id}/edit`);
      }}
      onBulkNavigate={() => navigate("/admin/bulk-json-pipeline?model=DematAccount")}
    />
  );
}

