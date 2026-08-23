import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LayoutDashboard, ShieldCheck as AdminIcon, LogOut, Calculator } from "lucide-react";
import { Logo } from "./shared.jsx";
import { NAV } from "../data/mockData.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const NavbarNav = [
  ...NAV.map((item) => ({ key: item.key, label: item.label, path: `/${item.key}`, icon: item.icon })),
  { key: "calculators", label: "Calculators", path: "/calculators", icon: Calculator },
];

export default function Navbar({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const { mode, theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setMenuOpen]);

  const desktopLinkClass = ({ isActive }) =>
    `fin-focus fin-link-rtl px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    }`;

  const renderThemeIcon = (size = "w-4 h-4") => {
    return theme === "dark" ? <Moon className={size} /> : <Sun className={size} />;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="fin-focus rounded-lg shrink-0">
          <Logo />
        </NavLink>

        {/* Desktop Navigation links from NavbarNav loop */}
        <nav className="hidden lg:flex items-center gap-2">
          {NavbarNav.map((item) => (
            <NavLink key={item.key} to={item.path} className={desktopLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop User / Theme actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={`Theme: ${mode.toUpperCase()} (Click to change)`}
            className="fin-focus fin-button-interactive min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {renderThemeIcon("w-4 h-4")}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="fin-focus flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                  {user.name?.split(" ")[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-50"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setUserMenuOpen(false);
                    }}
                    className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setUserMenuOpen(false);
                      }}
                      className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <AdminIcon className="w-4 h-4" /> Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      navigate("/");
                    }}
                    className="fin-focus w-full flex items-center gap-2 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/auth?mode=login")}
                className="fin-focus fin-link-rtl px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth?mode=register")}
                className="fin-focus fin-button-interactive px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 min-h-[40px]"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu & theme buttons */}
        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={`Theme: ${mode.toUpperCase()}`}
            className="fin-focus p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {renderThemeIcon("w-5 h-5")}
          </button>
          <button
            className="fin-focus p-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur px-4 py-4 space-y-1.5 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {NavbarNav.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `fin-focus w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors ${isActive
                  ? "text-blue-700 bg-blue-50 dark:bg-blue-950/80 dark:text-blue-400 font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`
              }
            >
              <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" /> {item.label}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="fin-focus w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3"
                >
                  <LayoutDashboard className="w-5 h-5 text-blue-600 shrink-0" /> Dashboard
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setMenuOpen(false);
                    }}
                    className="fin-focus w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3"
                  >
                    <AdminIcon className="w-5 h-5 text-purple-600 shrink-0" /> Admin Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="fin-focus w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 flex items-center gap-3"
                >
                  <LogOut className="w-5 h-5 shrink-0" /> Log out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    navigate("/auth");
                    setMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/auth");
                    setMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-sm shadow-blue-600/30"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
