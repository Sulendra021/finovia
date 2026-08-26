import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Seo from "../../components/Seo.jsx";
import { creditCardsApi, adminResourceApi } from "../../services/api.js";

const formFields = [
  { name: "name", label: "Card name", required: true },
  { name: "bank", label: "Bank", required: true },
  { name: "categories", label: "Categories (Select Multiple)", type: "multiselect", options: ["Cashback", "Travel", "Rewards", "Premium", "Fuel", "Shopping", "Luxe"] },
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

export default function EditCreditCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    setNotFound(false);

    creditCardsApi
      .getOne(id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          return;
        }
        const filled = {};
        formFields.forEach((f) => {
          const val = data[f.name];
          if (f.name === "categories") {
            filled[f.name] = Array.isArray(data.categories) && data.categories.length > 0
              ? data.categories
              : (data.category ? [data.category] : []);
          } else {
            filled[f.name] = f.type === "tags" ? (Array.isArray(val) ? val.join(", ") : "") : val ?? "";
          }
        });
        if (!filled.category && Array.isArray(filled.categories) && filled.categories.length > 0) {
          filled.category = filled.categories[0];
        }
        setForm(filled);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err?.message || "Failed to load credit card details");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      formFields.forEach((f) => {
        if (f.type === "number") payload[f.name] = payload[f.name] === "" ? undefined : Number(payload[f.name]);
        if (f.type === "tags") payload[f.name] = String(payload[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
      });

      if (Array.isArray(payload.categories) && payload.categories.length > 0) {
        payload.category = payload.categories[0];
      }

      await adminResourceApi.creditCards.update(id, payload);
      navigate("/admin/credit-cards");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to save credit card");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
        <Seo title="Edit Credit Card | Admin" description="Edit Credit Card" />
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-12 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 flex items-center justify-center">
        <Seo title="Card Not Found | Admin" description="Credit Card Not Found" />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">
            Credit Card Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The credit card you are trying to edit does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/admin/credit-cards")}
            className="fin-focus inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Credit Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <Seo title="Edit Credit Card | Admin" description="Edit Credit Card Details" />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header & Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/credit-cards")}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Credit Cards
          </button>
        </div>

        <div>
          <h1 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Edit Credit Card
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update credit card details, fee structure, rewards, and external links
          </p>
        </div>

        {error && (
          <div className="text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Form Container Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((f) => (
                <div key={f.name} className={`space-y-1.5 ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {f.label} {f.required && <span className="text-rose-500">*</span>}
                  </label>

                  {f.type === "multiselect" ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {f.options.map((opt) => {
                        const selectedList = Array.isArray(form[f.name])
                          ? form[f.name]
                          : (form[f.name] ? [form[f.name]] : []);
                        const checked = selectedList.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${checked
                                ? "bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700 shadow-xs"
                                : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const current = Array.isArray(form[f.name]) ? [...form[f.name]] : (form[f.name] ? [form[f.name]] : []);
                                let updated;
                                if (e.target.checked) {
                                  updated = [...current, opt];
                                } else {
                                  updated = current.filter((c) => c !== opt);
                                }
                                onChange(f.name, updated);
                                if (updated.length > 0) {
                                  onChange("category", updated[0]);
                                }
                              }}
                              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  ) : f.type === "select" ? (
                    <select
                      value={form[f.name] || ""}
                      onChange={(e) => onChange(f.name, e.target.value)}
                      required={f.required}
                      className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
                    >
                      <option value="" disabled>
                        Select {f.label.toLowerCase()}
                      </option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      value={form[f.name] || ""}
                      onChange={(e) => onChange(f.name, e.target.value)}
                      required={f.required}
                      rows={4}
                      placeholder={f.placeholder}
                      className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      step={f.type === "number" ? "0.1" : undefined}
                      value={form[f.name] || ""}
                      onChange={(e) => onChange(f.name, e.target.value)}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
                    />
                  )}

                  {f.name === "imageUrl" && form.imageUrl && (
                    <div className="mt-2 flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                      <img
                        src={form.imageUrl}
                        alt={form.imageAlt || form.name || "Preview"}
                        className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200 dark:border-slate-700 shadow-sm"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Image Preview</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{form.imageUrl}</p>
                      </div>
                    </div>
                  )}

                  {f.type === "tags" && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Separate features with commas</p>
                  )}
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/credit-cards")}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
