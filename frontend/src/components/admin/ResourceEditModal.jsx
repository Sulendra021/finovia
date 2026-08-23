import React, { useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

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
  if (!isOpen) return null;

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
          className="w-screen max-w-md sm:max-w-lg h-screen max-h-screen bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out animate-slideInRight"
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
            <button
              onClick={onClose}
              className="fin-focus text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Form Content Body with vertical scrollbar */}
          <div className="flex-1 overflow-y-auto fin-scrollbar-y p-6 space-y-4 min-h-0">
            <form id="resource-edit-form" onSubmit={onSubmit} className="space-y-4">
              {formFields.map((f) => (
                <div key={f.name} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {f.label} {f.required && <span className="text-rose-500">*</span>}
                  </label>
                  {f.type === "select" ? (
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
                      rows={3}
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
                  {f.type === "tags" && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Separate features with commas</p>
                  )}
                </div>
              ))}
            </form>
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
