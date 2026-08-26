import React from "react";
import { Check, PiggyBank, Sparkles } from "lucide-react";

export function BankAccountTile({ account, onOpenAccount }) {
  const rewardTag = account.rewardTag || account.payoutTag || "Earn Upto ₹500";

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm">
      {/* Earn Upto ₹500 Discount Tag Overlay */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs border border-emerald-400/30 tracking-tight">
          <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
          {rewardTag}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {account.imageUrl ? (
              <img
                src={account.imageUrl}
                alt={account.imageAlt || account.bank || "Bank logo"}
                className="w-10 h-10 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 shrink-0 shadow-xs"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm shrink-0 shadow-xs">
                {account.bank?.[0] || "B"}
              </div>
            )}
            <div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {account.bank || "Partner Bank"}
              </span>
              <h3 className="fin-display font-semibold text-slate-900 dark:text-white text-base leading-tight mt-0.5">
                {account.name}
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
            {account.type || "Savings"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Interest Rate</span>
            <span className="fin-display text-base font-bold text-emerald-600 dark:text-emerald-400">{account.interest}% p.a.</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide block">Min Balance</span>
            <span className="fin-display text-sm font-semibold text-slate-800 dark:text-slate-200">{account.minBalance}</span>
          </div>
        </div>

        {account.features && account.features.length > 0 && (
          <ul className="space-y-2">
            {account.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <PiggyBank className="w-4 h-4 text-blue-500" />
          <span>Zero Paperwork</span>
        </div>
        <button
          onClick={() => onOpenAccount(account)}
          className="fin-focus px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          Open Account
        </button>
      </div>
    </div>
  );
}
