import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, FileText, Clock, ArrowRight, Loader2 } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { applicationsApi, wishlistApi } from "../services/api.js";

const STATUS_STYLE = {
  pending: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
  redirected: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
  approved: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400",
  rejected: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([applicationsApi.mine(), wishlistApi.mine()])
      .then(([apps, wl]) => {
        setApplications(apps);
        setWishlist(wl);
      })
      .catch(() => setError("Couldn't reach the backend. Is it running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <Seo title="My Dashboard" description="Track your applications and saved products on Finovia." />
      <PageHero eyebrow="Dashboard" title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`} subtitle="Track the products you've applied for and the ones you're still considering." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-sm text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl px-4 py-3">{error}</div>
        ) : (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white">My Applications</h2>
              </div>
              {applications.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">You haven't applied to anything yet.</p>
                  <Link to="/cards" className="fin-focus inline-flex items-center gap-1 text-sm font-semibold text-blue-600 mt-3">
                    Browse credit cards <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.map((a) => (
                    <div key={a._id} className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="fin-display font-semibold text-sm text-slate-900 dark:text-white">{a.productType}</p>
                        <p className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          <Clock className="w-3 h-3" /> {new Date(a.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[a.status] || STATUS_STYLE.pending}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white">Wishlist</h2>
              </div>
              {wishlist.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Nothing saved yet — tap the heart on any product to save it here.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                  {wishlist.map((w) => (
                    <div key={w._id} className="flex items-center justify-between px-5 py-4">
                      <p className="text-sm text-slate-700 dark:text-slate-200">{w.productType}</p>
                      <span className="fin-num text-[11px] text-slate-400 dark:text-slate-500">{w.productId}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </PageShell>
  );
}
