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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((d) => (
            <div
              key={d.id || d._id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {d.imageUrl || d.image ? (
                      <img
                        src={d.imageUrl || d.image}
                        alt={d.imageAlt || d.name}
                        loading="lazy"
                        className="w-12 h-12 rounded-xl object-contain bg-slate-50 dark:bg-slate-800 p-1.5 border border-slate-100 dark:border-slate-800 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shrink-0 border border-blue-100 dark:border-blue-900/40">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {d.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{d.brokerType || "Discount Broker"}</p>
                    </div>
                  </div>
                  <RatingStars rating={d.rating} />
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 mb-4">
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Brokerage</p>
                    <p className="fin-num text-xs font-bold text-slate-900 dark:text-slate-200 mt-0.5">{d.brokerage || "₹0 Delivery"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">AMC / Year</p>
                    <p className="fin-num text-xs font-bold text-slate-900 dark:text-slate-200 mt-0.5">
                      {typeof d.amc === "number" ? `₹${d.amc}` : d.amc || "Free"}
                    </p>
                  </div>
                </div>

                {Array.isArray(d.features) && d.features.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Key Highlights</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-[11px] border border-blue-100 dark:border-blue-900/40"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                <a
                  href={d.applyUrl || "#"}
                  target={d.applyUrl ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="fin-button-interactive w-full text-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 transition-all"
                >
                  Open Free Account
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
