import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PiggyBank, Search, RotateCcw } from "lucide-react";
import { PageShell, PageHero } from "../components/shared.jsx";
import Seo from "../components/Seo.jsx";
import { useLiveData } from "../hooks/useLiveData.js";
import { bankAccountsApi, applicationsApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { BankAccountTile } from "../components/bank/BankAccountTile.jsx";
import { CatalogFilterBar } from "../components/shared/CatalogFilterBar.jsx";

export default function BankAccountsPage() {
  const navigate = useNavigate();
  const { data: accounts } = useLiveData(bankAccountsApi.getAll, []);
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const types = ["All", "Savings", "Zero Balance", "Salary", "Current"];

  const filtered = useMemo(() => {
    return accounts.filter((a) => {
      const matchType =
        typeFilter === "All" ||
        (a.type && a.type.toLowerCase().includes(typeFilter.toLowerCase()));
      const matchQuery =
        !searchQuery ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.bank && a.bank.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchQuery;
    });
  }, [accounts, typeFilter, searchQuery]);

  const resetFilters = () => {
    setTypeFilter("All");
    setSearchQuery("");
  };

  const handleOpenAccount = async (account) => {
    if (!user) {
      toast.error("Please login first to apply for this bank account!");
      navigate("/auth");
      return;
    }
    try {
      await applicationsApi.create({
        productType: "BankAccount",
        productId: account.id || account._id,
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: "9999999999",
      });
    } catch (e) {
      // silent track
    }

    if (account.applyUrl) {
      window.open(account.applyUrl, "_blank");
    } else {
      toast.success(`Account opening request initiated for ${account.name}!`);
    }
  };

  return (
    <PageShell>
      <Seo title="Bank Accounts" description="Compare savings, salary, current and zero-balance bank accounts by interest rate and minimum balance." />
      <PageHero eyebrow="Bank Accounts" title="Open the right account, not just any account" subtitle="Compare interest rates, minimum balance requirements and features across savings, salary and current accounts." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <CatalogFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={typeFilter}
          setFilter={setTypeFilter}
          categories={types}
          resetFilters={resetFilters}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div>
              <h3 className="fin-display text-base font-bold text-slate-900 dark:text-white">No bank accounts found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We couldn't find any accounts matching your search criteria or selected category.
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((acc) => (
              <BankAccountTile key={acc.id || acc._id} account={acc} onOpenAccount={handleOpenAccount} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
