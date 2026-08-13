import React, { useEffect, useState } from "react";
import { Users, CreditCard, FileText, IndianRupee, Loader2 } from "lucide-react";
import { adminApi } from "../../services/api.js";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <p className="fin-num text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.stats().then(setStats).catch(() => setError("Couldn't reach the backend. Is it running and seeded?"));
  }, []);

  const totalProducts = stats
    ? Object.values(stats.products).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div>
      <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white mb-1">Overview</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Live counts pulled from MongoDB via /api/admin/stats.</p>

      {error && <div className="text-xs text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2 mb-6">{error}</div>}

      {!stats && !error ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>
      ) : stats ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users} label="Registered users" value={stats.users} />
            <StatCard icon={CreditCard} label="Total products listed" value={totalProducts} />
            <StatCard icon={FileText} label="Leads / applications" value={stats.leads} />
            <StatCard icon={IndianRupee} label="Total commission earned" value={`₹${stats.totalCommission.toLocaleString("en-IN")}`} />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="fin-display font-semibold text-slate-900 dark:text-white mb-4">Products by category</h3>
            <div className="space-y-3">
              {Object.entries(stats.products).map(([key, count]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="fin-num font-semibold text-slate-900 dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
