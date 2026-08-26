import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function ExecutiveSubscriptionSection({ navigate }) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center text-white shadow-2xl">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Finovia Executive Program</span>
          </div>

          <h2 className="fin-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Join The Finovia <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Executive Circle</span>
          </h2>

          <p className="text-slate-300 mt-3 text-xs sm:text-base leading-relaxed">
            Unlock exclusive rewards. Build opportunities. Grow with Finovia.
            <br />

Join the Executive Program and get access to exclusive benefits, dedicated support & rewarding opportunities.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth?mode=register&redirect=payment")}
              className="fin-focus fin-button-interactive w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
            >
              <span>Register & Join Subscription</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/auth?mode=login&redirect=payment")}
              className="fin-focus w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              Already Member? Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
