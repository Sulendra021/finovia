import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PageShell } from "../components/shared.jsx";
import { authApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthHero } from "../components/auth/AuthHero.jsx";
import { AuthForm } from "../components/auth/AuthForm.jsx";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState(initialMode); // login | register | forgot | reset | otp

  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "register" || qMode === "login") {
      setMode(qMode);
    }
  }, [searchParams]);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", newPassword: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resetTokenSimulated, setResetTokenSimulated] = useState("");
  const [simulatedOtp, setSimulatedOtp] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      if (mode === "login") {
        const data = await authApi.login({ email: form.email, password: form.password });
        login(data);
        navigate(data.role === "admin" ? "/admin" : "/");
      } else if (mode === "register") {
        const data = await authApi.register(form);
        setSuccessMsg(data.message || "Account created! Please check your email for the OTP.");
        // Redirect to OTP mode so user enters OTP received via email
        setTimeout(() => {
          setMode("otp");
        }, 1200);
      } else if (mode === "forgot") {
        const res = await authApi.forgotPassword(form.email);
        setSuccessMsg(res.message);
        if (res.resetToken) {
          setResetTokenSimulated(res.resetToken);
        }
        // Redirect to OTP mode so user enters OTP received via email
        setTimeout(() => {
          setMode("otp");
        }, 1200);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const onSendOtp = async () => {
    if (!form.email) {
      setError("Please enter your email address first.");
      return;
    }
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await authApi.sendOtp(form.email);
      setSuccessMsg(res.message);
      if (res.otp) {
        setSimulatedOtp(res.otp);
        setForm((prev) => ({ ...prev, otp: res.otp }));
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    if (!form.email || !form.otp) {
      setError("Email and 6-digit OTP code are required.");
      return;
    }
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await authApi.verifyOtp(form.email, form.otp);
      setSuccessMsg(res.message);
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const tokenToUse = resetTokenSimulated || "demo-token";
      const res = await authApi.resetPassword({ token: tokenToUse, newPassword: form.newPassword });
      setSuccessMsg(res.message);
      setTimeout(() => {
        setMode("login");
        setForm({ name: "", email: form.email, password: "", newPassword: "", otp: "" });
        setSuccessMsg("Password reset successfully! Please sign in with your new password.");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Password reset failed. Please request a new link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <AuthHero />
            <AuthForm
              mode={mode}
              setMode={(newMode) => {
                setMode(newMode);
                setError("");
                setSuccessMsg("");
              }}
              form={form}
              onChange={onChange}
              onSubmit={onSubmit}
              onResetPasswordSubmit={onResetPasswordSubmit}
              onSendOtp={onSendOtp}
              onVerifyOtp={onVerifyOtp}
              loading={loading}
              error={error}
              successMsg={successMsg}
              resetTokenSimulated={resetTokenSimulated}
              simulatedOtp={simulatedOtp}
              setError={setError}
              showPw={showPw}
              setShowPw={setShowPw}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
