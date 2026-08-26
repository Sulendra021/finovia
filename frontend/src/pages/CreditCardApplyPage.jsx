import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, CreditCard, ArrowRight, Check, Gift, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Seo from "../components/Seo.jsx";
import { PageShell, TermsConditionsModal } from "../components/shared.jsx";
import { creditCardsApi, applicationsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CreditCardApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    creditCardsApi
      .getOne(id)
      .then((res) => setCard(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!card) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      toast.error("Please enter your full name");
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!cleanPhone || !/^[0-9]{10}$/.test(cleanPhone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setSubmitting(true);

    try {
      // Record lead in database
      await applicationsApi.apply({
        productType: "CreditCard",
        productId: card.id || card._id,
        applicantName: cleanName,
        applicantEmail: cleanEmail,
        applicantPhone: cleanPhone,
      });

      toast.success("Details submitted! Redirecting to application page...");

      // Redirect to issuer URL in a new tab (_blank)
      if (card.applyUrl) {
        let targetUrl = String(card.applyUrl).trim();
        if (!/^https?:\/\//i.test(targetUrl)) {
          targetUrl = `https://${targetUrl}`;
        }
        window.open(targetUrl, "_blank", "noopener,noreferrer");
        navigate("/cards");
      } else {
        navigate("/cards");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to submit application lead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <div className="max-w-3xl mx-auto px-4 py-16 space-y-6 animate-pulse">
          <div className="w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </PageShell>
    );
  }

  if (!card) {
    return (
      <PageShell>
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">Card Not Found</h2>
          <button
            onClick={() => navigate("/cards")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Back to Credit Cards
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Seo title={`Apply for ${card.name} | Finovia`} description={`Complete your lead details to apply for ${card.name}`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="fin-focus inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
 

        {/* Application Lead Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
          {/* Header */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/60 dark:border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Application Portal for Cashback & Benefits
            </span>

            <div className="flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              {card.imageUrl ? (
                <div className="w-28 h-18 bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200/70 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                  <img src={card.imageUrl} alt={card.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shrink-0 shadow-md">
                  <CreditCard className="w-7 h-7" />
                </div>
              )}
              <div className="space-y-1">
                <h2 className="fin-display text-xl font-extrabold text-slate-900 dark:text-white">
                  {card.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {card.bank || "Partner Issuer"} • Annual Fee: <span className="text-slate-800 dark:text-slate-200 font-bold">{card.annualFee || "Free"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="fin-focus w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/90 text-xs font-medium text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative"> 
                  <span className="absolute left-4 top-3.5 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="fin-focus w-full pl-14 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/90 text-xs font-medium text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="fin-focus w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/90 text-xs font-medium text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800"> 
              <span className="flex items-center gap-1 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Encrypted & Secure
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="fin-focus w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer tracking-wide"
            >
              {submitting ? "Submitting Lead & Redirecting..." : "Submit & Continue to Official Partner Site"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <TermsConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        cardName={card?.name}
      />
    </PageShell>
  );
}
