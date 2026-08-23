import React, { useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";

export function BulkJsonModal({
  isOpen,
  onClose,
  modelName,
  bulkOperation,
  setBulkOperation,
  bulkJson,
  setBulkJson,
  bulkSaving,
  bulkError,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex justify-end" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-lg h-screen fixed right-0 top-0 bottom-0 flex flex-col shadow-2xl border-l border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="fin-display text-xl font-bold text-slate-900 dark:text-white">
              Bulk JSON Pipeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Import multiple records at once using JSON array payload
            </p>
          </div>
          <button
            onClick={onClose}
            className="fin-focus text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form with Flex Layout */}
        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {bulkError && (
              <div className="text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-3.5">
                {bulkError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Model
              </label>
              <input
                value={modelName}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-mono font-bold text-slate-700 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Pipeline Operation
              </label>
              <select
                value={bulkOperation}
                onChange={(e) => setBulkOperation(e.target.value)}
                className="fin-focus w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100"
              >
                <option value="createMany">createMany (Batch Insert)</option>
                <option value="updateMany">updateMany (Batch Update)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  JSON Payload <span className="text-rose-500">*</span>
                </label>
                <label className="cursor-pointer text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Upload JSON
                  <input
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (typeof event.target?.result === "string") {
                          setBulkJson(event.target.result);
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>
              <textarea
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                rows={10}
                className="fin-focus w-full p-4 rounded-xl font-mono text-xs border border-slate-200 dark:border-slate-800 bg-slate-950 text-emerald-400 leading-relaxed shadow-inner"
                placeholder='[{"name": "Card Name", "bank": "HDFC Bank"}]'
              />
            </div>
          </div>

          {/* Locked Footer Bar */}
          <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="fin-focus px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={bulkSaving}
              className="fin-focus flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {bulkSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Execute Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



