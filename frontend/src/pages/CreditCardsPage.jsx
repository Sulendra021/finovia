import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { PageShell, PageHero, CreditCardTile } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi, wishlistApi, applicationsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { CatalogFilterBar } from "../components/shared/CatalogFilterBar.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard as CardIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { ApplyLeadModal } from "../components/shared/ApplyLeadModal.jsx";

export default function CreditCardsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { data: cards, loading } = useLiveData(creditCardsApi.getAll, []);
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [bankFilter, setBankFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [wishlistIds, setWishlistIds] = useState([]);
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
      const matchCat = filter === "All" || c.category === filter;
      const matchBank = bankFilter === "All" || c.bank === bankFilter;

      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchQuery =
        !cleanQuery ||
        (c.name && c.name.toLowerCase().includes(cleanQuery)) ||
        (c.bank && c.bank.toLowerCase().includes(cleanQuery)) ||
        (c.category && c.category.toLowerCase().includes(cleanQuery)) ||
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
    navigate(`/cards/${card.id || card._id}/apply`);
  };

  const handleToggleWishlist = async (card) => {
    const cardId = card.id || card._id;
    if (wishlistIds.includes(cardId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== cardId));
      toast.success(`Removed ${card.name} from saved items.`);
    } else {
      setWishlistIds((prev) => [...prev, cardId]);
      toast.success(`Saved ${card.name} to wishlist!`);
      if (user) {
        try {
          await wishlistApi.toggle({ productType: "CreditCard", productId: cardId });
        } catch (e) {
          // fallback
        }
      }
    }
  };

  return (
    <PageShell>
      <Seo title="Credit Cards" description="Compare credit cards from top Indian banks by cashback, travel perks and annual fees." />
      <PageHero
        eyebrow="Credit Cards"
        title="Compare credit cards from top banks"
        subtitle="Filter by what matters to you - cashback, travel perks, or premium benefits - and apply to the one that fits your spending."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
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
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto">
              <CardIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">No credit cards found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We couldn't find any credit cards matching your search criteria or selected filters.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="fin-focus px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCards.map((c) => (
                <CreditCardTile
                  key={c.id || c._id}
                  card={c}
                  onApply={handleApply}
                  isWishlisted={wishlistIds.includes(c.id || c._id)}
                  onToggleWishlist={handleToggleWishlist}
                  onClick={(card) => navigate(`/cards/${card.id || card._id}`)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Showing <span className="font-bold text-slate-800 dark:text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {Math.min(currentPage * itemsPerPage, filtered.length)}
                  </span>{" "}
                  of <span className="font-bold text-slate-800 dark:text-slate-200">{filtered.length}</span> cards
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="fin-focus p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`fin-focus px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                          : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="fin-focus p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
