import React from "react";
import { Clock } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { offersApi } from "../services/api.js";
import { COLOR_MAP } from "../data/mockData.js";
import { Tag, Sparkles, Gift } from "lucide-react";

export default function OffersPage() {
  const { data: offers } = useLiveData(offersApi.getAll, []);
  
  const defaultColor = {
    bg: "bg-blue-50 dark:bg-blue-950/60",
    text: "text-blue-700 dark:text-blue-400",
    ring: "ring-blue-200 dark:ring-blue-800",
    dot: "bg-blue-500",
  };

  return (
    <PageShell>
      <Seo title="Offers & Deals" description="Live cashback boosts, fee waivers and limited-time rates from Finovia's banking partners." />
      <PageHero eyebrow="Offers & Deals" tone="amber" title="Live deals, updated weekly" subtitle="Cashback boosts, fee waivers and limited-time rates from Finovia's banking partners." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((o) => {
          const c = (o.color && COLOR_MAP[o.color]) || defaultColor;
          return (
            <div key={o.id || o._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ring-1 ${c.bg} ${c.text} ${c.ring}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} /> {o.category}
              </span>
              <h3 className="fin-display font-semibold text-slate-900 dark:text-white mt-3 leading-snug">{o.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{o.bank}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500"><Clock className="w-3.5 h-3.5" /> Ends {o.expiry}</span>
                <button className="fin-focus text-xs font-semibold text-blue-600 hover:text-blue-700">Claim →</button>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
