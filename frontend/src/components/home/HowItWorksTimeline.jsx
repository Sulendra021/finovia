import React from "react";
import { SectionEyebrow } from "../shared.jsx";
import { STEPS } from "../../data/mockData.js";

export function HowItWorksTimeline() {
  return (
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
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-blue-100 dark:bg-slate-800 rounded-full z-0">
            <div className="h-full bg-blue-600 rounded-full animate-pulse opacity-80" />
          </div>

          {/* Alternating Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-3 relative z-10">
            {STEPS.map((s, i) => {
              const isEven = i % 2 === 0;
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
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 flex items-center justify-center shadow-md group-hover:scale-115 group-hover:border-blue-600 group-hover:shadow-blue-500/30 transition-all duration-300 z-20 relative">
                      <s.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-all duration-300" />
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
                        <span className="fin-num px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white inline-block mb-1 shadow-sm">
                          Step 0{s.n}
                        </span>
                        <h3 className="fin-display text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-3">
                          {s.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile/Tablet View */}
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
  );
}
