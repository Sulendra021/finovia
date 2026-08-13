import React, { useState } from "react";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import { EmiCalculator, SipCalculator, FdCalculator } from "../components/calculators.jsx";
import Seo from "../components/Seo.jsx";

const TABS = [
  { key: "emi", label: "EMI", icon: Calculator, component: EmiCalculator },
  { key: "sip", label: "SIP / Investment", icon: TrendingUp, component: SipCalculator },
  { key: "fd", label: "Fixed Deposit", icon: PiggyBank, component: FdCalculator },
];

export default function CalculatorsPage() {
  const [tab, setTab] = useState("emi");
  const Active = TABS.find((t) => t.key === tab).component;

  return (
    <PageShell>
      <Seo title="Financial Calculators" description="Free EMI, SIP and Fixed Deposit calculators to plan loans and investments." />
      <PageHero eyebrow="Calculators" title="Do the math before you decide" subtitle="Estimate loan EMIs, SIP returns, and fixed deposit maturity values in seconds." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`fin-focus flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === t.key ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
        <Active />
      </div>
    </PageShell>
  );
}
