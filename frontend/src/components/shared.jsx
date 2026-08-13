import React from "react";
import { Star } from "lucide-react";

export function Logo({ size = "md" }) {
  const dims = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const text = size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2">
      <div className={`${dims} rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-600/30`}>
        <span className="fin-display text-white font-bold text-base">F</span>
      </div>
      <span className={`fin-display font-bold ${text} text-slate-900 dark:text-white tracking-tight`}>Finovia</span>
    </div>
  );
}

export function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="fin-num text-xs font-semibold text-slate-700 dark:text-slate-200">{rating}</span>
    </div>
  );
}

export function SectionEyebrow({ children, tone = "blue" }) {
  const tones = {
    blue: "text-blue-700 bg-blue-50 ring-blue-200",
    amber: "text-amber-700 bg-amber-50 ring-amber-200",
    emerald: "text-emerald-700 bg-emerald-50 ring-emerald-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function MiniCardVisual({ rot = -6, top = 0, left = 0, from, mono = "text-white/90", z = 10, label = "FINOVIA" }) {
  return (
    <div
      className={`fin-float absolute rounded-2xl shadow-2xl bg-gradient-to-br ${from} w-52 h-32 sm:w-60 sm:h-36 p-4 flex flex-col justify-between`}
      style={{ "--rot": `${rot}deg`, transform: `rotate(${rot}deg)`, top, left, zIndex: z }}
    >
      <div className="flex items-center justify-between">
        <div className="w-8 h-6 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-90" />
        <span className="fin-display text-white text-xs font-bold tracking-widest opacity-90">{label}</span>
      </div>
      <div className={`fin-num ${mono} text-sm tracking-widest`}>•••• •••• •••• 4821</div>
      <div className="flex items-center justify-between">
        <span className="fin-num text-white/70 text-[10px]">CARD HOLDER</span>
        <span className="fin-display text-white text-xs italic font-bold">VISA</span>
      </div>
    </div>
  );
}

export function PageShell({ children }) {
  return <div className="fin-fade">{children}</div>;
}

export function PageHero({ eyebrow, title, subtitle, tone = "blue" }) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
        <h1 className="fin-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">{title}</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl text-[15px] leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

export function CreditCardTile({ card }) {
  const buttonText = card.buttonText || "Apply Now";
  const applyUrl = card.applyUrl || "#";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between h-full">
      <div>
        {card.imageUrl ? (
          <div className="h-36 overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-2">
            <img 
              src={card.imageUrl} 
              alt={card.imageAlt || card.name} 
              className="h-full object-contain hover:scale-105 transition-transform" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className={`bg-gradient-to-br ${card.gradient || "from-blue-700 via-blue-600 to-blue-800"} p-5 h-36 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <div className="w-7 h-5 rounded bg-gradient-to-br from-yellow-200 to-yellow-500" />
              <span className="fin-display text-white text-[10px] font-bold tracking-widest">{(card.bank || "BANK").toUpperCase()}</span>
            </div>
            <div className="fin-num text-white/85 text-xs tracking-widest">•••• •••• •••• 4821</div>
          </div>
        )}
        <div className="p-5 pb-0">
          <div className="flex items-start justify-between">
            <h3 className="fin-display font-semibold text-slate-900 dark:text-white text-sm">{card.name}</h3>
            <RatingStars rating={card.rating} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{card.category} • Reward rate {card.rewardRate || "N/A"}</p>
          
          {card.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2" title={card.description}>
              {card.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {card.tags && card.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Annual fee</p>
            <p className="fin-num text-sm font-semibold text-slate-900 dark:text-white">
              {card.annualFee && card.annualFee !== "Free" && !card.annualFee.startsWith("₹") ? "₹" : ""}{card.annualFee}
            </p>
          </div>
          {card.applyUrl ? (
            <a 
              href={applyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="fin-focus text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-center"
            >
              {buttonText}
            </a>
          ) : (
            <button className="fin-focus text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
