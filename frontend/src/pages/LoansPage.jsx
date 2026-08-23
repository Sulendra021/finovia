import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Wallet, Calculator, CheckCircle2, Landmark, ArrowRight, ShieldCheck, Clock, Percent } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import { EmiCalculator } from "../components/calculators.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { loansApi, applicationsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoansPage() {
  const navigate = useNavigate();
  const { data: loans } = useLiveData(loansApi.getAll, []);
  const { user } = useAuth();

  const handleCheckEligibility = async (loan) => {
    if (!user) {
      toast.error("Please login first to check loan eligibility!");
      navigate("/auth");
      return;
    }
    try {
      await applicationsApi.create({
        productType: "Loan",
        productId: loan.id || loan._id,
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: "9999999999",
      });
    } catch (e) {
      // silent track
    }
    toast.success(`Eligibility check initiated for ${loan.name}!`);
  };

  return (
    <PageShell>
      <Seo title="Loans" description="Compare personal, home, car, business and education loan rates, and estimate your EMI." />
      <PageHero eyebrow="Loans" title="Borrow smart, at the right rate" subtitle="From a quick personal loan to a 30-year home loan - compare rates and estimate your EMI before you apply." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((l) => {
            const Icon = l.icon || Wallet;
            return (
              <div key={l.id || l._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="fin-display font-bold text-slate-900 dark:text-white text-base">{l.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{l.desc}</p>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 dark:text-slate-500 font-medium">Interest rate</span>
                      <span className="fin-num font-extrabold text-emerald-600 dark:text-emerald-400">{l.rate}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 dark:text-slate-500 font-medium">Loan amount</span>
                      <span className="fin-num font-bold text-slate-800 dark:text-slate-100">₹{l.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 dark:text-slate-500 font-medium">Tenure</span>
                      <span className="fin-num font-bold text-slate-800 dark:text-slate-100">{l.tenure}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckEligibility(l)}
                  className="fin-focus w-full mt-6 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 py-3 rounded-xl shadow-sm shadow-blue-600/30 hover:shadow-md transition-all"
                >
                  Check Eligibility
                </button>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive EMI Calculator */}
        <div id="emi-calculator-section" className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">Estimate Your Monthly Installment (EMI)</h2>
          </div>
          <EmiCalculator />
        </div>
      </div>
    </PageShell>
  );
}
