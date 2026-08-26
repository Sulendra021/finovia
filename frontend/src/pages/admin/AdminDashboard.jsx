import React, { useEffect, useState } from "react";
import {
  Users, CreditCard, FileText, IndianRupee, Loader2, TrendingUp,
  ArrowUpRight, ShieldCheck, Tag, Sparkles, Activity, Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/api.js";

function StatCard({ icon: Icon, label, value, subtext, color, onClick }) {
  const colorMap = {
    blue: "bg-blue-600 text-white border-blue-600 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200/50 dark:group-hover:border-blue-800/50",
    emerald: "bg-emerald-600 text-white border-emerald-600 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-200/50 dark:group-hover:border-emerald-800/50",
    amber: "bg-amber-600 text-white border-amber-600 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:border-amber-200/50 dark:group-hover:border-amber-800/50",
    purple: "bg-purple-600 text-white border-purple-600 group-hover:bg-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:border-purple-200/50 dark:group-hover:border-purple-800/50",
  };

  return (
    <div
      onClick={onClick}
      className={`group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-sm ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
        </div>
        {subtext && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700">
            <Activity className="w-3 h-3 text-blue-500" /> {subtext}
          </span>
        )}
      </div>
      <p className="fin-num text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1.5">{label}</p>
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

  const verifiedPercent = stats && stats.users > 0
    ? Math.round((stats.verifiedUsers / stats.users) * 100)
    : 100;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10 border border-blue-500/20">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Finovia Admin Operations
          </span>
          <h2 className="fin-display text-2xl sm:text-3xl font-extrabold">Executive Dashboard</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">Real-time metrics, live lead activity, and product inventory breakdown.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/leads")}
            className="fin-focus shrink-0 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> View Leads
          </button>
          <button
            onClick={() => navigate("/admin/credit-cards")}
            className="fin-focus shrink-0 px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
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
            <StatCard
              icon={Users}
              label="Registered Users"
              value={stats.users}
              subtext={`${verifiedPercent}% Verified`}
              color="blue"
              onClick={() => navigate("/admin/users")}
            />
            <StatCard
              icon={CreditCard}
              label="Listed Products"
              value={totalProducts}
              subtext={`${stats.products.creditCards || 0} Cards`}
              color="purple"
              onClick={() => navigate("/admin/credit-cards")}
            />
            <StatCard
              icon={FileText}
              label="Applications & Leads"
              value={stats.leads}
              subtext={`${stats.recentLeadsCount || 0} This Month`}
              color="amber"
              onClick={() => navigate("/admin/leads")}
            />
            <StatCard
              icon={IndianRupee}
              label="Commission Revenue"
              value={`₹${stats.totalCommission.toLocaleString("en-IN")}`}
              subtext="Total Realized"
              color="emerald"
            />
          </div>

          {/* Breakdown & Activity Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Products Breakdown */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">Product Inventory Breakdown</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time inventory distribution across financial verticals</p>
                </div>
                <span className="fin-num text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
                  {totalProducts} Total Listed
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
                          <span className="fin-num font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md text-xs">
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

            {/* Quick Actions & System Status */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">Admin Management</h3>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => navigate("/admin/credit-cards")}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    <span className="flex items-center gap-2.5"><CreditCard className="w-4 h-4 text-blue-500" /> Manage Credit Cards</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => navigate("/admin/demat-accounts")}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    <span className="flex items-center gap-2.5"><TrendingUp className="w-4 h-4 text-emerald-500" /> Demat Accounts</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => navigate("/admin/offers")}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    <span className="flex items-center gap-2.5"><Tag className="w-4 h-4 text-amber-500" /> Offers & Banners</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    <span className="flex items-center gap-2.5"><Users className="w-4 h-4 text-purple-500" /> User Directory</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Database Link</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-200 dark:border-emerald-900">PostgreSQL Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real Live Submissions Activity Feed */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Recent Customer Applications
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live real-time lead capture submissions from applicants</p>
              </div>
              <button
                onClick={() => navigate("/admin/leads")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View All Leads <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {Array.isArray(stats.recentLeads) && stats.recentLeads.length > 0 ? (
              <div className="overflow-x-auto fin-scrollbar-y">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="p-3.5 whitespace-nowrap">Applicant</th>
                      <th className="p-3.5 whitespace-nowrap">Contact Phone</th>
                      <th className="p-3.5 whitespace-nowrap">Applied Product</th>
                      <th className="p-3.5 whitespace-nowrap">Status</th>
                      <th className="p-3.5 whitespace-nowrap">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {stats.recentLeads.map((lead) => (
                      <tr
                        key={lead.id || lead._id}
                        onClick={() => navigate(`/admin/leads/${lead.id || lead._id}/edit`)}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <td className="p-3.5 whitespace-nowrap font-bold text-slate-900 dark:text-white">{lead.applicantName}</td>
                        <td className="p-3.5 whitespace-nowrap text-slate-600 dark:text-slate-300 font-mono">{lead.applicantPhone || "N/A"}</td>
                        <td className="p-3.5 whitespace-nowrap font-medium text-slate-800 dark:text-slate-200">{lead.productName || "Credit Card Application"}</td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 capitalize">
                            {lead.status || "redirected"}
                          </span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap text-slate-400 text-[11px]">
                          {new Date(lead.createdAt || Date.now()).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-8 text-center text-xs text-slate-500">
                No customer lead submissions recorded yet. Leads submitted on `/cards/:id/apply` will appear here automatically.
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
