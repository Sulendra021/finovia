import React, { useEffect, useState } from "react";
import {
  Users, CreditCard, FileText, IndianRupee, Loader2, TrendingUp,
  ArrowUpRight, ShieldCheck, Tag, Sparkles, Activity, Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/api.js";

function StatCard({ icon: Icon, label, value, trend, color }) {
  const colorMap = {
    blue: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50",
    emerald: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
    amber: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50",
    purple: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
            <ArrowUpRight className="w-3.5 h-3.5" /> {trend}
          </span>
        )}
      </div>
      <p className="fin-num text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.stats().then(setStats).catch(() => setError("Couldn't reach the backend. Is it running and seeded?"));
  }, []);

  const totalProducts = stats
    ? Object.values(stats.products).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-white mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Finovia Admin Operations
          </span>
          <h2 className="fin-display text-2xl font-extrabold">Executive Dashboard</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">Real-time metrics, inventory breakdown, and system activity.</p>
        </div>
        <button
          onClick={() => navigate("/admin/credit-cards")}
          className="fin-focus shrink-0 px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {error && (
        <div className="text-xs text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
          {error}
        </div>
      )}

      {!stats && !error ? (
        <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 text-blue-600 animate-spin" /></div>
      ) : stats ? (
        <>
          {/* Key Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={Users} label="Registered Users" value={stats.users} trend="+12%" color="blue" />
            <StatCard icon={CreditCard} label="Listed Financial Products" value={totalProducts} trend="+8" color="purple" />
            <StatCard icon={FileText} label="Leads & Applications" value={stats.leads} trend="+24%" color="amber" />
            <StatCard icon={IndianRupee} label="Commission Revenue" value={`₹${stats.totalCommission.toLocaleString("en-IN")}`} trend="+18%" color="emerald" />
          </div>

          {/* Breakdown & Activity Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Products Breakdown */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">Product Inventory Breakdown</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distribution across financial verticals</p>
                </div>
                <span className="fin-num text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
                  {totalProducts} Total Items
                </span>
              </div>

              <div className="space-y-4">
                {Object.entries(stats.products).map(([key, count]) => {
                  const percentage = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-200 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="fin-num text-xs text-slate-500 dark:text-slate-400">{percentage}%</span>
                          <span className="fin-num font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                            {count}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & System Health */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">Quick Actions</h3>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => navigate("/admin/credit-cards")}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-blue-500" /> Manage Credit Cards</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => navigate("/admin/offers")}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-2"><Tag className="w-4 h-4 text-amber-500" /> Update Offers & Banners</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-2"><Users className="w-4 h-4 text-emerald-500" /> View User Directory</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium"><ShieldCheck className="w-4 h-4 text-emerald-500" /> System Status</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
