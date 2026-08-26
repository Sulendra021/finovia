import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Zap, Award, Check, ExternalLink, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo.jsx";
import { PageShell, TermsConditionsModal } from "../components/shared.jsx";
import { creditCardsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CreditCardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    creditCardsApi
      .getOne(id)
      .then((res) => {
        setCard(res);
        setError("");
      })
      .catch((err) => {
        setError("Credit card details not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = () => {
    if (card?.applyUrl) {
      let targetUrl = String(card.applyUrl).trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = `https://${targetUrl}`;
      }
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Application link not available.");
    }
  };

  if (loading) {
    return (
      <PageShell>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6 animate-pulse">
          <div className="w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl md:col-span-2" />
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </PageShell>
    );
  }

  if (error || !card) {
    return (
      <PageShell>
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">Card Not Found</h2>
          <p className="text-xs text-slate-500">{error || "The requested credit card details could not be loaded."}</p>
          <button
            onClick={() => navigate("/cards")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            Back to Credit Cards
          </button>
        </div>
      </PageShell>
    );
  }

  const tags = Array.isArray(card.tags) ? card.tags : [];
  const features = Array.isArray(card.features) ? card.features : [];
  const rewardAmount = card.rewardAmount || "₹500";

  return (
    <PageShell>
      <Seo title={`${card.name} | Finovia`} description={card.description || `Details and perks of ${card.name}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/cards")}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Credit Cards
          </button>
        </div>

        {/* Hero Card Visual & Quick Specs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center gap-4">
            {card.imageUrl ? (
              <div className="w-full max-w-md h-64 sm:h-72 bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-inner">
                <img src={card.imageUrl} alt={card.name} loading="lazy" className="max-h-full max-w-full object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-300" />
              </div>
            ) : (
              <div className={`w-full max-w-md h-64 sm:h-72 rounded-2xl bg-gradient-to-br ${card.gradient || "from-blue-700 via-blue-600 to-blue-800"} p-8 flex flex-col justify-between shadow-2xl`}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-8 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-sm" />
                  <span className="fin-display text-white text-sm font-extrabold tracking-widest uppercase opacity-90">{card.bank || "BANK"}</span>
                </div>
                <div className="fin-num text-white/90 text-lg font-mono tracking-widest">•••• •••• •••• 4821</div>
                <div className="flex items-center justify-between text-white/80 text-xs font-semibold">
                  <span>CARD HOLDER</span>
                  <span className="font-bold italic text-sm">VISA</span>
                </div>
              </div>
            )}

            {/* Offer Tag right under the card image */}
            <div className="w-full max-w-md bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-emerald-500/10 border border-amber-500/30 dark:border-amber-400/30 rounded-2xl p-4 text-center shadow-xs flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Exclusive Bonus Offer
              </span>
              <span className="fin-display text-xl font-black text-amber-600 dark:text-amber-400 tracking-tight mt-0.5">
                Earn Up to {card.rewardAmount || "₹500"} Cashback  
              </span>
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100/80 hover:bg-blue-200/80 dark:bg-blue-900/60 dark:hover:bg-blue-900/90 px-3 py-1 rounded-md transition-colors cursor-pointer border border-blue-200/60 dark:border-blue-800"
              >
                <span>Conditions Apply</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {Array.isArray(card.categories) && card.categories.length > 0 ? (
                card.categories.map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800">
                  {card.category || "Credit Card"}
                </span>
              )}
              {card.rating && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {card.rating}
                </span>
              )}
            </div>

            <h1 className="fin-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {card.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {card.description || "Designed for maximum savings, rewards, and everyday convenience."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Issuer Bank</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{card.bank || "Partner Bank"}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Annual Fee</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {card.annualFee && card.annualFee !== "Free" && !card.annualFee.startsWith("₹") ? "₹" : ""}{card.annualFee || "Free"}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Reward Rate</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{card.rewardRate || "Standard"}</p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={handleApply}
                className="fin-focus flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all"
              >
                {card.buttonText || "Apply Now"} <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Features & Highlights */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="fin-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" /> Key Benefits & Features
            </h3>
            {features.length > 0 ? (
              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">Comprehensive rewards and privileges apply.</p>
            )}

            {tags.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Card Perks & Categories</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* term and condition box */}
          <div className="md:col-span-6 bg-slate-900 dark:bg-slate-950 text-slate-200 dark:text-slate-300 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-slate-800 relative overflow-hidden">
            {/* Subtle glow effect background */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              {/* Header Badge & Terms Link */}
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-800/80">
                
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="inline-flex items-center gap-1 text-xl font-bold text-blue-300 hover:text-blue-200 cursor-pointer"
                >
                  <span>Terms & Conditions</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h4 className="fin-display text-xl font-black text-white tracking-tight">How to Claim Your Bonus</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Follow these 2 mandatory steps to earn up to <span className="font-bold text-amber-400">₹500 Paytm Cashback</span>:
                </p>
              </div>

              {/* Formatted Steps */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 bg-slate-800/80 dark:bg-slate-900 p-3 rounded-2xl border border-slate-700/60 dark:border-slate-800 transition-colors">
                  <div className="w-6 h-6 rounded-xl bg-blue-600/90 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Apply via Official Link</h5>
                    <p className="text-[11px] text-slate-300 dark:text-slate-400 mt-0.5 leading-snug">
                      Complete your card application using the provided link.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/80 dark:bg-slate-900 p-3 rounded-2xl border border-slate-700/60 dark:border-slate-800 transition-colors">
                  <div className="w-6 h-6 rounded-xl bg-indigo-600/90 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Submit Exclusive Bonus Form</h5>
                    <p className="text-[11px] text-slate-300 dark:text-slate-400 mt-0.5 leading-snug">
                      Fill out the bonus claim form right after applying.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action CTA */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => navigate(`/cards/${card?.id || id}/apply`)}
                className="fin-focus w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl text-xs shadow-lg shadow-blue-600/25 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 tracking-wide"
              >
                <span>Apply Now & Claim Bonus</span>
                <ChevronRight className="w-4 h-4" />
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
    </PageShell>
  );
}
