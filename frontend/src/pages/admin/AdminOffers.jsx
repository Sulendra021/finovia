import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "title", label: "Offer" }, { key: "bank", label: "Bank" },
  { key: "category", label: "Category" }, { key: "expiry", label: "Expires" },
];
const formFields = [
  { name: "title", label: "Offer title", required: true },
  { name: "bank", label: "Bank / partner", required: true },
  { name: "category", label: "Category", required: true, placeholder: "e.g. Cashback, Loans" },
  { name: "expiry", label: "Expiry", required: true, placeholder: "e.g. 31 Aug 2026 or Ongoing" },
  { name: "color", label: "Badge color", type: "select", options: ["blue", "emerald", "amber", "rose", "violet"] },
];

export default function AdminOffers() {
  return <ResourceTable title="Offers & Banners" api={adminResourceApi.offers} columns={columns} formFields={formFields} emptyLabel="offers" />;
}
