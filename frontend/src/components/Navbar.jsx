import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard, ShieldCheck as AdminIcon } from "lucide-react";
import { Logo } from "./shared.jsx";
import { NAV } from "../data/mockData.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `fin-focus px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="fin-focus rounded-lg">
          <Logo />
        </NavLink>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink key={item.key} to={`/${item.key}`} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/calculators" className={linkClass}>Calculators</NavLink>
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="fin-focus w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="fin-focus flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name?.split(" ")[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5" onMouseLeave={() => setUserMenuOpen(false)}>
                  <button onClick={() => { navigate("/dashboard"); setUserMenuOpen(false); }} className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                  {isAdmin && (
                    <button onClick={() => { navigate("/admin"); setUserMenuOpen(false); }} className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <AdminIcon className="w-4 h-4" /> Admin Panel
                    </button>
                  )}
                  <button onClick={() => { logout(); setUserMenuOpen(false); navigate("/"); }} className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950">
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate("/auth")} className="fin-focus px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg">
                Login
              </button>
              <button onClick={() => navigate("/auth")} className="fin-focus px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30">
                Register
              </button>
            </>
          )}
        </div>
        <div className="lg:hidden flex items-center gap-1">
          <button onClick={toggleTheme} aria-label="Toggle dark mode" className="fin-focus p-2 rounded-lg text-slate-600 dark:text-slate-300">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="fin-focus p-2 rounded-lg text-slate-700 dark:text-slate-200" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.key}
              to={`/${item.key}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `fin-focus w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  isActive ? "text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"
                }`
              }
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </NavLink>
          ))}
          <NavLink to="/calculators" onClick={() => setMenuOpen(false)} className="fin-focus w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
            Calculators
          </NavLink>
          {user ? (
            <>
              <button onClick={() => { navigate("/dashboard"); setMenuOpen(false); }} className="fin-focus w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200">Dashboard</button>
              {isAdmin && (
                <button onClick={() => { navigate("/admin"); setMenuOpen(false); }} className="fin-focus w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200">Admin Panel</button>
              )}
              <button onClick={() => { logout(); setMenuOpen(false); navigate("/"); }} className="fin-focus w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600">Log out</button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <button onClick={() => { navigate("/auth"); setMenuOpen(false); }} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg">Login</button>
              <button onClick={() => { navigate("/auth"); setMenuOpen(false); }} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg">Register</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
