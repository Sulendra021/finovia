import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, CreditCard, Landmark, TrendingUp, Wallet, ShieldCheck,
  Tag, Newspaper, Users, MessageCircle, Sparkles,
} from "lucide-react";
import Seo from "../../components/Seo.jsx";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/credit-cards", label: "Credit Cards", icon: CreditCard },
  { to: "/admin/bank-accounts", label: "Bank Accounts", icon: Landmark },
  { to: "/admin/demat-accounts", label: "Demat Accounts", icon: TrendingUp },
  { to: "/admin/loans", label: "Loans", icon: Wallet },
  { to: "/admin/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/admin/offers", label: "Offers & Banners", icon: Tag },
  { to: "/admin/blog", label: "Blog & News", icon: Newspaper },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/whatsapp", label: "WhatsApp Automation", icon: MessageCircle },
  { to: "/admin/ai", label: "AI Recommendations", icon: Sparkles },
];

export default function AdminLayout() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row">
      <Seo title="Admin Panel" description="Manage Finovia's products, offers and users." />
      <aside className="lg:w-64 shrink-0 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-4 lg:p-5">
        <p className="fin-display text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide px-2 mb-3">Admin Panel</p>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `fin-focus flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`
              }
            >
              <l.icon className="w-4 h-4 shrink-0" /> {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-5 lg:p-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}
