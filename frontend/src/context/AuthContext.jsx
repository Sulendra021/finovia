import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("finovia_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("finovia_token");
    if (!token) {
      setChecking(false);
      return;
    }
    authApi
      .me()
      .then((data) => {
        setUser(data);
        localStorage.setItem("finovia_user", JSON.stringify(data));
      })
      .catch(() => {
        localStorage.removeItem("finovia_token");
        localStorage.removeItem("finovia_user");
        setUser(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const login = (data) => {
    localStorage.setItem("finovia_token", data.token);
    const userData = { _id: data._id, name: data.name, email: data.email, role: data.role };
    localStorage.setItem("finovia_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("finovia_token");
    localStorage.removeItem("finovia_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checking, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
