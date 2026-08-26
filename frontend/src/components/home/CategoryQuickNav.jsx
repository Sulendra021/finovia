import React from "react";
import { ChevronRight } from "lucide-react";
import { SectionEyebrow } from "../shared.jsx";
import { NAV } from "../../data/mockData.js";

export function CategoryQuickNav({ navigate }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <SectionEyebrow>Categories</SectionEyebrow>
          <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight">
            Service Provided By <span className="text-blue-600 dark:text-blue-400">Finovia</span>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {NAV.slice(0, 5).map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
            className="fin-focus fin-card-interactive group relative bg-white dark:bg-slate-900 border border-blue-500/30 dark:border-blue-500/30 rounded-3xl p-6 flex flex-col items-center gap-5 shadow-xl shadow-blue-500/10 overflow-hidden"
          >
            {/* Permanent gradient ambient glow on card */}
            <div className="pointer-events-none absolute -top-14 -right-14 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl scale-125" />

            {/* Icon Wrapper (Steady - no rotation or scaling) */}
            <div className="w-20 h-20 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-lg opacity-100" />
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="w-20 h-20 object-contain drop-shadow-xl"
                />
              ) : (
                <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div className="text-center relative z-10">
              <span className="text-base font-bold text-blue-600 dark:text-blue-400 block">
                {item.label}
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 mt-1">
                Compare & Apply <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
