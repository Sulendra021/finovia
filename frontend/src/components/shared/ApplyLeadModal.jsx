import React, { useState, useEffect } from "react";
import { X, ArrowRight, ShieldCheck, Lock, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { applicationsApi } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export function ApplyLeadModal({ isOpen, onClose, item, productType = "CreditCard" }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPhone("");
    }
  }, [isOpen, user]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await applicationsApi.apply({
        productType,
        productId: item.id || item._id,
        applicantName: cleanName,
        applicantEmail: cleanEmail,
        applicantPhone: cleanPhone,
      });

      toast.success("Details saved! Redirecting to application site...");
      onClose();

      if (item.applyUrl) {
        let targetUrl = String(item.applyUrl).trim();
        if (!/^https?:\/\//i.test(targetUrl)) {
          targetUrl = `https://${targetUrl}`;
        }
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to submit lead details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden my-auto transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={submitting}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Badge & Product Thumbnail Info */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Instant Direct Application
          </span>

          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-16 h-10 object-contain shrink-0" />
            ) : (
              <div className="w-12 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="fin-display text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {item.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {item.bank || "Partner Issuer"} • {item.category || "Credit Card"}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Please fill in your basic contact information below to start your application process.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="fin-focus w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-slate-400">+91</span>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                className="fin-focus w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="fin-focus w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900"
            />
          </div>

          <div className="pt-1 flex items-center justify-between gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-bit Secure Transmission
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Free Application</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="fin-focus w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {submitting ? "Saving & Redirecting..." : "Submit & Continue to Official Partner Site"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
