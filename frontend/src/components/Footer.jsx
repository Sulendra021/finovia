import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./shared.jsx";

const FooterNav = {
  products: [
    { label: "Credit Cards", path: "/cards" },
    { label: "Bank Accounts", path: "/bank", comingSoon: true },
    { label: "Demat Accounts", path: "/demat", comingSoon: true },
    { label: "Loans", path: "/loans", comingSoon: true },
    { label: "Insurance", path: "/insurance", comingSoon: true },
    { label: "Offers", path: "/offers" },
    { label: "Blog", path: "/blog" },
  ],
  company: [
    { label: "About Finovia", path: "#", isButton: true },
    { label: "Blog & News", path: "/blog" },
    { label: "Offers & Deals", path: "/offers" },
    { label: "Partner With Us", path: "#", isButton: true },
  ],
  socials: [
    { name: "Facebook", Icon: Facebook, href: "#" },
    { name: "Twitter", Icon: Twitter, href: "#" },
    { name: "Instagram", Icon: Instagram, href: "#" },
    { name: "LinkedIn", Icon: Linkedin, href: "#" },
  ],
  contact: [
    { Icon: Phone, text: "1800-123-4567" },
    { Icon: Mail, text: "hello@finovia.in" },
    { Icon: MapPin, text: "New Delhi, India" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-of-service" },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 border-t border-slate-800 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Brand Info & Socials */}
        <div>
          <div className="mb-3">
            <Logo dark />
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-400 max-w-sm leading-relaxed">
            Smart financial choices, made simple. Compare and apply for credit cards, loans, insurance, and more - all in one place.
          </p>
          <div className="flex gap-3 mt-5">
            {FooterNav.socials.map(({ Icon, name, href }, i) => (
              <a
                key={i}
                href={href}
                className="fin-focus w-10 h-10 rounded-full bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-500 transition-all duration-200"
                aria-label={`Follow Finovia on ${name}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Products */}
        <div>
          <h4 className="fin-display text-white text-sm font-semibold mb-3">Products</h4>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            {FooterNav.products.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className="fin-focus fin-link-rtl text-slate-300 dark:text-slate-400 hover:text-white transition-colors duration-200 inline-flex flex-col items-start py-0.5"
                >
                  {item.comingSoon && (
                    <span className="text-[8px] font-extrabold uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 leading-none mb-0.5 tracking-wider">
                      SOON
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company & Contact */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="fin-display text-white text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-400">
              {FooterNav.company.map((item, idx) => (
                <li key={idx}>
                  {item.isButton ? (
                    <button className="fin-focus fin-link-rtl text-slate-300 dark:text-slate-400 hover:text-white transition-colors duration-200 text-left py-0.5">
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="fin-focus fin-link-rtl text-slate-300 dark:text-slate-400 hover:text-white transition-colors duration-200 inline-flex flex-col items-start py-0.5"
                    >
                      {item.comingSoon && (
                        <span className="text-[8px] font-extrabold uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 leading-none mb-0.5 tracking-wider">
                          SOON
                        </span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="fin-display text-white text-sm font-semibold mb-3">Get in touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 dark:text-slate-400">
              {FooterNav.contact.map(({ Icon, text }, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-400 text-center sm:text-left">
          <p>© 2026 Finovia Financial Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            {FooterNav.legal.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="fin-focus fin-link-rtl text-slate-400 dark:text-slate-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
