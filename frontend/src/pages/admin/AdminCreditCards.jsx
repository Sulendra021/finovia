import React from "react";
import { useNavigate } from "react-router-dom";
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
  { name: "tags", label: "Features / Tags", type: "tags", placeholder: "Airport Lounge, Golf Access" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Only for Existing HDFC Credit Card Users..." },
  { name: "applyUrl", label: "Apply URL", placeholder: "https://..." },
  { name: "buttonText", label: "Button Text", placeholder: "e.g. APPLY NOW" },
  { name: "imageUrl", label: "Image URL", placeholder: "https://..." },
  { name: "imageAlt", label: "Image Alt Text", placeholder: "e.g. UPI" },
];

export default function AdminCreditCards() {
  const navigate = useNavigate();

  return (
    <ResourceTable
      title="Credit Cards"
      modelName="creditCard"
      api={adminResourceApi.creditCards}
      columns={columns}
      formFields={formFields}
      emptyLabel="credit cards"
      onEdit={(card) => {
        const id = card._id || card.id;
        navigate(`/admin/credit-cards/${id}/edit`);
      }}
      onBulkNavigate={() => navigate("/admin/bulk-json-pipeline?model=creditCard")}
    />
  );
}

