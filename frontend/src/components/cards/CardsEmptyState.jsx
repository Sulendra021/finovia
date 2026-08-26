import React from "react";
import { CreditCard as CardIcon } from "lucide-react";

export function CardsEmptyState({ resetFilters }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto">
        <CardIcon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">
          No credit cards found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          We couldn't find any credit cards matching your search criteria or selected filters.
        </p>
      </div>
      <button
        onClick={resetFilters}
        className="fin-focus px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}
