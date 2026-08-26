import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Crown, ShieldCheck, Sparkles, Zap, Mail, Phone, ArrowRight, X, CheckCircle2, Users, TrendingUp, CreditCard, Landmark, LineChart, Banknote, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ExecutiveWorkModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto fin-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/60 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="fin-display text-lg font-extrabold text-slate-900 dark:text-white">
                What is the Work of a Finovia Executive?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Customer Service & Financial Assistance Program
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
            As a Finovia Executive, your primary work is to provide essential financial services and guidance to customers by assisting them with applications for top financial products.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
            5 Core Financial Services Provided to Customers
          </h4>

          {/* 5 Product Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CreditCard className="w-4 h-4 text-blue-500 shrink-0" />
                <span>1. Credit Cards</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Help customers select, apply for, and claim rewards on lifetime-free & premium credit cards.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Landmark className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>2. Bank Accounts</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Assist customers in opening digital savings, high-interest & zero-balance bank accounts.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <LineChart className="w-4 h-4 text-amber-500 shrink-0" />
                <span>3. Demat Accounts</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Guide customers to open stock trading & Demat accounts for mutual funds & investments.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Banknote className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>4. Loans</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Help customers apply for instant personal loans, business loans, and home loan approvals.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1 sm:col-span-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-purple-500 shrink-0" />
                <span>5. Insurance</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Assist customers in securing health, term life, and motor insurance protection plans.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white space-y-2 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Weekly Executive Rewards</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3-Day Trial Guarantee
              </span>
            </div>
            <ul className="text-[11px] text-slate-300 leading-relaxed space-y-1.5 list-disc list-inside">
              <li>
                For every customer successfully assisted with an eligible application, executives unlock <strong className="text-white font-bold">weekly commission payouts</strong>.
              </li>
              <li>
                ₹1,000 one-time membership gives lifetime access. Includes a <strong className="text-white font-bold">3-day trial period</strong> with cancellation eligibility.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-blue-500/25 transition-all cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function AuthHero() {
  const navigate = useNavigate();
  const [showWorkModal, setShowWorkModal] = useState(false);

  return (
    <div className="lg:col-span-6 space-y-6">
      <button
        onClick={() => navigate("/")}
        className="fin-focus inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-3.5 py-1.5 rounded-full transition-all shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Finovia
      </button>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold fin-display leading-tight text-slate-900 dark:text-white">
        Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Finovia Executive</span>
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
        Join the Executive Circle with <span className="font-bold text-slate-900 dark:text-white">₹1,000 one-time lifetime access</span> and unlock exclusive benefits, weekly earning opportunities, and dedicated Finovia support.
      </p>

      <button
        type="button"
        onClick={() => setShowWorkModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-extrabold shadow-md hover:shadow-blue-500/25 active:scale-[0.99] transition-all cursor-pointer"
      >
        <span className="text-xs uppercase tracking-wider">WHAT IS WORK OF Finovia Executive?</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Crown className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">₹1,000 Lifetime Access</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              One-time membership fee. No recurring membership charges.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Weekly Rewards</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Unlock weekly payment opportunities through eligible Executive activities.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Dedicated Finovia Support</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Get direct Finovia support for your Executive Program queries and assistance.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Sparkles className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">3-Day Trial</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Try the Executive membership for 3 days. Request cancellation anytime during the trial.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Contact & Support Button / Box */}
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <a
          href="mailto:executive@finovia.in"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-800 hover:border-blue-500/40 transition-all shadow-xs cursor-pointer group"
        >
          <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          <span>Executive Support Desk for Payouts & Other Enquiries</span>
          <span className="text-[11px] font-normal text-slate-300 ml-1.5 pl-2 border-l border-slate-700">executive@finovia.in</span>
        </a>
      </div>

      <ExecutiveWorkModal
        isOpen={showWorkModal}
        onClose={() => setShowWorkModal(false)}
      />
    </div>
  );
}
