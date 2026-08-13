import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { PageShell, PageHero, CreditCardTile } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi } from "../services/api.js";
import { CREDIT_CARDS } from "../data/mockData.js";

export default function CreditCardsPage() {
  const { data: cards } = useLiveData(creditCardsApi.getAll, CREDIT_CARDS);
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Cashback", "Travel", "Rewards", "Premium"];
  const filtered = useMemo(
    () => (filter === "All" ? cards : cards.filter((c) => c.category === filter)),
    [filter, cards]
  );
  return (
    <PageShell>
      <Seo title="Credit Cards" description="Compare credit cards from top Indian banks by cashback, travel perks and annual fees." />
      <PageHero eyebrow="Credit Cards" title="Compare credit cards from top banks" subtitle="Filter by what matters to you — cashback, travel perks, or premium benefits — and apply to the one that fits your spending." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-1" />
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`fin-focus px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                filter === c ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => <CreditCardTile key={c.id || c._id} card={c} />)}
        </div>
      </div>
    </PageShell>
  );
}
