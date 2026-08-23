import React from "react";
import Seo from "../components/Seo.jsx";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Seo title="Terms of Service - Finovia" description="Review the terms and conditions governing the use of Finovia's financial comparison platform." />
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="fin-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Effective Date: August 21, 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Finovia, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you must not use our website or services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Informational Purpose Disclaimer</h2>
          <p>
            Finovia is an online financial product comparison and referral platform. Finovia is <strong>not a bank, lender, or registered financial adviser</strong>. All rate information, reward details, and calculation outputs (EMI, SIP, FD) are provided strictly for informational purposes and do not constitute binding financial advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Third-Party Financial Products & Approvals</h2>
          <p>
            All financial products listed on Finovia are issued by third-party banks, non-banking financial companies (NBFCs), or financial service providers. Credit approval, eligibility assessment, and product issuance remain under the sole discretion of the issuing institution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. User Responsibilities & Prohibited Acts</h2>
          <p>
            Users must provide accurate personal contact information during lead applications. Any automated scraping, API abuse, rate-limit bypassing, or unauthorized access to Finovia databases is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            Finovia and its operators shall not be held liable for any indirect, incidental, or consequential damages arising out of your reliance on information presented on the platform or third-party bank application outcomes.
          </p>
        </section>
      </div>
    </div>
  );
}
