import React, { useState, useEffect } from "react";
import { X, Save, Loader2, Eye, Edit3, Clock, User } from "lucide-react";
import { BlogCard } from "../blog/BlogCard.jsx";

export function ResourceEditModal({
  isOpen,
  onClose,
  title,
  editing,
  formFields,
  form,
  onChange,
  onSubmit,
  saving,
}) {
  const [activeTab, setActiveTab] = useState("form"); // "form" | "preview"

  useEffect(() => {
    setActiveTab("form");
  }, [isOpen]);

  if (!isOpen) return null;

  const isBlog = title.toLowerCase().includes("blog") || form.excerpt !== undefined || form.content !== undefined;

  const previewPost = {
    id: editing?._id || editing?.id || "preview-id",
    title: form.title || "Sample Post Title",
    category: form.category || "General",
    excerpt: form.excerpt || "This is a summary excerpt preview...",
    content: form.content || "Full content will be displayed here...",
    readTime: form.readTime || "5 min read",
    author: form.author || "Finovia Team",
    imageUrl: form.imageUrl || "",
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dim Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Right Drawer Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-[101]">
        <div
          className="w-screen max-w-md sm:max-w-xl h-screen max-h-screen bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out animate-slideInRight"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
            <div>
              <h3 className="fin-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {editing ? "Edit" : "Add"} {title.endsWith("s") ? title.slice(0, -1) : title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {editing ? "Update details and save changes" : "Fill details to add a new record"}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {isBlog && (
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "form"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "preview"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="fin-focus text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Form Content Body */}
          <div className="flex-1 overflow-y-auto fin-scrollbar-y p-6 space-y-4 min-h-0">
            {activeTab === "preview" && isBlog ? (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Feed Card Preview
                  </p>
                  <BlogCard post={previewPost} />
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Reader Article Preview
                  </p>
                  
                  {previewPost.imageUrl && (
                    <img
                      src={previewPost.imageUrl}
                      alt={previewPost.title}
                      className="w-full h-40 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}

                  <div className="space-y-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                      {previewPost.category}
                    </span>
                    <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {previewPost.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
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
              </div>
            ) : (
              <form id="resource-edit-form" onSubmit={onSubmit} className="space-y-4">
                {formFields.map((f) => (
                  <div key={f.name} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                                checked
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
                                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
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
                        className="fin-focus w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100"
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
                        rows={f.name === "content" ? 8 : 3}
                        placeholder={f.placeholder}
                        className="fin-focus w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100"
                      />
                    ) : (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        step={f.type === "number" ? "0.1" : undefined}
                        value={form[f.name] || ""}
                        onChange={(e) => onChange(f.name, e.target.value)}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="fin-focus w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100"
                      />
                    )}
                    {f.name === "imageUrl" && form.imageUrl && (
                      <div className="mt-2 flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                        <img
                          src={form.imageUrl}
                          alt={form.imageAlt || form.name || "Preview"}
                          className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-200 dark:border-slate-700 shadow-sm"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Image Thumbnail Preview</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">{form.imageUrl}</p>
                        </div>
                      </div>
                    )}

                    {f.type === "tags" && (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Separate features with commas</p>
                    )}
                  </div>
                ))}
              </form>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="fin-focus px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="resource-edit-form"
              disabled={saving}
              className="fin-focus flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm shadow-blue-600/30 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editing ? "Update Record" : "Create Record"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
