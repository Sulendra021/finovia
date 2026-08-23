import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Check, ArrowRight, ArrowUpRight, ChevronRight, Gift, Sparkles,
} from "lucide-react";
import { SectionEyebrow, MiniCardVisual, CreditCardTile } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi, offersApi } from "../services/api.js";
import { TRUSTED_BANKS, banks, NAV, STEPS } from "../data/mockData.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: cards } = useLiveData(creditCardsApi.getAll, []);
  const { data: offers } = useLiveData(offersApi.getAll, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cards?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/cards");
    }
  };

  return (
    <div className="fin-fade">
      <Seo />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        {/* Background ambient subtle visual glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute top-12 -right-20 w-[400px] h-[250px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <SectionEyebrow>#1 Financial Marketplace in India</SectionEyebrow>
            <h1 className="fin-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-5 leading-[1.1] tracking-tight">
              Find the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">financial products</span>, all in one place
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-5 text-[15px] leading-relaxed max-w-lg">
              Compare credit cards, bank accounts, loans and insurance from 50+ trusted partners, then apply in minutes - no paperwork chase, no guesswork.
            </p>
            <form onSubmit={handleSearch} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-lg">
              <div className="relative flex-1 group">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-600 transition-colors" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cards, accounts, loans & more"
                  className="fin-focus w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                />
              </div>
              <button type="submit" className="fin-focus fin-button-interactive px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/30">
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
              {["Instant Approval", "Secure & Trusted", "Best Offers"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-80 hidden sm:block">
            <MiniCardVisual rot={-8} top="1rem" left="2rem" from="from-slate-900 via-slate-800 to-black" z={20} />
            <MiniCardVisual rot={7} top="6rem" left="9rem" from="from-blue-700 via-blue-600 to-blue-800" z={10} label="CASHBACK" />
            <div className="fin-float absolute top-2 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl px-4 py-3 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:scale-105" style={{ "--rot": "0deg" }}>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">BEST OFFER</p>
              <p className="fin-display text-2xl font-bold text-emerald-600 dark:text-emerald-400 leading-none mt-1">5%<span className="text-xs align-top ml-0.5">Cashback</span></p>
            </div>
            <div className="fin-float absolute bottom-0 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl px-4 py-3 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:scale-105" style={{ "--rot": "0deg" }}>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">You saved</p>
              <p className="fin-num text-lg font-bold text-slate-900 dark:text-white leading-none mt-1">₹25,430</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted banks marquee */}
      <section className="py-10 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
        <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 tracking-wide uppercase">Trusted by 50+ leading banks & financial institutions</p>
        <div className="relative flex overflow-hidden">
          <div className="fin-marquee flex items-center gap-12 whitespace-nowrap pr-12">
            {[...banks, ...banks].map((b, i) => (
              <a
                key={`${b.id}-${i}`}
                href={b.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 h-20 w-44 shrink-0 group transition-transform hover:scale-105"
                title={b.name}
              >
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  width="176"
                  height="56"
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain filter dark:brightness-125 dark:contrast-125"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden fin-display text-base font-bold text-slate-700 dark:text-slate-200">{b.shortName || b.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category quick nav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionEyebrow>Categories</SectionEyebrow>
            <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight">
              Explore by <span className="text-blue-600 dark:text-blue-400">product</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {NAV.slice(0, 5).map((item, idx) => (
            <button
              key={item.key}
              onClick={() => navigate(`/${item.key}`)}
              className="fin-focus fin-card-interactive group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center gap-5 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Animated gradient ambient glow on card hover */}
              <div className="pointer-events-none absolute -top-14 -right-14 w-32 h-32 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125" />

              {/* Animated Icon Wrapper with subtle float & scale effect */}
              <div className="w-20 h-20 flex items-center justify-center relative transition-transform duration-500 ease-out group-hover:scale-115 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-20 h-20 object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-500 group-hover:rotate-3"
                  />
                ) : (
                  <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                )}
              </div>
              <div className="text-center relative z-10">
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 block">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200 flex items-center justify-center gap-1 mt-1">
                  Compare & Apply <ChevronRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Horizontal Alternating Timeline User Journey */}
      <section className="bg-slate-50/80 dark:bg-slate-950/80 border-y border-slate-200/80 dark:border-slate-800/80 py-14 relative overflow-hidden">
        {/* Ambient background glow accents */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-8 sm:mb-10">
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h2 className="fin-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              Six steps from <span className="text-blue-600 dark:text-blue-400">search to savings</span>
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="relative py-2">
            {/* Center Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500/20 via-blue-600 to-indigo-500/20 rounded-full z-0">
              <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full animate-pulse opacity-80" />
            </div>

            {/* Alternating Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-3 relative z-10">
              {STEPS.map((s, i) => {
                const isEven = i % 2 === 0; // even index: item content placed above on desktop, odd index: below
                return (
                  <div key={s.n} className="flex flex-col items-center group relative">
                    {/* Desktop Layout: Top content div if even index */}
                    <div className={`hidden lg:flex flex-col items-center justify-end h-32 w-full mb-2 transition-all duration-500 ${isEven ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none'}`}>
                      {isEven && (
                        <div className="fin-card-interactive bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3 rounded-xl shadow-md group-hover:shadow-xl group-hover:border-blue-500/50 group-hover:-translate-y-1 transition-all duration-300 text-center w-full relative">
                          <span className="fin-num px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white inline-block mb-1 shadow-sm">
                            Step 0{s.n}
                          </span>
                          <h3 className="fin-display text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-3">
                            {s.desc}
                          </p>
                          {/* Pointing triangle down towards line */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-slate-900 border-b border-r border-slate-200/90 dark:border-slate-800 rotate-45 group-hover:border-blue-500/50 transition-colors" />
                        </div>
                      )}
                    </div>

                    {/* Timeline Node / Icon Badge (Desktop only) */}
                    <div className="hidden lg:block relative my-1">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 dark:border-blue-400 flex items-center justify-center shadow-md group-hover:scale-115 group-hover:border-indigo-500 group-hover:shadow-blue-500/30 transition-all duration-300 z-20 relative">
                        <s.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:rotate-12 transition-all duration-300" />
                      </div>
                      {/* Pulse animation ring */}
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Desktop Layout: Bottom content div if odd index */}
                    <div className={`hidden lg:flex flex-col items-center justify-start h-32 w-full mt-2 transition-all duration-500 ${!isEven ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none'}`}>
                      {!isEven && (
                        <div className="fin-card-interactive bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3 rounded-xl shadow-md group-hover:shadow-xl group-hover:border-blue-500/50 group-hover:translate-y-1 transition-all duration-300 text-center w-full relative">
                          {/* Pointing triangle up towards line */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-slate-900 border-t border-l border-slate-200/90 dark:border-slate-800 rotate-45 group-hover:border-blue-500/50 transition-colors" />
                          <span className="fin-num px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white inline-block mb-1 shadow-sm">
                            Step 0{s.n}
                          </span>
                          <h3 className="fin-display text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-3">
                            {s.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile/Tablet View (sm & md screens up to lg) */}
                    <div className="lg:hidden w-full flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm hover:border-blue-500/40 transition-colors">
                      <span className="fin-num text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 shrink-0">
                        0{s.n}
                      </span>
                      <div>
                        <h3 className="fin-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionEyebrow>Featured</SectionEyebrow>
            <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight">
              Popular credit cards <span className="text-blue-600 dark:text-blue-400">this month</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/cards")}
            className="fin-focus fin-link-rtl hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-0.5"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.slice(0, 3).map((c) => <CreditCardTile key={c.id || c._id} card={c} />)}
        </div>
      </section>

    

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950 p-6 sm:p-8 lg:p-10 text-center border border-blue-800/40 dark:border-slate-800 shadow-xl shadow-blue-950/20">
          {/* Ambient background glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-24 right-10 w-80 h-80 bg-indigo-500/25 dark:bg-indigo-500/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 dark:bg-blue-500/10 border border-blue-400/20 text-blue-200 dark:text-blue-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Financial Decisions</span>
            </div>

            <h2 className="fin-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white dark:from-blue-400 dark:via-indigo-300 dark:to-blue-200">smarter financial choice?</span>
            </h2>

            <p className="text-blue-100/90 dark:text-slate-300 mt-3 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Join thousands of users using Finovia to compare rates, save money, and track applications seamlessly in one platform.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="fin-focus fin-button-interactive w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Get started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/cards")}
                className="fin-focus w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/10 dark:bg-slate-800/80 hover:bg-white/20 dark:hover:bg-slate-800 text-white dark:text-slate-200 border border-white/20 dark:border-slate-700/80 text-xs sm:text-sm font-semibold transition-all hover:border-white/40 dark:hover:border-slate-600 backdrop-blur-sm"
              >
                Browse credit cards
              </button>
            </div>

            {/* Micro feature badges */}
            <div className="mt-6 pt-5 border-t border-white/15 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-blue-100/80 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> No hidden charges
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 dark:bg-blue-400" /> Instant comparison
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 dark:bg-indigo-400" /> 100% Secure & encrypted
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
