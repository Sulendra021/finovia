import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AccessControlGate from "./components/AccessControlGate.jsx";
import { Landmark, TrendingUp, Wallet, ShieldCheck, Tag } from "lucide-react";
import { PageTransition } from "./components/transitions/PageTransition.jsx";
import { PageSkeleton } from "./components/ui/Skeleton.jsx";

// Route-level Code Splitting for heavy pages
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CreditCardsPage = lazy(() => import("./pages/CreditCardsPage.jsx"));
const CompareCardsPage = lazy(() => import("./pages/CompareCardsPage.jsx"));
const CreditCardDetailsPage = lazy(() => import("./pages/CreditCardDetailsPage.jsx"));
const CreditCardApplyPage = lazy(() => import("./pages/CreditCardApplyPage.jsx"));
const BankAccountsPage = lazy(() => import("./pages/BankAccountsPage.jsx"));
const DematPage = lazy(() => import("./pages/DematPage.jsx"));
const LoansPage = lazy(() => import("./pages/LoansPage.jsx"));
const InsurancePage = lazy(() => import("./pages/InsurancePage.jsx"));
const OffersPage = lazy(() => import("./pages/OffersPage.jsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.jsx"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage.jsx"));
const CalculatorsPage = lazy(() => import("./pages/CalculatorsPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage.jsx"));

// Admin lazy routes
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminCreditCards = lazy(() => import("./pages/admin/AdminCreditCards.jsx"));
const EditCreditCardPage = lazy(() => import("./pages/admin/EditCreditCardPage.jsx"));
const AdminBankAccounts = lazy(() => import("./pages/admin/AdminBankAccounts.jsx"));
const AdminDematAccounts = lazy(() => import("./pages/admin/AdminDematAccounts.jsx"));
const AdminLoans = lazy(() => import("./pages/admin/AdminLoans.jsx"));
const AdminInsurance = lazy(() => import("./pages/admin/AdminInsurance.jsx"));
const AdminOffers = lazy(() => import("./pages/admin/AdminOffers.jsx"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog.jsx"));
const AdminLeadsPage = lazy(() => import("./pages/admin/AdminLeadsPage.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.jsx"));
const AdminComingSoon = lazy(() => import("./pages/admin/AdminComingSoon.jsx"));

const GenericEditResourcePage = lazy(() => import("./pages/admin/GenericEditResourcePage.jsx"));
const BulkJsonPipelinePage = lazy(() => import("./pages/admin/BulkJsonPipelinePage.jsx"));

const EditLeadPage = lazy(() => import("./pages/admin/EditLeadPage.jsx"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage.jsx"));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
  }, [location.pathname]);

  const isBareLayout = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-200">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "!bg-white dark:!bg-slate-900 !text-slate-900 dark:!text-slate-100 !border !border-slate-200 dark:!border-slate-800 !rounded-xl !shadow-lg",
          duration: 4000,
        }}
      />
      {!isBareLayout && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      <PageTransition>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cards" element={<CreditCardsPage />} />
            <Route path="/cards/compare" element={<CompareCardsPage />} />
            <Route path="/cards/:id" element={<CreditCardDetailsPage />} />
            <Route path="/cards/:id/apply" element={<CreditCardApplyPage />} />
            <Route
              path="/bank"
              element={
                <AccessControlGate
                  eyebrow="Bank Accounts"
                  title="Bank Accounts"
                  subtitle="Compare interest rates, minimum balance requirements and features across savings, salary and current accounts."
                  icon={Landmark}
                >
                  <BankAccountsPage />
                </AccessControlGate>
              }
            />
            <Route
              path="/demat"
              element={
                <AccessControlGate
                  eyebrow="Demat Accounts"
                  title="Demat Accounts"
                  subtitle="Compare brokerage, annual maintenance charges and platform features across India's top discount and full-service brokers."
                  icon={TrendingUp}
                >
                  <DematPage />
                </AccessControlGate>
              }
            />
            <Route
              path="/loans"
              element={
                <AccessControlGate
                  eyebrow="Loans"
                  title="Loans"
                  subtitle="From a quick personal loan to a 30-year home loan - compare rates and estimate your EMI before you apply."
                  icon={Wallet}
                >
                  <LoansPage />
                </AccessControlGate>
              }
            />
            <Route
              path="/insurance"
              element={
                <AccessControlGate
                  eyebrow="Insurance"
                  title="Insurance"
                  subtitle="Health, life, motor and travel cover from insurers with strong claim settlement track records."
                  icon={ShieldCheck}
                >
                  <InsurancePage />
                </AccessControlGate>
              }
            />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* Dedicated full-page Edit routes outside AdminLayout sidebar */}
            <Route
              path="/admin/credit-cards/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <EditCreditCardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bank-accounts/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Bank Account"
                    listPath="/admin/bank-accounts"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.bankAccountsApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.bankAccounts.update(id, data))}
                    formFields={[
                      { name: "name", label: "Account name", required: true },
                      { name: "bank", label: "Bank", required: true },
                      { name: "imageUrl", label: "Logo Image URL", placeholder: "https://example.com/bank-logo.png" },
                      { name: "imageAlt", label: "Logo Alt Text", placeholder: "SBI Logo" },
                      { name: "type", label: "Type", type: "select", options: ["Savings", "Current", "Salary", "Zero Balance"], required: true },
                      { name: "interest", label: "Interest rate (% p.a.)" },
                      { name: "minBalance", label: "Minimum balance" },
                      { name: "features", label: "Features", type: "tags", placeholder: "Free debit card, UPI enabled" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/demat-accounts/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Demat Account"
                    listPath="/admin/demat-accounts"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.dematAccountsApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.dematAccounts.update(id, data))}
                    formFields={[
                      { name: "name", label: "Broker name", required: true },
                      { name: "imageUrl", label: "Logo Image URL", placeholder: "https://example.com/logo.png" },
                      { name: "imageAlt", label: "Logo Alt Text", placeholder: "Zerodha Logo" },
                      { name: "brokerage", label: "Brokerage", required: true, placeholder: "e.g. ₹20 flat / order" },
                      { name: "amc", label: "AMC (₹/year)" },
                      { name: "opening", label: "Account opening fee", placeholder: "Free" },
                      { name: "rating", label: "Rating (0-5)", type: "number" },
                      { name: "features", label: "Features", type: "tags", placeholder: "Kite trading app, Free equity investing" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/loans/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Loan"
                    listPath="/admin/loans"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.loansApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.loans.update(id, data))}
                    formFields={[
                      { name: "name", label: "Loan type", required: true, placeholder: "e.g. Personal Loan" },
                      { name: "imageUrl", label: "Logo / Banner Image URL", placeholder: "https://example.com/loan.png" },
                      { name: "imageAlt", label: "Image Alt Text", placeholder: "Personal Loan" },
                      { name: "rate", label: "Interest rate", required: true, placeholder: "e.g. 10.5% - 18%" },
                      { name: "amount", label: "Amount range", required: true, placeholder: "e.g. 50,000 - 40,00,000" },
                      { name: "tenure", label: "Tenure", required: true, placeholder: "e.g. 1 - 5 yrs" },
                      { name: "processingFee", label: "Processing fee", placeholder: "e.g. Up to 2.5%" },
                      { name: "desc", label: "Description", type: "textarea" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/insurance/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Insurance Plan"
                    listPath="/admin/insurance"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.insuranceApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.insurance.update(id, data))}
                    formFields={[
                      { name: "name", label: "Plan name", required: true, placeholder: "e.g. Health Insurance" },
                      { name: "provider", label: "Provider", required: true },
                      { name: "imageUrl", label: "Logo Image URL", placeholder: "https://example.com/insurance.png" },
                      { name: "imageAlt", label: "Image Alt Text", placeholder: "HDFC ERGO Logo" },
                      { name: "premium", label: "Starting premium", required: true, placeholder: "e.g. 399 / month" },
                      { name: "coverage", label: "Coverage", placeholder: "e.g. Up to ₹1 Cr" },
                      { name: "claimRatio", label: "Claim settlement ratio", placeholder: "e.g. 98.5%" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/offers/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Offer"
                    listPath="/admin/offers"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.offersApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.offers.update(id, data))}
                    formFields={[
                      { name: "title", label: "Offer title", required: true },
                      { name: "bank", label: "Bank / partner", required: true },
                      { name: "imageUrl", label: "Logo / Banner Image URL", placeholder: "https://example.com/offer.png" },
                      { name: "imageAlt", label: "Image Alt Text", placeholder: "Offer Banner" },
                      { name: "category", label: "Category", required: true, placeholder: "e.g. Cashback, Loans" },
                      { name: "expiry", label: "Expiry", required: true, placeholder: "e.g. 31 Aug 2026 or Ongoing" },
                      { name: "color", label: "Badge color", type: "select", options: ["blue", "emerald", "amber", "rose", "violet"] },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <GenericEditResourcePage
                    resourceName="Blog Post"
                    listPath="/admin/blog"
                    fetchApi={(id) => import("./services/api.js").then((m) => m.blogApi.getOne(id))}
                    updateApi={(id, data) => import("./services/api.js").then((m) => m.adminResourceApi.blog.update(id, data))}
                    formFields={[
                      { name: "title", label: "Title", required: true, placeholder: "Post Title" },
                      { name: "category", label: "Category", required: true, placeholder: "e.g. Credit Cards, Personal Finance" },
                      { name: "imageUrl", label: "Featured Image URL", placeholder: "https://images.unsplash.com/photo-..." },
                      { name: "readTime", label: "Read Time", placeholder: "e.g. 5 min read" },
                      { name: "author", label: "Author Name", placeholder: "Finovia Editorial Team" },
                      { name: "excerpt", label: "Short Summary / Excerpt", type: "textarea", required: true, placeholder: "A brief summary..." },
                      { name: "content", label: "Full Article Content", type: "textarea", required: true, placeholder: "Write full blog article here..." },
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/leads/:id/edit"
              element={
                <ProtectedRoute adminOnly>
                  <EditLeadPage />
                </ProtectedRoute>
              }
            />

            {/* Dedicated full-page Bulk JSON Pipeline route outside AdminLayout sidebar */}
            <Route
              path="/admin/bulk-json-pipeline"
              element={
                <ProtectedRoute adminOnly>
                  <BulkJsonPipelinePage />
                </ProtectedRoute>
              }
            />

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
              <Route path="leads" element={<AdminLeadsPage />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="users" element={<AdminUsers />} />
              <Route
                path="whatsapp"
                element={<AdminComingSoon title="WhatsApp Automation" requirement="Needs a WhatsApp Business API account and Meta app approval to send real messages." />}
              />
              <Route
                path="ai"
                element={<AdminComingSoon title="AI Recommendations" requirement="Needs a paid LLM or recommendation-engine API key to generate real personalized suggestions." />}
              />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </PageTransition>
      {!isBareLayout && <Footer />}
    </div>
  );
}
