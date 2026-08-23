import React from "react";
import Seo from "../components/Seo.jsx";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Seo title="Privacy Policy - Finovia" description="Learn about how Finovia collects, uses, processes, and protects your data." />
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="fin-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Effective Date: August 21, 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            Finovia ("we", "our", or "us") operates a financial products discovery, comparison, and lead-generation marketplace. This Privacy Policy outlines how we collect, process, store, and protect your personal information when you use our web platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>User Profile Data:</strong> Name, email address, and encrypted passwords provided during account registration.</li>
            <li><strong>Application Data:</strong> Name, email, and phone number submitted when applying for credit cards, bank accounts, demat accounts, loans, or insurance.</li>
            <li><strong>Telemetry & Technical Data:</strong> IP addresses, browser information, user-agent strings, and request correlation IDs (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">X-Request-ID</code>) for logging and security monitoring.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Financial Data Safeguards</h2>
          <p>
            Finovia is a product recommendation platform and referral portal. We do <strong>NOT</strong> collect, store, or process net banking passwords, UPI PINs, CVV numbers, or credit card security codes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Data Security</h2>
          <p>
            We implement industry-standard safeguards including SSL/TLS encryption for data in transit, bcrypt password hashing (10 rounds), automated parameter sanitization in server logs, and parameterized database queries via Prisma ORM.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data access or account deletion, please contact us at <a href="mailto:privacy@finovia.in" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@finovia.in</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
