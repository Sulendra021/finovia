import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "title", label: "Offer" }, { key: "bank", label: "Bank" },
  { key: "category", label: "Category" }, { key: "expiry", label: "Expires" },
];
export const offerFormFields = [
  { name: "title", label: "Offer title", required: true },
  { name: "bank", label: "Bank / partner", required: true },
  { name: "category", label: "Category", required: true, placeholder: "e.g. Cashback, Loans" },
  { name: "expiry", label: "Expiry", required: true, placeholder: "e.g. 31 Aug 2026 or Ongoing" },
  { name: "color", label: "Badge color", type: "select", options: ["blue", "emerald", "amber", "rose", "violet"] },
];

export default function AdminOffers() {
  const navigate = useNavigate();

  return (
    <ResourceTable
      title="Offers & Banners"
      modelName="Offer"
      api={adminResourceApi.offers}
      columns={columns}
      formFields={offerFormFields}
      emptyLabel="offers"
      onEdit={(offer) => {
        const id = offer._id || offer.id;
        navigate(`/admin/offers/${id}/edit`);
      }}
      onBulkNavigate={() => navigate("/admin/bulk-json-pipeline?model=Offer")}
    />
  );
}

