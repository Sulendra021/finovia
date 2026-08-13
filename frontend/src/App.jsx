import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreditCardsPage from "./pages/CreditCardsPage.jsx";
import BankAccountsPage from "./pages/BankAccountsPage.jsx";
import DematPage from "./pages/DematPage.jsx";
import LoansPage from "./pages/LoansPage.jsx";
import InsurancePage from "./pages/InsurancePage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import CalculatorsPage from "./pages/CalculatorsPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminCreditCards from "./pages/admin/AdminCreditCards.jsx";
import AdminBankAccounts from "./pages/admin/AdminBankAccounts.jsx";
import AdminDematAccounts from "./pages/admin/AdminDematAccounts.jsx";
import AdminLoans from "./pages/admin/AdminLoans.jsx";
import AdminInsurance from "./pages/admin/AdminInsurance.jsx";
import AdminOffers from "./pages/admin/AdminOffers.jsx";
import AdminBlog from "./pages/admin/AdminBlog.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminComingSoon from "./pages/admin/AdminComingSoon.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
  }, [location.pathname]);

  const isBareLayout = location.pathname === "/auth" || location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<CreditCardsPage />} />
        <Route path="/bank" element={<BankAccountsPage />} />
        <Route path="/demat" element={<DematPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/calculators" element={<CalculatorsPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="credit-cards" element={<AdminCreditCards />} />
          <Route path="bank-accounts" element={<AdminBankAccounts />} />
          <Route path="demat-accounts" element={<AdminDematAccounts />} />
          <Route path="loans" element={<AdminLoans />} />
          <Route path="insurance" element={<AdminInsurance />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="users" element={<AdminUsers />} />
          <Route
            path="whatsapp"
            element={<AdminComingSoon title="WhatsApp Automation" requirement="Needs a WhatsApp Business API account and Meta app approval to send real messages - can't be faked with a demo key." />}
          />
          <Route
            path="ai"
            element={<AdminComingSoon title="AI Recommendations" requirement="Needs a paid LLM or recommendation-engine API key to generate real personalized suggestions." />}
          />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
      {!isBareLayout && <Footer />}
    </div>
  );
}
