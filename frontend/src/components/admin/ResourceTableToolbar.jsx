import React from "react";
import { Sparkles, FileCode, Plus, Search, Filter, RotateCcw } from "lucide-react";

export function TableHeaderBanner({ title, count, emptyLabel, onOpenBulk, onOpenCreate }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-white mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Management Console
        </span>
        <h2 className="fin-display text-2xl font-extrabold flex items-center gap-2">
          {title}
          <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
            {count} Total
          </span>
        </h2>
        <p className="text-blue-100 text-xs sm:text-sm mt-1">Create, update, filter and bulk import {emptyLabel}.</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenBulk}
          className="fin-focus shrink-0 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <FileCode className="w-4 h-4" /> Bulk JSON Pipeline
        </button>
        <button
          onClick={onOpenCreate}
          className="fin-focus shrink-0 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-blue-700 bg-white hover:bg-blue-50 px-5 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add {title.slice(0, -1)}
        </button>
      </div>
    </div>
  );
}

export function TableFilterBar({
  search,
  setSearch,
  emptyLabel,
  filteredCount,
  totalCount,
  hasBankField,
  selectedBank,
  setSelectedBank,
  uniqueBanks,
  hasCategoryField,
  selectedCategory,
  setSelectedCategory,
  uniqueCategories,
  hasRatingField,
  minRating,
  setMinRating,
  hasFeeField,
  maxFee,
  setMaxFee,
  hasActiveFilters,
  resetFilters,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${emptyLabel} by name, features...`}
            className="fin-focus w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Filter className="w-3.5 h-3.5 text-blue-600" /> Showing {filteredCount} of {totalCount} records
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {hasBankField && (
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="fin-focus text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
          >
            <option value="">All Banks</option>
            {uniqueBanks.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}

        {hasCategoryField && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="fin-focus text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        {hasRatingField && (
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="fin-focus text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
          >
            <option value="">Any Rating</option>
            <option value="4.5">★ 4.5 & above</option>
            <option value="4.0">★ 4.0 & above</option>
            <option value="3.5">★ 3.5 & above</option>
          </select>
        )}

        {hasFeeField && (
          <select
            value={maxFee}
            onChange={(e) => setMaxFee(e.target.value)}
            className="fin-focus text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
          >
            <option value="">Any Fee</option>
            <option value="free">Free / No Fee</option>
            <option value="1000">Under ₹1,000</option>
            <option value="3000">Under ₹3,000</option>
          </select>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end pt-1">
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <RotateCcw className="w-3 h-3" /> Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
