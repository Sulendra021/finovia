import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { CatalogFilterBar } from "../components/shared/CatalogFilterBar.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CardsEmptyState } from "../components/cards/CardsEmptyState.jsx";
import { CardsGrid } from "../components/cards/CardsGrid.jsx";
import { CardsPagination } from "../components/cards/CardsPagination.jsx";

export default function CreditCardsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { data: cards, loading } = useLiveData(creditCardsApi.getAll, []);
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [bankFilter, setBankFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, bankFilter, searchQuery]);

  const cats = ["All", "Cashback", "Travel", "Rewards", "Premium"];

  const banksList = useMemo(() => {
    const bSet = new Set(cards.map((c) => c.bank).filter(Boolean));
    return ["All", ...Array.from(bSet)];
  }, [cards]);

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      // Robust category matching: match exact or case-insensitive category substring in categories array, single category, or features
      const targetCat = filter.toLowerCase();
      const cardCat = (c.category || "").toLowerCase();
      const cardCats = Array.isArray(c.categories) && c.categories.length > 0 
        ? c.categories.map((cat) => String(cat).toLowerCase()) 
        : [cardCat];

      const matchCat =
        filter === "All" ||
        cardCats.some((cat) => cat.includes(targetCat) || targetCat.includes(cat)) ||
        (Array.isArray(c.features) && c.features.some((f) => String(f).toLowerCase().includes(targetCat)));

      const matchBank = bankFilter === "All" || c.bank === bankFilter;

      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchQuery =
        !cleanQuery ||
        (c.name && c.name.toLowerCase().includes(cleanQuery)) ||
        (c.bank && c.bank.toLowerCase().includes(cleanQuery)) ||
        (c.category && c.category.toLowerCase().includes(cleanQuery)) ||
        (Array.isArray(c.categories) && c.categories.some((cat) => String(cat).toLowerCase().includes(cleanQuery))) ||
        (c.description && c.description.toLowerCase().includes(cleanQuery)) ||
        (Array.isArray(c.features) &&
          c.features.some((f) => String(f).toLowerCase().includes(cleanQuery)));

      return matchCat && matchBank && matchQuery;
    });
  }, [filter, bankFilter, searchQuery, cards]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setFilter("All");
    setBankFilter("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleApply = (card) => {
    if (card?.applyUrl) {
      let targetUrl = String(card.applyUrl).trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = `https://${targetUrl}`;
      }
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Application link not available.");
    }
  };

  return (
    <PageShell>
      <Seo title="Credit Cards" description="Compare credit cards from top Indian banks by cashback, travel perks and annual fees." />
      <PageHero
        eyebrow="Credit Cards"
        title="Compare credit cards from top banks"
        subtitle="Filter by what matters to you - cashback, travel perks, or premium benefits - and apply to the one that fits your spending."
        actions={
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-4 rounded-2xl shadow-sm flex flex-col gap-4 max-w-md w-full">
            <div>
              <h4 className="fin-display text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                Compare. Choose. Swipe With Confidence.
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Compare up to 3 credit cards side-by-side before you apply.
              </p>
            </div>
            <button
              onClick={() => navigate("/cards/compare")}
              className="fin-focus w-full py-1 sm:py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              Compare Cards
            </button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        <CatalogFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
          categories={cats}
          bankFilter={bankFilter}
          setBankFilter={setBankFilter}
          banksList={banksList}
          resetFilters={resetFilters}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <CardsEmptyState resetFilters={resetFilters} />
        ) : (
          <>
            <CardsGrid
              cards={paginatedCards}
              onApply={handleApply}
              onCardClick={(card) => navigate(`/cards/${card.id || card._id}`)}
            />

            <CardsPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </PageShell>
  );
}

