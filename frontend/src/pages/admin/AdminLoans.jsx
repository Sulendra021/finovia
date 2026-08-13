import React from "react";
import ResourceTable from "../../components/admin/ResourceTable.jsx";
import { adminResourceApi } from "../../services/api.js";

const columns = [
  { key: "name", label: "Loan type" }, { key: "rate", label: "Rate" },
  { key: "amount", label: "Amount range" }, { key: "tenure", label: "Tenure" },
];
const formFields = [
  { name: "name", label: "Loan type", required: true, placeholder: "e.g. Personal Loan" },
  { name: "rate", label: "Interest rate", required: true, placeholder: "e.g. 10.5% - 18%" },
  { name: "amount", label: "Amount range", required: true, placeholder: "e.g. 50,000 - 40,00,000" },
  { name: "tenure", label: "Tenure", required: true, placeholder: "e.g. 1 - 5 yrs" },
  { name: "processingFee", label: "Processing fee", placeholder: "e.g. Up to 2.5%" },
  { name: "desc", label: "Description", type: "textarea" },
];

export default function AdminLoans() {
  return <ResourceTable title="Loans" api={adminResourceApi.loans} columns={columns} formFields={formFields} emptyLabel="loan products" />;
}
