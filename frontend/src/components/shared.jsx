import React from "react";
import { Star } from "lucide-react";

export function Logo({ size = "md", dark = false }) {
  const dims = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const text = size === "sm" ? "text-lg" : "text-xl";
  const textColor = dark ? "text-white" : "text-slate-900 dark:text-white";
  return (
    <div className="flex items-center gap-2">
      <svg className={`${dims} shrink-0 shadow-sm shadow-blue-600/30 rounded-xl`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="10" className="fill-blue-600 dark:fill-blue-500"/>
        <path
          d="M11 21V11H22M11 16H19"
          className="stroke-slate-50 dark:stroke-slate-950"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`fin-display font-bold ${text} ${textColor} tracking-tight`}>Finovia</span>
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
    blue: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 ring-blue-200 dark:ring-blue-800",
    amber: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 ring-amber-200 dark:ring-amber-800",
    emerald: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 ring-emerald-200 dark:ring-emerald-800",
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
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
        <h1 className="fin-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">{title}</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl text-[15px] leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

export function CreditCardTile({ card, onApply, isWishlisted, onToggleWishlist, onClick }) {
  const buttonText = card.buttonText || "Apply Now";

  return (
    <div
      onClick={() => onClick && onClick(card)}
      className="fin-card-interactive group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
    >
      {/* Wishlist Heart Button */}
      {onToggleWishlist && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(card);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="fin-button-interactive absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm"
        >
          <svg
            className={`w-4 h-4 transition-transform active:scale-125 ${isWishlisted ? "fill-rose-500 text-rose-500" : "fill-none text-slate-400"}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-1.78-7.781 4.5 4.5 0 00-5.902 1.417L12 7.671l-1.001-1.353a4.5 4.5 0 00-6.681-.001z" />
          </svg>
        </button>
      )}

      <div>
        {card.imageUrl ? (
          <div className="h-40 overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-100 dark:border-slate-800">
            <img 
              src={card.imageUrl} 
              alt={card.imageAlt || card.name} 
              className="h-full object-contain group-hover:scale-105 transition-transform duration-300" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className={`bg-gradient-to-br ${card.gradient || "from-blue-700 via-blue-600 to-blue-800"} p-5 h-40 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <div className="w-8 h-6 rounded bg-gradient-to-br from-yellow-200 to-yellow-500" />
              <span className="fin-display text-white text-[10px] font-extrabold tracking-widest uppercase opacity-90">{(card.bank || "BANK")}</span>
            </div>
            <div className="fin-num text-white/85 text-xs tracking-widest">•••• •••• •••• 4821</div>
          </div>
        )}
        <div className="p-5 pb-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="fin-display font-bold text-slate-900 dark:text-white text-base leading-snug">{card.name}</h3>
            <RatingStars rating={card.rating} />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{card.category}</span>
            <span>•</span>
            <span>Reward: {card.rewardRate || "N/A"}</span>
          </div>
          
          {card.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed" title={card.description}>
              {card.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {card.tags && card.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">Annual fee</p>
            <p className="fin-num text-sm font-bold text-slate-900 dark:text-white">
              {card.annualFee && card.annualFee !== "Free" && !card.annualFee.startsWith("₹") ? "₹" : ""}{card.annualFee}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onApply) {
                onApply(card);
              } else if (card.applyUrl) {
                let targetUrl = String(card.applyUrl).trim();
                if (!/^https?:\/\//i.test(targetUrl)) {
                  targetUrl = `https://${targetUrl}`;
                }
                window.open(targetUrl, "_blank", "noopener,noreferrer");
              }
            }}
            className="fin-focus fin-button-interactive text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2.5 rounded-xl shadow-sm shadow-blue-600/30 hover:shadow-md"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
