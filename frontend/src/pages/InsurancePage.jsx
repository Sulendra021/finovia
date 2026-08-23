import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { insuranceApi } from "../services/api.js";
import { Shield, ShieldAlert, CheckCircle2, HeartPulse, Car, Home as HomeIcon } from "lucide-react";

export default function InsurancePage() {
  const { data: plans } = useLiveData(insuranceApi.getAll, []);
  return (
    <PageShell>
      <Seo title="Insurance" description="Compare health, term life, motor and travel insurance plans by premium, coverage and claim settlement ratio." />
      <PageHero eyebrow="Insurance" title="Protection plans that fit real life" subtitle="Health, life, motor and travel cover from insurers with strong claim settlement track records." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 gap-5">
        {plans.map((p) => {
          const Icon = p.icon || ShieldCheck;
          return (
          <div key={p.id || p._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex gap-5 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="fin-display font-semibold text-slate-900 dark:text-white">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.provider}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Starting premium</p>
                  <p className="fin-num text-xs font-semibold text-slate-900 dark:text-white">₹{p.premium}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Coverage</p>
                  <p className="fin-num text-xs font-semibold text-slate-900 dark:text-white">{p.coverage}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Claim ratio</p>
                  <p className="fin-num text-xs font-semibold text-emerald-600">{p.claimRatio}</p>
                </div>
              </div>
              <button className="fin-focus mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Get a quote <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </PageShell>
  );
}
