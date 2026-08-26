import React from "react";
import { Search, Check } from "lucide-react";
import { SectionEyebrow, MiniCardVisual } from "../shared.jsx";

export function HeroSection({ query, setQuery, handleSearch }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      {/* Background ambient subtle visual glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-12 -right-20 w-[400px] h-[250px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <SectionEyebrow>#1 Financial Marketplace in India</SectionEyebrow>
          <h1 className="fin-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-5 leading-[1.1] tracking-tight">
            Find the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">financial products</span>, all in one place
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-5 text-[15px] leading-relaxed max-w-lg">
            Compare credit cards, bank accounts, loans and insurance from 50+ trusted partners, then apply in minutes - no paperwork chase, no guesswork.
          </p>
          <form onSubmit={handleSearch} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-lg">
            <div className="relative flex-1 group">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-600 transition-colors" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cards, accounts, loans & more"
                className="fin-focus w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
              />
            </div>
            <button type="submit" className="fin-focus fin-button-interactive px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/30">
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            {["Instant Approval", "Secure & Trusted", "Best Offers"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-80 hidden sm:block">
          <MiniCardVisual rot={-8} top="1rem" left="2rem" from="from-slate-900 via-slate-800 to-black" z={20} />
          <MiniCardVisual rot={7} top="6rem" left="9rem" from="from-blue-700 via-blue-600 to-blue-800" z={10} label="CASHBACK" />
          <div className="fin-float absolute top-2 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl px-4 py-3 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:scale-105" style={{ "--rot": "0deg" }}>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">BEST OFFER</p>
            <p className="fin-display text-2xl font-bold text-emerald-600 dark:text-emerald-400 leading-none mt-1">5%<span className="text-xs align-top ml-0.5">Cashback</span></p>
          </div>
          <div className="fin-float absolute bottom-0 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl px-4 py-3 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:scale-105" style={{ "--rot": "0deg" }}>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">You saved</p>
            <p className="fin-num text-lg font-bold text-slate-900 dark:text-white leading-none mt-1">₹25,430</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">this month</p>
          </div>
        </div>
      </div>
    </section>
  );
}
