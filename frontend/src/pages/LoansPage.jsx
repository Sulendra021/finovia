import React from "react";
import { Wallet } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import { EmiCalculator } from "../components/calculators.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { loansApi } from "../services/api.js";
import { LOANS } from "../data/mockData.js";

export default function LoansPage() {
  const { data: loans } = useLiveData(loansApi.getAll, LOANS);
  return (
    <PageShell>
      <Seo title="Loans" description="Compare personal, home, car, business and education loan rates, and estimate your EMI." />
      <PageHero eyebrow="Loans" title="Borrow smart, at the right rate" subtitle="From a quick personal loan to a 30-year home loan — compare rates and estimate your EMI before you apply." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loans.map((l) => {
            const Icon = l.icon || Wallet;
            return (
            <div key={l.id || l._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="fin-display font-semibold text-slate-900 dark:text-white">{l.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{l.desc}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400 dark:text-slate-500">Interest rate</span><span className="fin-num font-semibold text-emerald-600">{l.rate}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-400 dark:text-slate-500">Loan amount</span><span className="fin-num font-semibold text-slate-800 dark:text-slate-100">₹{l.amount}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-400 dark:text-slate-500">Tenure</span><span className="fin-num font-semibold text-slate-800 dark:text-slate-100">{l.tenure}</span></div>
              </div>
              <button className="fin-focus w-full mt-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg">Check Eligibility</button>
            </div>
            );
          })}
        </div>
        <EmiCalculator />
      </div>
    </PageShell>
  );
}
