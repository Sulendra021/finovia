import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Zap, Award, Check, ExternalLink, Heart } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo.jsx";
import { PageShell } from "../components/shared.jsx";
import { creditCardsApi, wishlistApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ApplyLeadModal } from "../components/shared/ApplyLeadModal.jsx";

export default function CreditCardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

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
    navigate(`/cards/${id}/apply`);
  };

  const handleToggleWishlist = async () => {
    if (!card) return;
    const cardId = card.id || card._id;
    setIsWishlisted((prev) => !prev);
    if (!isWishlisted) {
      toast.success(`Saved ${card.name} to wishlist!`);
    } else {
      toast.success(`Removed ${card.name} from saved items.`);
    }
    if (user) {
      try {
        await wishlistApi.toggle({ productType: "CreditCard", productId: cardId });
      } catch (e) {}
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

  return (
    <PageShell>
      <Seo title={`${card.name} | Finovia`} description={card.description || `Details and perks of ${card.name}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation & Actions Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/cards")}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Credit Cards
          </button>
          <button
            onClick={handleToggleWishlist}
            className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
            {isWishlisted ? "Saved" : "Save to Wishlist"}
          </button>
        </div>

        {/* Hero Card Visual & Quick Specs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            {card.imageUrl ? (
              <div className="w-full max-w-xs h-48 bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                <img src={card.imageUrl} alt={card.name} className="max-h-full object-contain" />
              </div>
            ) : (
              <div className={`w-full max-w-xs h-48 rounded-2xl bg-gradient-to-br ${card.gradient || "from-blue-700 via-blue-600 to-blue-800"} p-6 flex flex-col justify-between shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
                  <span className="fin-display text-white text-xs font-extrabold tracking-widest uppercase opacity-90">{card.bank || "BANK"}</span>
                </div>
                <div className="fin-num text-white/90 text-sm tracking-widest">•••• •••• •••• 4821</div>
                <div className="flex items-center justify-between text-white/80 text-xs">
                  <span>CARD HOLDER</span>
                  <span className="font-bold italic">VISA</span>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold text-xs">
                {card.category || "Credit Card"}
              </span>
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
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

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-300">
                <ShieldCheck className="w-3.5 h-3.5" /> Safe & Verified
              </span>
              <h4 className="fin-display text-xl font-bold">Ready to apply?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Application processes are directly powered by partner banks. Instant digital decisioning for eligible applicants.
              </p>
            </div>

            <button
              onClick={handleApply}
              className="fin-focus w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              Start Application
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
