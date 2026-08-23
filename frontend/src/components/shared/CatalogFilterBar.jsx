import React, { useState, useEffect } from "react";
import { Filter, Search, RotateCcw } from "lucide-react";

export function CatalogFilterBar({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  categories,
  bankFilter,
  setBankFilter,
  banksList,
  resetFilters,
  resultCount,
}) {
  const [searchInput, setSearchInput] = useState(searchQuery || "");

  useEffect(() => {
    setSearchInput(searchQuery || "");
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm mb-8 space-y-5">
      {/* Search and Secondary Filter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Form with Search Button */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by card name, bank, category, or features..."
              className="fin-focus w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="fin-focus inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </form>

        {/* Bank Dropdown & Reset Button */}
        <div className="flex items-center gap-3">
          {banksList && banksList.length > 1 && (
            <div className="relative">
              <select
                value={bankFilter}
                onChange={(e) => setBankFilter(e.target.value)}
                className="fin-focus appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pr-8 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {banksList.map((b) => (
                  <option key={b} value={b}>
                    {b === "All" ? "All Banks" : b}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {(filter !== "All" || bankFilter !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSearchInput("");
                resetFilters();
              }}
              className="fin-focus inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Result Counter */}
      {categories && categories.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`fin-focus px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap self-end sm:self-auto">
            Showing {resultCount} options
          </span>
        </div>
      )}
    </div>
  );
}
