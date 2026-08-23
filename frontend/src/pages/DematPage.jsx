import React from "react";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { PageShell, PageHero, RatingStars } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { dematAccountsApi } from "../services/api.js";

export default function DematPage() {
  const { data: brokers } = useLiveData(dematAccountsApi.getAll, []);
  return (
    <PageShell>
      <Seo title="Demat Accounts" description="Compare brokerage, AMC and features across India's top discount and full-service stock brokers." />
      <PageHero eyebrow="Demat Accounts" title="Start investing with the right broker" subtitle="Compare brokerage, annual maintenance charges and platform features across India's top discount and full-service brokers." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            <span className="col-span-2">Broker</span>
            <span>Brokerage</span>
            <span>AMC / year</span>
            <span>Rating</span>
            <span className="text-right">Action</span>
          </div>
          {brokers.map((d, i) => (
            <div key={d.id || d._id} className={`grid md:grid-cols-6 gap-4 px-6 py-5 items-center ${i !== 0 ? "border-t border-slate-100 dark:border-slate-800" : ""}`}>
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="fin-display font-semibold text-sm text-slate-900 dark:text-white">{d.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{(d.features || []).join(" • ")}</p>
                </div>
              </div>
              <span className="fin-num text-xs text-slate-700 dark:text-slate-200">{d.brokerage}</span>
              <span className="fin-num text-xs text-slate-700 dark:text-slate-200">₹{d.amc}</span>
              <RatingStars rating={d.rating} />
              <div className="text-left md:text-right">
                <button className="fin-focus text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">Open Free</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
