import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { PageShell } from "../components/shared.jsx";
import { authApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = mode === "login"
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register(form);
      login(data);
      navigate(data.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <button onClick={() => navigate("/")} className="fin-focus flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Finovia
          </button>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-7">
            <button onClick={() => setMode("login")} className={`fin-focus flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "login" ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Login</button>
            <button onClick={() => setMode("register")} className={`fin-focus flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === "register" ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Register</button>
          </div>
          <h2 className="fin-display text-xl font-bold text-slate-900 dark:text-white">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mode === "login" ? "Log in to view your saved comparisons and applications." : "It takes less than a minute — no fees, ever."}</p>

          {error && (
            <div className="mt-4 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            {mode === "register" && (
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Full name</label>
                <input name="name" value={form.name} onChange={onChange} required className="fin-focus w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500" placeholder="Aditi Sharma" />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Email address</label>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" name="email" value={form.email} onChange={onChange} required className="fin-focus w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
              <div className="relative mt-1.5">
                <input type={showPw ? "text" : "password"} name="password" value={form.password} onChange={onChange} required minLength={6} className="fin-focus w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-blue-500" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="fin-focus absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="fin-focus w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
            {mode === "login" ? "New to Finovia?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="fin-focus text-blue-600 font-semibold">
              {mode === "login" ? "Register" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
