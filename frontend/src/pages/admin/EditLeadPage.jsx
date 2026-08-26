import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, AlertCircle, FileText, User, Mail, Phone, Calendar, IndianRupee, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../../components/Seo.jsx";
import { applicationsApi } from "../../services/api.js";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "redirected", label: "Redirected" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function EditLeadPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    status: "redirected",
    commissionEarned: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    applicationsApi
      .getOne(id)
      .then((data) => {
        setLead(data);
        setForm({
          applicantName: data.applicantName || "",
          applicantEmail: data.applicantEmail || "",
          applicantPhone: data.applicantPhone || "",
          status: data.status || "redirected",
          commissionEarned: data.commissionEarned || 0,
        });
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch lead details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await applicationsApi.update(id, form);
      toast.success("Lead details updated successfully!");
      navigate("/admin/leads");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update lead.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
        <Seo title="Edit Lead Details | Admin" description="Edit Lead Details" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 flex items-center justify-center">
        <Seo title="Lead Not Found | Admin" description="Lead Not Found" />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">Lead Application Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate("/admin/leads")}
            className="fin-focus inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Customer Leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <Seo title={`Edit Lead - ${form.applicantName} | Admin`} description="Edit customer lead application" />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/leads")}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Leads
          </button>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" /> Customer Lead Edit Page
          </span>
          <h1 className="fin-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Edit Applicant Details
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Modify applicant contact info, update conversion status, and log earned revenue.
          </p>
        </div>

        {error && (
          <div className="text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Info card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product Name</span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              {lead?.productDetails?.name || lead?.productType}
            </p>
            {lead?.productDetails?.internalUrl && (
              <a
                href={lead.productDetails.internalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-0.5"
              >
                <span>View Product Page</span> <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category & ID</span>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{lead?.productType}</p>
            <p className="text-xs font-mono text-slate-500">{lead?.productId}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant Contact Info</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={form.applicantName}
                      onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                      className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={form.applicantEmail}
                      onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                      className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={form.applicantPhone}
                      onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                      className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Application Status & Commission</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Application Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="fin-focus w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Commission Earned (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={form.commissionEarned}
                      onChange={(e) => setForm({ ...form, commissionEarned: e.target.value })}
                      className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/leads")}
                className="fin-focus px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="fin-focus flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Lead Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
