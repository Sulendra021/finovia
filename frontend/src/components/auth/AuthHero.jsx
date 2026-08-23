import React from "react";
import { ArrowLeft, CheckCircle2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../shared.jsx";

export function AuthHero() {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-6 space-y-6">
      <button
        onClick={() => navigate("/")}
        className="fin-focus inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-3.5 py-1.5 rounded-full transition-all shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Finovia
      </button>

      <div>
        <Logo size="md" />
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold fin-display leading-tight text-slate-900 dark:text-white">
        Empowering Your <span className="text-blue-600">Financial</span> Decisions
      </h1>
      
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
        Compare top-rated credit cards, zero-balance savings accounts, demat brokers, and low-interest loans in real time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Unbiased Ratings</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Transparent reward structures and fee breakdowns.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Lead Tracking</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Track your submitted applications and approval statuses.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex -space-x-2">
          <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-blue-600 flex items-center justify-center font-bold text-xs text-white">AS</div>
          <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">RK</div>
          <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">PM</div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-xs font-bold">★★★★★</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">4.9 / 5</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Trusted by 50,000+ Indian applicants</p>
        </div>
      </div>
    </div>
  );
}
