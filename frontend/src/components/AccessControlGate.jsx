import React from "react";
import { Link } from "react-router-dom";
import { Clock, Sparkles, ArrowLeft } from "lucide-react";
import { PageShell, PageHero } from "./shared.jsx";
import Seo from "./Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { PageSkeleton } from "./ui/Skeleton.jsx";

export default function AccessControlGate({
  seoTitle,
  seoDescription,
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  children,
}) {
  const { checking, isAdmin } = useAuth();

  if (checking) {
    return <PageSkeleton />;
  }

  if (isAdmin) {
    return children;
  }

  return (
    <PageShell>
      <Seo
        title={`${title} - Coming Soon`}
        description={seoDescription || subtitle || `${title} module is currently under development.`}
      />
      <PageHero eyebrow={eyebrow || title} title={title} subtitle={subtitle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-900/50 shadow-inner">
            {Icon ? <Icon className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 mb-3">
              <Clock className="w-3.5 h-3.5" /> Coming Soon
            </span>
            <h2 className="fin-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {title} is Under Development
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed max-w-lg mx-auto">
              We are working hard to build a feature-packed {title.toLowerCase()} hub with live partner rates, intelligent comparisons, and instant application tracking. Stay tuned!
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="fin-focus w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-md transition-all text-center flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              to="/cards"
              className="fin-focus w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Explore Credit Cards
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
