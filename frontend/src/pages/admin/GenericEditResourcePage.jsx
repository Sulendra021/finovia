import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, AlertCircle, Eye, Clock, User, Sparkles } from "lucide-react";
import Seo from "../../components/Seo.jsx";
import { BlogCard } from "../../components/blog/BlogCard.jsx";

export default function GenericEditResourcePage({
  resourceName,
  listPath,
  fetchApi,
  updateApi,
  formFields,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState("card"); // "card" | "article"

  useEffect(() => {
    setLoading(true);
    setError("");
    setNotFound(false);

    fetchApi(id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          return;
        }
        const filled = {};
        formFields.forEach((f) => {
          const val = data[f.name];
          filled[f.name] = f.type === "tags" ? (Array.isArray(val) ? val.join(", ") : "") : val ?? "";
        });
        setForm(filled);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err?.message || `Failed to load ${resourceName.toLowerCase()} details`);
        }
      })
      .finally(() => setLoading(false));
  }, [id, fetchApi, resourceName, formFields]);

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

      await updateApi(id, payload);
      navigate(listPath);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || `Failed to save ${resourceName.toLowerCase()}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
        <Seo title={`Edit ${resourceName} | Admin`} description={`Edit ${resourceName}`} />
        <div className="max-w-7xl mx-auto space-y-6">
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
        <Seo title={`${resourceName} Not Found | Admin`} description={`${resourceName} Not Found`} />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">
            {resourceName} Not Found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The record you are trying to edit does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate(listPath)}
            className="fin-focus inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {resourceName}s
          </button>
        </div>
      </div>
    );
  }

  // Construct live preview post object
  const previewPost = {
    id: id || "preview-id",
    title: form.title || "Sample Blog Post Title",
    category: form.category || "General",
    excerpt: form.excerpt || "This is a live summary excerpt preview for this article...",
    content: form.content || "Full article body content will be rendered here...",
    readTime: form.readTime || "5 min read",
    author: form.author || "Finovia Editorial Team",
    imageUrl: form.imageUrl || "",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <Seo title={`Edit ${resourceName} | Admin`} description={`Edit ${resourceName} Details`} />

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(listPath)}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {resourceName}s
          </button>
        </div>

        <div>
          <h1 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Edit {resourceName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update details and review live preview in real time
          </p>
        </div>

        {error && (
          <div className="text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* 2-Column Grid Layout: Form on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((f) => (
                  <div key={f.name} className={`space-y-1.5 ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {f.label} {f.required && <span className="text-rose-500">*</span>}
                    </label>

                    {f.type === "select" ? (
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
                        rows={f.name === "content" ? 10 : 4}
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
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Image Thumbnail Preview</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{form.imageUrl}</p>
                        </div>
                      </div>
                    )}

                    {f.type === "tags" && (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Separate values with commas</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate(listPath)}
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

          {/* Right Live Preview Column */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Live Preview</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab("card")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activePreviewTab === "card"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Feed Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab("article")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activePreviewTab === "article"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Full Reader
                  </button>
                </div>
              </div>

              {activePreviewTab === "card" ? (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                    Card as shown on Blog Index
                  </p>
                  <BlogCard post={previewPost} />
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Reader View
                  </p>
                  
                  {previewPost.imageUrl && (
                    <img
                      src={previewPost.imageUrl}
                      alt={previewPost.title}
                      className="w-full h-44 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}

                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                      {previewPost.category}
                    </span>
                    <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {previewPost.title}
                    </h2>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="w-3 h-3 text-slate-400" /> {previewPost.author}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" /> {previewPost.readTime}
                      </span>
                    </div>
                  </div>

                  {previewPost.excerpt && (
                    <p className="text-xs italic text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border-l-2 border-blue-500">
                      "{previewPost.excerpt}"
                    </p>
                  )}

                  <div
                    className="prose dark:prose-invert max-w-none text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3"
                    dangerouslySetInnerHTML={{ __html: previewPost.content }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
