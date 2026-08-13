import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Check, ArrowRight, ArrowUpRight, ChevronRight, Gift, Sparkles,
} from "lucide-react";
import { SectionEyebrow, MiniCardVisual, CreditCardTile } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi, offersApi } from "../services/api.js";
import { TRUSTED_BANKS, NAV, STEPS, CREDIT_CARDS, OFFERS } from "../data/mockData.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: cards } = useLiveData(creditCardsApi.getAll, CREDIT_CARDS);
  const { data: offers } = useLiveData(offersApi.getAll, OFFERS);

  return (
    <div className="fin-fade">
      <Seo />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionEyebrow>#1 Financial Marketplace in India</SectionEyebrow>
            <h1 className="fin-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-5 leading-[1.1] tracking-tight">
              Find the best <span className="text-blue-600">financial products</span>, all in one place
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-5 text-[15px] leading-relaxed max-w-lg">
              Compare credit cards, bank accounts, loans and insurance from 50+ trusted partners, then apply in minutes — no paperwork chase, no guesswork.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cards, accounts, loans & more"
                  className="fin-focus w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button onClick={() => navigate("/cards")} className="fin-focus px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-600/30">
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
              {["Instant Approval", "Secure & Trusted", "Best Offers"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-80 hidden sm:block">
            <MiniCardVisual rot={-8} top="1rem" left="2rem" from="from-slate-900 via-slate-800 to-black" z={20} />
            <MiniCardVisual rot={7} top="6rem" left="9rem" from="from-blue-700 via-blue-600 to-blue-800" z={10} label="CASHBACK" />
            <div className="fin-float absolute top-2 right-0 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 ring-1 ring-slate-100" style={{ "--rot": "0deg" }}>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">BEST OFFER</p>
              <p className="fin-display text-2xl font-bold text-emerald-600 leading-none mt-1">5%<span className="text-xs align-top ml-0.5">Cashback</span></p>
            </div>
            <div className="fin-float absolute bottom-0 right-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 ring-1 ring-slate-100" style={{ "--rot": "0deg" }}>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">You saved</p>
              <p className="fin-num text-lg font-bold text-slate-900 dark:text-white leading-none mt-1">₹25,430</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted banks marquee */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <p className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4 tracking-wide uppercase">Trusted by 50+ leading banks & financial institutions</p>
        <div className="relative flex overflow-hidden">
          <div className="fin-marquee flex gap-10 whitespace-nowrap pr-10">
            {[...TRUSTED_BANKS, ...TRUSTED_BANKS].map((b, i) => (
              <span key={i} className="fin-display text-lg font-semibold text-slate-400 dark:text-slate-500">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Category quick nav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionEyebrow>Categories</SectionEyebrow>
            <h2 className="fin-display text-2xl font-bold text-slate-900 dark:text-white mt-3">Explore by product</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {NAV.slice(0, 5).map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(`/${item.key}`)}
              className="fin-focus group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <item.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* User journey */}
      <section className="bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionEyebrow tone="emerald">How it works</SectionEyebrow>
            <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3">Six steps from search to savings</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 h-full flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="fin-num w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{s.n}</div>
                    <s.icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h3 className="fin-display font-semibold text-sm text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="hidden lg:block w-4 h-4 text-slate-300 absolute -right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">A win-win for users & Finovia</p>
        </div>
      </section>

      {/* Featured cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionEyebrow>Featured</SectionEyebrow>
            <h2 className="fin-display text-2xl font-bold text-slate-900 dark:text-white mt-3">Popular credit cards this month</h2>
          </div>
          <button onClick={() => navigate("/cards")} className="fin-focus hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.slice(0, 3).map((c) => <CreditCardTile key={c.id || c._id} card={c} />)}
        </div>
      </section>

      {/* Offers strip */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white">
                <Gift className="w-3.5 h-3.5" /> Live Offers
              </span>
              <h2 className="fin-display text-2xl font-bold text-white mt-3">Deals ending soon</h2>
            </div>
            <button onClick={() => navigate("/offers")} className="fin-focus hidden sm:flex items-center gap-1 text-sm font-semibold text-white hover:text-blue-100">
              See all offers <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {offers.slice(0, 3).map((o) => (
              <div key={o.id || o._id} className="bg-white dark:bg-slate-900 rounded-2xl p-5">
                <p className="fin-display font-semibold text-sm text-slate-900 dark:text-white leading-snug">{o.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{o.bank}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Ends {o.expiry}</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-4" />
        <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Ready to make a smarter financial choice?</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-md mx-auto text-sm">Create a free Finovia account to save comparisons and track your applications.</p>
        <button onClick={() => navigate("/auth")} className="fin-focus mt-6 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-600/30">
          Get started free
        </button>
      </section>
    </div>
  );
}
