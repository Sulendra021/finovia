import React from "react";
import { Construction } from "lucide-react";

// WhatsApp Automation and AI Recommendations both need real, paid third-party
// credentials (a WhatsApp Business API account + Meta approval, and an LLM/
// recommendation API key respectively) to do anything functional - there's no
// way to build a working version of either without those. This page marks
// them honestly as roadmap items rather than faking a demo.
export default function AdminComingSoon({ title, requirement }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
      <Construction className="w-8 h-8 text-amber-500 mx-auto mb-4" />
      <h2 className="fin-display text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">{requirement}</p>
    </div>
  );
}
