import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow, CreditCardTile } from "../shared.jsx";

export function FeaturedCardsSection({ cards, navigate }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <SectionEyebrow>Featured</SectionEyebrow>
          <h2 className="fin-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight">
            Popular credit cards <span className="text-blue-600 dark:text-blue-400">this month</span>
          </h2>
        </div>
        <button
          onClick={() => navigate("/cards")}
          className="fin-focus fin-link-rtl hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-0.5"
        >
          View all <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {cards.slice(0, 3).map((c) => (
          <CreditCardTile
            key={c.id || c._id}
            card={c}
            onClick={(card) => navigate(`/cards/${card.id || card._id}`)}
            onApply={(card) => {
              if (card?.applyUrl) {
                let targetUrl = String(card.applyUrl).trim();
                if (!/^https?:\/\//i.test(targetUrl)) {
                  targetUrl = `https://${targetUrl}`;
                }
                window.open(targetUrl, "_blank", "noopener,noreferrer");
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
