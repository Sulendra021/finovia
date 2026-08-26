import React from "react";
import { banks } from "../../data/mockData.js";

export function TrustedBanksMarquee() {
  return (
    <section className="py-10 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
      <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 tracking-wide uppercase">
        Trusted by 50+ leading banks & financial institutions
      </p>
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
  );
}
