import React from "react";
import { Check, PiggyBank } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { bankAccountsApi } from "../services/api.js";
import { BANK_ACCOUNTS } from "../data/mockData.js";

export default function BankAccountsPage() {
  const { data: accounts } = useLiveData(bankAccountsApi.getAll, BANK_ACCOUNTS);
  return (
    <PageShell>
      <Seo title="Bank Accounts" description="Compare savings, salary, current and zero-balance bank accounts by interest rate and minimum balance." />
      <PageHero eyebrow="Bank Accounts" title="Open the right account, not just any account" subtitle="Compare interest rates, minimum balance requirements and features across savings, salary and current accounts." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((a) => {
          const Icon = a.icon || PiggyBank;
          return (
            <div key={a.id || a._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{a.type}</span>
              <h3 className="fin-display font-semibold text-slate-900 dark:text-white mt-1">{a.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.bank}</p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Interest p.a.</p>
                  <p className="fin-num text-sm font-semibold text-emerald-600">{a.interest}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Min. balance</p>
                  <p className="fin-num text-sm font-semibold text-slate-900 dark:text-white">₹{a.minBalance}</p>
                </div>
              </div>
              <ul className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                {(a.features || []).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {f}</li>
                ))}
              </ul>
              <button className="fin-focus w-full mt-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg">Open Account</button>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
