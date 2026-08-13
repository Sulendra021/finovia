import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NAV } from "../data/mockData.js";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="fin-display text-white font-bold">F</span>
            </div>
            <span className="fin-display font-bold text-lg text-white">Finovia</span>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">
            Smart financial choices, made simple. Compare and apply for credit cards, loans, insurance, and more — all in one place.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="fin-focus w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-white hover:bg-slate-800">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="fin-display text-white text-sm font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            {NAV.slice(0, 5).map((item) => (
              <li key={item.key}>
                <Link to={`/${item.key}`} className="fin-focus text-slate-400 dark:text-slate-500 hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="fin-display text-white text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
            <li><button className="fin-focus hover:text-white">About Finovia</button></li>
            <li><Link to="/blog" className="fin-focus hover:text-white">Blog & News</Link></li>
            <li><Link to="/offers" className="fin-focus hover:text-white">Offers & Deals</Link></li>
            <li><button className="fin-focus hover:text-white">Partner With Us</button></li>
          </ul>
        </div>
        <div>
          <h4 className="fin-display text-white text-sm font-semibold mb-3">Get in touch</h4>
          <ul className="space-y-2.5 text-sm text-slate-400 dark:text-slate-500">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 1800-123-4567</li>
            <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> hello@finovia.in</li>
            <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> New Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Finovia Financial Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="fin-focus hover:text-slate-300">Privacy Policy</button>
            <button className="fin-focus hover:text-slate-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
