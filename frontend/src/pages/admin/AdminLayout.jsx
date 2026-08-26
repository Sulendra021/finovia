import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, CreditCard, Landmark, TrendingUp, Wallet, ShieldCheck,
  Tag, Newspaper, Users, MessageCircle, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Menu, X,
  LogOut, Sun, Moon, ArrowLeft, KeyRound, UserCheck,
} from "lucide-react";
import Seo from "../../components/Seo.jsx";
import { Logo } from "../../components/shared.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/credit-cards", label: "Credit Cards", icon: CreditCard },
  { to: "/admin/bank-accounts", label: "Bank Accounts", icon: Landmark },
  { to: "/admin/demat-accounts", label: "Demat Accounts", icon: TrendingUp },
  { to: "/admin/loans", label: "Loans", icon: Wallet },
  { to: "/admin/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/admin/offers", label: "Offers & Banners", icon: Tag },
  { to: "/admin/leads", label: "Customer Leads", icon: UserCheck },
  { to: "/admin/blog", label: "Blog & News", icon: Newspaper },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/whatsapp", label: "WhatsApp Automation", icon: MessageCircle },
  { to: "/admin/ai", label: "AI Recommendations", icon: Sparkles },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Seo title="Admin Panel" description="Manage Finovia's products, offers and users." />

      {/* Top Header Bar for Admin Suite */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle admin sidebar"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <NavLink to="/" className="fin-focus rounded-lg flex items-center gap-2">
              <Logo />
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                Admin Console
              </span>
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="fin-focus hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
            </button>

            <button
              onClick={toggleTheme}
              className="fin-focus w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {user && (
              <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="fin-focus flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {user.name?.[0]?.toUpperCase() || "A"}
                  </div>
                  <span className="hidden md:inline-block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/admin/settings");
                        setUserMenuOpen(false);
                      }}
                      className="fin-focus w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <KeyRound className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Change Password
                    </button>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                      className="fin-focus w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 transition-all duration-300 z-30 flex flex-col justify-between shrink-0 ${
          /* Mobile slide-over */
          mobileOpen ? "fixed inset-y-0 left-0 w-64 shadow-2xl block z-50" : "hidden lg:flex lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-y-auto"
        } ${
          /* Desktop collapsed toggle */
          collapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        <div>
          {/* Header & Toggle button */}
          <div className="flex items-center justify-between mb-4 px-2">
            {!collapsed && (
              <p className="fin-display text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                Admin Menu
              </p>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `fin-focus flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  } ${collapsed ? "justify-center" : ""}`
                }
                title={collapsed ? l.label : undefined}
              >
                <l.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{l.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto transition-all duration-300">
        <Outlet />
      </main>
      </div>
    </div>
  );
}
