import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, Loader2, Sparkles, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import Seo from "../../components/Seo.jsx";
import { bulkDataApi } from "../../services/api.js";

const MODEL_OPTIONS = [
  { value: "creditCard", label: "Credit Cards" },
  { value: "BankAccount", label: "Bank Accounts" },
  { value: "DematAccount", label: "Demat Accounts" },
  { value: "Loan", label: "Loans" },
  { value: "Insurance", label: "Insurance Plans" },
  { value: "Offer", label: "Offers & Banners" },
  { value: "BlogPost", label: "Blog & News" },
];

const DEFAULT_JSON = {
  creditCard: '[\n  {\n    "name": "Sample Card",\n    "bank": "HDFC Bank",\n    "category": "Rewards"\n  }\n]',
  BankAccount: '[\n  {\n    "name": "Savings Plus",\n    "bank": "ICICI Bank",\n    "type": "Savings"\n  }\n]',
  DematAccount: '[\n  {\n    "name": "Zerodha Kite",\n    "brokerage": "₹20 flat / order",\n    "amc": "300"\n  }\n]',
  Loan: '[\n  {\n    "name": "Personal Loan",\n    "rate": "10.5% - 18%",\n    "amount": "50,000 - 40,00,000",\n    "tenure": "1 - 5 yrs"\n  }\n]',
  Insurance: '[\n  {\n    "name": "Health Protect",\n    "provider": "Star Health",\n    "premium": "499 / month"\n  }\n]',
  Offer: '[\n  {\n    "title": "10% Cashback",\n    "bank": "HDFC Bank",\n    "category": "Cashback",\n    "expiry": "31 Dec 2026"\n  }\n]',
  BlogPost: '[\n  {\n    "title": "Top Credit Cards 2026",\n    "category": "Credit Cards",\n    "excerpt": "Here are the top cards of 2026...",\n    "content": "Full article body here..."\n  }\n]',
};

export default function BulkJsonPipelinePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get("model") || "creditCard";

  const [model, setModel] = useState(initialModel);
  const [operation, setOperation] = useState("createMany");
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON[initialModel] || DEFAULT_JSON.creditCard);
  const [filterInput, setFilterInput] = useState("{}");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!searchParams.get("model")) {
      setJsonInput(DEFAULT_JSON[model] || DEFAULT_JSON.creditCard);
    }
  }, [model, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(null);

    let parsedData = null;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch (err) {
      setError("Invalid JSON input format. Please verify JSON syntax.");
      setSaving(false);
      return;
    }

    let parsedFilter = undefined;
    if (operation === "updateMany") {
      try {
        parsedFilter = JSON.parse(filterInput || "{}");
      } catch (err) {
        setError("Invalid filter JSON format for update operation.");
        setSaving(false);
        return;
      }
    }

    try {
      const res = await bulkDataApi.executePipeline(model, operation, parsedData, parsedFilter);
      setSuccess(res);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Bulk operation failed");
    } finally {
      setSaving(false);
    }
  };

  const getBackPath = () => {
    switch (model) {
      case "BankAccount":
        return "/admin/bank-accounts";
      case "DematAccount":
        return "/admin/demat-accounts";
      case "Loan":
        return "/admin/loans";
      case "Insurance":
        return "/admin/insurance";
      case "Offer":
        return "/admin/offers";
      case "BlogPost":
        return "/admin/blog";
      default:
        return "/admin/credit-cards";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <Seo title="Bulk JSON Pipeline | Admin" description="Execute Bulk Data Operations" />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(getBackPath())}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Console
          </button>
        </div>

        <div> 
          <h1 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Bulk JSON Pipeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Execute batch insert, update, or upsert operations directly against the database models.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Pipeline Execution Successful!
            </div>
            <pre className="text-[11px] font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60 text-slate-700 dark:text-slate-300 overflow-x-auto max-h-40">
              {JSON.stringify(success, null, 2)}
            </pre>
            <div className="flex justify-end">
              <button
                onClick={() => navigate(getBackPath())}
                className="fin-focus px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                Return to Resource List
              </button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Model
                </label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setJsonInput(DEFAULT_JSON[e.target.value] || "[]");
                  }}
                  className="fin-focus w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
                >
                  {MODEL_OPTIONS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label} ({m.value})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Operation
                </label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="fin-focus w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
                >
                  <option value="createMany">createMany (Batch Insert)</option>
                  <option value="upsertMany">upsertMany (Insert or Update)</option>
                  <option value="updateMany">updateMany (Batch Filtered Update)</option>
                </select>
              </div>
            </div>

            {operation === "updateMany" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Where Filter JSON
                </label>
                <textarea
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                  rows={2}
                  className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs font-mono text-slate-800 dark:text-slate-100"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  JSON Payload (Array of Objects)
                </label>
                <label className="fin-focus cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload .json Files (Multiple)
                  <input
                    type="file"
                    multiple
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (!files.length) return;

                      let combinedItems = [];
                      let readErrors = [];
                      let completed = 0;

                      files.forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const content = event.target?.result;
                            if (typeof content === "string") {
                              const parsed = JSON.parse(content);
                              if (Array.isArray(parsed)) {
                                combinedItems.push(...parsed);
                              } else if (typeof parsed === "object" && parsed !== null) {
                                combinedItems.push(parsed);
                              }
                            }
                          } catch (err) {
                            readErrors.push(file.name);
                          } finally {
                            completed += 1;
                            if (completed === files.length) {
                              if (readErrors.length > 0) {
                                setError(`Failed to parse ${readErrors.length} file(s): ${readErrors.join(", ")}`);
                              } else {
                                setError("");
                              }
                              setJsonInput(JSON.stringify(combinedItems, null, 2));
                            }
                          }
                        };
                        reader.readAsText(file);
                      });
                    }}
                  />
                </label>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={12}
                placeholder="Upload a JSON file or paste JSON array here..."
                className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs font-mono text-slate-800 dark:text-slate-100 leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(getBackPath())}
                className="fin-focus px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="fin-focus flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Execute Pipeline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
