import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Star, Sparkles, Heart, ShieldCheck, Tag, Gift, X, ChevronRight } from "lucide-react";

export function TermsConditionsModal({ isOpen, onClose, cardName = "Credit Card" }) {
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-finFadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            🎁 Cashback Offer Terms
          </span>
          <h2 className="fin-display text-2xl font-black text-slate-900 dark:text-white">
            Earn Up to ₹500 Cashback
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Apply for the card and complete the bonus form to claim your cashback.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800/80 space-y-3">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Quick Steps to Claim
          </h3>
          <div className="grid gap-2.5">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Apply for the Card</span>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Complete the Exclusive Bonus Form</span>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Get Up to ₹500 Cashback</span>
            </div>
          </div>
        </div>

        {/* Terms & Conditions List */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Terms & Conditions
          </h3>
          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
              <p className="leading-relaxed">Apply for the card using the provided link.</p>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
              <p className="leading-relaxed">The card application must be completed successfully through the provided link.</p>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
              <p className="leading-relaxed">After applying, you must complete the Exclusive Bonus Form to be eligible for the cashback.</p>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
              <p className="leading-relaxed">Both steps are mandatory: applying through the provided link and completing the Exclusive Bonus Form.</p>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <p className="leading-relaxed font-medium">If the form is not completed, you will not be eligible for the Exclusive Bonus Cashback.</p>
            </div>
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <p className="leading-relaxed font-medium">If you successfully complete all the required steps - including applying for the card through the provided link and submitting the Exclusive Bonus Form - you will be eligible to receive cashback of up to ₹500 in your Paytm account.</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function Logo({ size = "md", dark = false }) {
  const dims = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const text = size === "sm" ? "text-lg" : "text-xl";
  const textColor = dark ? "text-white" : "text-slate-900 dark:text-white";
  return (
    <div className="flex items-center gap-2">
      <svg className={`${dims} shrink-0 shadow-sm shadow-blue-600/30 rounded-xl`} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="10" className="fill-blue-600 dark:fill-blue-500" />
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

export function PageHero({ eyebrow, title, subtitle, tone = "blue", actions }) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
          <h1 className="fin-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">{title}</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl text-[15px] leading-relaxed">{subtitle}</p>
        </div>
        {actions && <div className="shrink-0 flex items-center">{actions}</div>}
      </div>
    </div>
  );
}

export function CreditCardTile({ card, onApply, onClick }) {
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [isOpeningGift, setIsOpeningGift] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const buttonText = card.buttonText || "Apply Now";
  const rewardAmount = card.rewardAmount || "₹500";

  const handleOpenGift = () => {
    if (giftUnlocked) return;
    setIsOpeningGift(true);
    setTimeout(() => {
      setIsOpeningGift(false);
      setGiftUnlocked(true);
    }, 600);
  };

  return (
    <>
      <div
        onClick={() => onClick && onClick(card)}
        className="fin-card-interactive group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-[20px] overflow-hidden hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
      >
        <div>
          {/* Top Header Bar with Tap Gift Button */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 px-5 py-3 flex items-center justify-between text-white shadow-xs">
            {/* Continuous Infinite Animated Shimmer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-finShimmer pointer-events-none" />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenGift();
              }}
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide transition-all ${
                giftUnlocked
                  ? "bg-emerald-500/90 text-white shadow-xs"
                  : isOpeningGift
                  ? "bg-amber-400 text-slate-900 animate-bounce"
                  : "bg-white/20 hover:bg-white/30 text-amber-300 cursor-pointer border border-white/30"
              }`}
              title="Click to reveal secret cashback offer!"
            >
              <span>{giftUnlocked ? "Gift Claimed! 🎁" : isOpeningGift ? "Opening..." : "Tap Gift 🎁"}</span>
            </button>
            
            <div className="relative z-10 flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                LIVE
              </span>
            </div>
          </div>

          {/* Payout Banner Box */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Earn Up to
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                {giftUnlocked ? (
                  <span className="fin-display text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight drop-shadow-xs animate-finFadeIn">
                    {rewardAmount.startsWith("₹") ? rewardAmount : `₹${rewardAmount}`}<span className="fin-display text-xs font-black text-black dark:text-white tracking-tight drop-shadow-xs"> EXTRA</span>
                  </span>
                ) : (
                  <span className="fin-display text-2xl font-black text-amber-600 dark:text-amber-400 ">
                     Tap Gift to Reveal
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTermsModal(true);
                }}
                className="inline-flex items-center gap-0.5 mt-1 text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-100/70 hover:bg-blue-200/70 dark:bg-blue-900/50 dark:hover:bg-blue-900/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer border border-blue-200/60 dark:border-blue-800"
              >
                <span>Conditions Apply</span>
                <ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </button>
            </div>

            {/* Larger Card Image Thumbnail */}
            {card.imageUrl ? (
              <div className="w-36 h-24 sm:w-40 sm:h-28 overflow-hidden flex items-center justify-center shrink-0 p-1">
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt || card.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className={`w-32 h-20 rounded-xl bg-gradient-to-br ${card.gradient || "from-blue-700 via-blue-600 to-blue-800"} p-3 flex flex-col justify-between shrink-0 shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="w-6 h-4 rounded bg-amber-300" />
                  <span className="text-[9px] font-bold text-white uppercase">{card.bank?.[0] || "B"}</span>
                </div>
                <div className="text-[10px] font-mono text-white/90 tracking-widest">•••• 4821</div>
              </div>
            )}
          </div>

          {/* Card Main Info */}
          <div className="p-5 sm:p-6 pb-0 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  {card.bank || "Credit Card"}
                </span>
                <h3 className="fin-display font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {card.name}
                </h3>
              </div>
              <RatingStars rating={card.rating || 4.5} />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {card.description || "Get rewarded when you complete eligible offers & shopping transactions."}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {card.tags && card.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-5 sm:p-6 pt-3 space-y-2">
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">Annual fee</p>
              <p className="fin-num text-sm font-bold text-slate-900 dark:text-white">
                {card.annualFee && card.annualFee !== "Free" && !card.annualFee.startsWith("₹") ? "₹" : ""}{card.annualFee || "Free"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Details Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick) {
                    onClick(card);
                  }
                }}
                className="fin-focus text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded-xl transition-colors"
              >
                Details
              </button>

              {/* View Offer / Apply CTA */}
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
                className="fin-focus fin-button-interactive text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-xl shadow-xs shadow-blue-600/30 hover:shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{buttonText === "Apply Now" ? "View Offer" : buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TermsConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        cardName={card.name}
      />
    </>
  );
}
