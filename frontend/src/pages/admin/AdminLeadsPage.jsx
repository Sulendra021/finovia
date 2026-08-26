import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Search, Mail, Phone, Clock, Loader2, CheckCircle2, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import { applicationsApi } from "../../services/api.js";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", style: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" },
  { value: "redirected", label: "Redirected", style: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400" },
  { value: "approved", label: "Approved", style: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" },
  { value: "rejected", label: "Rejected", style: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400" },
];

export default function AdminLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    setLoading(true);
    applicationsApi
      .getAll()
      .then((data) => setLeads(data))
      .catch(() => toast.error("Failed to load customer leads."))
      .finally(() => setLoading(false));
  };

  const handleEditLead = (lead) => {
    const leadId = lead._id || lead.id;
    navigate(`/admin/leads/${leadId}/edit`);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchType = filterType === "All" || lead.productType === filterType;
    const q = search.toLowerCase().trim();
    const matchQuery =
      !q ||
      (lead.applicantName && lead.applicantName.toLowerCase().includes(q)) ||
      (lead.applicantEmail && lead.applicantEmail.toLowerCase().includes(q)) ||
      (lead.applicantPhone && lead.applicantPhone.includes(q)) ||
      (lead.productType && lead.productType.toLowerCase().includes(q));
    return matchType && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <UserCheck className="w-3.5 h-3.5" /> Lead Submissions
          </span>
          <h2 className="fin-display text-2xl font-extrabold text-slate-900 dark:text-white">Customer Leads</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click on any lead row to open dedicated full-page editor for updating user details and status.
          </p>
        </div>
        <div className="fin-num text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-4 py-2 rounded-xl">
          {leads.length} Total Leads
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "CreditCard", "BankAccount", "DematAccount", "Loan", "Insurance"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`fin-focus px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterType === t
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {t === "CreditCard" ? "Cards" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500">
          No customer lead submissions found.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-12 text-center whitespace-nowrap">Sr</th>
                  <th className="p-4 whitespace-nowrap">Applicant Details</th>
                  <th className="p-4 whitespace-nowrap">Mobile Number</th>
                  <th className="p-4 whitespace-nowrap">Applied Product</th>
                  <th className="p-4 whitespace-nowrap">Status</th>
                  <th className="p-4 whitespace-nowrap">Submitted At</th>
                  <th className="p-4 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredLeads.map((lead, index) => {
                  const statusObj = STATUS_OPTIONS.find((s) => s.value === (lead.status || "redirected")) || STATUS_OPTIONS[1];
                  return (
                    <tr
                      key={lead._id || lead.id}
                      onClick={() => handleEditLead(lead)}
                      className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                      <td className="p-4 text-center font-bold text-slate-400 whitespace-nowrap">{index + 1}</td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                            {lead.applicantName?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{lead.applicantName}</p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {lead.applicantEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-500" /> {lead.applicantPhone}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            {lead.productDetails?.name || lead.productType}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[10px]">
                              {lead.productType}
                            </span>
                            {lead.productDetails?.internalUrl && (
                              <a
                                href={lead.productDetails.internalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[11px] text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-0.5"
                              >
                                View Product &rarr;
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] capitalize ${statusObj.style}`}>
                          <CheckCircle2 className="w-3 h-3" /> {statusObj.label}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditLead(lead);
                          }}
                          className="fin-focus inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs font-semibold"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

