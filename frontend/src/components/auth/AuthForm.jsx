import React from "react";
import { Mail, Eye, EyeOff, Loader2, Lock, User, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

export function AuthForm({
  mode,
  setMode,
  form,
  onChange,
  onSubmit,
  loading,
  error,
  successMsg,
  resetTokenSimulated,
  simulatedOtp,
  showPw,
  setShowPw,
  setError,
  onResetPasswordSubmit,
  onSendOtp,
  onVerifyOtp
}) {
  return (
    <div className="lg:col-span-6">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-10 transition-all duration-300">
        
        {/* Back Button for Forgot / Reset / OTP / Register */}
        {(mode === "forgot" || mode === "reset" || mode === "otp" || mode === "register") && (
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); }}
            className="fin-focus inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </button>
        )}

        <div className="text-left">
          <h2 className="fin-display text-2xl font-bold text-slate-900 dark:text-white">
            {mode === "login" && "Sign in to Finovia"}
            {mode === "register" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
            {mode === "reset" && "Set a new password"}
            {mode === "otp" && "OTP Verification"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === "login" && "Enter your credentials to access your saved comparisons."}
            {mode === "register" && "Sign up in seconds to start comparing financial products."}
            {mode === "forgot" && "Enter your registered email address and we'll generate a reset link."}
            {mode === "reset" && "Create a secure password with at least 6 characters."}
            {mode === "otp" && "Request and enter a 6-digit OTP code to verify your email address."}
          </p>
        </div>

        {error && (
          <div className="mt-5 text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl px-3.5 py-3 font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mt-5 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 rounded-xl px-3.5 py-3 font-medium flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={mode === "reset" ? onResetPasswordSubmit : mode === "otp" ? onVerifyOtp : onSubmit}>
          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full name</label>
              <div className="relative mt-1.5">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="fin-focus w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Aditi Sharma"
                />
              </div>
            </div>
          )}

          {(mode === "login" || mode === "register" || mode === "forgot" || mode === "otp") && (
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email address</label>
                {mode === "otp" && (
                  <button
                    type="button"
                    onClick={onSendOtp}
                    disabled={loading || !form.email}
                    className="fin-focus text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50"
                  >
                    Get OTP
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="fin-focus w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {mode === "otp" && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">6-digit OTP Code</label>
              <div className="relative mt-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="otp"
                  maxLength={6}
                  value={form.otp || ""}
                  onChange={onChange}
                  required
                  className="fin-focus fin-num tracking-widest text-center font-bold w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-base text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="123456"
                />
              </div>
            </div>
          )}

          {(mode === "login" || mode === "register") && (
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setError(""); }}
                    className="fin-focus text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={6}
                  className="fin-focus w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="fin-focus absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded-md"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === "reset" && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Password</label>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPw ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword || ""}
                  onChange={onChange}
                  required
                  minLength={6}
                  className="fin-focus w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="fin-focus absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded-md"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="fin-focus w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white text-sm font-semibold shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {mode === "login" && "Sign In"}
            {mode === "register" && "Create Account"}
            {mode === "forgot" && "Send Reset Link"}
            {mode === "reset" && "Update Password"}
            {mode === "otp" && "Verify OTP Code"}
          </button>
        </form>

        {(mode === "login" || mode === "register") && (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            {mode === "login" ? "New to Finovia?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="fin-focus text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
