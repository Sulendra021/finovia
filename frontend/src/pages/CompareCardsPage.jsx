import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Plus, X, ArrowLeft, Check, Sparkles, CreditCard, ExternalLink, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, RatingStars } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { creditCardsApi } from "../services/api.js";

export default function CompareCardsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allCards, loading } = useLiveData(creditCardsApi.getAll, []);

  // Selected 3 slots for card comparison
  const [selectedIds, setSelectedIds] = useState(["", "", ""]);
  const [pickerIndex, setPickerIndex] = useState(null);

  useEffect(() => {
    if (pickerIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [pickerIndex]);

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const parts = idsParam.split(",").slice(0, 3);
      while (parts.length < 3) parts.push("");
      setSelectedIds(parts);
    } else if (allCards.length > 0) {
      // Default pick first 3 cards if no search param
      setSelectedIds([
        allCards[0]?.id || allCards[0]?._id || "",
        allCards[1]?.id || allCards[1]?._id || "",
        allCards[2]?.id || allCards[2]?._id || "",
      ]);
    }
  }, [searchParams, allCards]);

  const updateSelectedId = (index, newId) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
    const filterValid = updated.filter(Boolean);
    if (filterValid.length > 0) {
      setSearchParams({ ids: filterValid.join(",") });
    } else {
      setSearchParams({});
    }
  };

  const removeCard = (index) => {
    updateSelectedId(index, "");
  };

  // Derive card objects for the 3 slots
  const slots = selectedIds.map((id) => {
    if (!id) return null;
    return allCards.find((c) => (c.id || c._id) === id) || null;
  });

  return (
    <PageShell>
      <Seo
        title="Compare Credit Cards"
        description="Side-by-side comparison of up to 3 credit cards by annual fees, cashback, reward rate, and key perks."
      />
      <PageHero
        eyebrow="Side-by-Side Analysis"
        title="Compare Up To 3 Credit Cards"
        subtitle="Compare fees, reward rates, ratings, and exclusive perks side-by-side to find the ultimate card for your wallet."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/cards")}
            className="fin-focus inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Credit Cards
          </button>
        </div>

        {/* 3-Card Header Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((slotIdx) => {
            const card = slots[slotIdx];
            return (
              <div
                key={slotIdx}
                className="relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
              >
                {card ? (
                  <>
                    <button
                      onClick={() => removeCard(slotIdx)}
                      className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors"
                      title="Remove card"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      {/* Card Preview Banner */}
                      <div className="rounded-xl overflow-hidden shadow-sm">
                        {card.imageUrl ? (
                          <img
                            src={card.imageUrl}
                            alt={card.imageAlt || card.name}
                            loading="lazy"
                            className="w-full h-36 object-contain bg-slate-50 dark:bg-slate-950 p-2 border border-slate-100 dark:border-slate-800"
                          />
                        ) : (
                          <div
                            className={`bg-gradient-to-br ${
                              card.gradient || "from-blue-700 via-blue-600 to-blue-800"
                            } p-4 h-36 flex flex-col justify-between`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-7 h-5 rounded bg-gradient-to-br from-yellow-200 to-yellow-500" />
                              <span className="fin-display text-white text-[10px] font-bold uppercase tracking-widest">
                                {card.bank || "BANK"}
                              </span>
                            </div>
                            <div className="fin-num text-white/80 text-xs font-mono">•••• •••• •••• 4821</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {(Array.isArray(card.categories) && card.categories.length > 0 ? card.categories : [card.category]).filter(Boolean).map((cat, i) => (
                            <span key={i} className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="fin-display text-lg font-bold text-slate-900 dark:text-white leading-snug">
                          {card.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{card.bank}</p>
                        <div className="mt-2">
                          <RatingStars rating={card.rating} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <button
                        onClick={() => {
                          if (card?.applyUrl) {
                            let targetUrl = String(card.applyUrl).trim();
                            if (!/^https?:\/\//i.test(targetUrl)) {
                              targetUrl = `https://${targetUrl}`;
                            }
                            window.open(targetUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="w-full fin-focus fin-button-interactive text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5"
                      >
                        Apply Now <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPickerIndex(slotIdx)}
                        className="w-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 py-1.5"
                      >
                        Change Card
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                      <CreditCard className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="fin-display font-bold text-sm text-slate-900 dark:text-white">Slot {slotIdx + 1}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Select a card to compare</p>
                    </div>
                    <button
                      onClick={() => setPickerIndex(slotIdx)}
                      className="fin-focus mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Card
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="fin-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">Detailed Feature Matrix</h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 sm:hidden">
              ← Scroll to view →
            </span>
          </div>

          <div className="overflow-x-auto fin-scrollbar-x -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                  <th className="py-3 px-4 w-1/4">Feature</th>
                  {slots.map((c, idx) => (
                    <th key={idx} className="py-3 px-4 w-1/4 font-bold text-slate-900 dark:text-white">
                      {c ? c.name : `Slot ${idx + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Issuer Bank</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4 font-bold">{c ? c.bank : "-"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Category</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">
                      {c ? (
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(c.categories) && c.categories.length > 0 ? c.categories : [c.category]).filter(Boolean).map((cat, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                              {cat}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Joining Fee</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {c ? (c.joiningFee && c.joiningFee !== "Free" && !c.joiningFee.startsWith("₹") ? `₹${c.joiningFee}` : c.joiningFee) : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Annual Fee</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {c ? (c.annualFee && c.annualFee !== "Free" && !c.annualFee.startsWith("₹") ? `₹${c.annualFee}` : c.annualFee) : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Reward Rate / Cashback</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4 font-medium text-emerald-600 dark:text-emerald-400">
                      {c ? c.rewardRate || c.cashback || "Standard Rewards" : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Customer Rating</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4">{c ? <RatingStars rating={c.rating} /> : "-"}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-500 dark:text-slate-400">Key Benefits & Features</td>
                  {slots.map((c, idx) => (
                    <td key={idx} className="py-4 px-4">
                      {c && c.tags ? (
                        <div className="space-y-1.5">
                          {c.tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {tag}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide-over Right Drawer for Selecting Card */}
        {pickerIndex !== null && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
              onClick={() => setPickerIndex(null)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 h-full w-full sm:w-auto">
              <div className="w-full sm:w-screen sm:max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
                <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900 shrink-0">
                  <div>
                    <h3 className="fin-display font-extrabold text-base text-slate-900 dark:text-white">
                      Select Card for Slot {pickerIndex + 1}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose from listed credit cards</p>
                  </div>
                  <button
                    onClick={() => setPickerIndex(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto fin-scrollbar-y divide-y divide-slate-100 dark:divide-slate-800 flex-1 min-h-0">
                  {allCards.map((c) => {
                    const cardId = c.id || c._id;
                    const isSelected = selectedIds.includes(cardId);
                    return (
                      <div
                        key={cardId}
                        onClick={() => {
                          updateSelectedId(pickerIndex, cardId);
                          setPickerIndex(null);
                        }}
                        className={`p-3.5 flex items-center justify-between rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-950/60 opacity-60 pointer-events-none"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {c.imageUrl ? (
                            <img src={c.imageUrl} alt={c.name} className="w-12 h-12 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200 dark:border-slate-800 shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm shrink-0">
                              {c.bank?.[0] || "C"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{c.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.bank} • {c.category}</p>
                          </div>
                        </div>
                        {isSelected ? (
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800 shrink-0">Selected</span>
                        ) : (
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/50 hover:bg-blue-600 hover:text-white transition-all shrink-0">Select</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
