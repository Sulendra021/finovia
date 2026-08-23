import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { bulkDataApi } from "../../services/api.js";
import { TableHeaderBanner, TableFilterBar } from "./ResourceTableToolbar.jsx";
import { BulkJsonModal } from "./BulkJsonModal.jsx";
import { ResourceEditModal } from "./ResourceEditModal.jsx";

// Generic admin CRUD table - powers every admin resource page (credit cards, bank accounts, offers, etc.)
export default function ResourceTable({ title, api, columns, formFields, emptyLabel = "items", modelName = "creditCard", onEdit, onBulkNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode, object = edit mode
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Bulk Add pipeline state
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkOperation, setBulkOperation] = useState("createMany");
  const [bulkJson, setBulkJson] = useState("[\n  {\n    \"name\": \"Sample Card\",\n    \"bank\": \"HDFC Bank\",\n    \"category\": \"Rewards\"\n  }\n]");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkError, setBulkError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getAll()
      .then(setItems)
      .catch(() => setError("Couldn't reach the backend. Is it running and seeded?"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // Extract unique values dynamically for filters
  const uniqueBanks = Array.from(new Set(items.map((i) => i.bank).filter(Boolean))).sort();
  const uniqueCategories = Array.from(new Set(items.map((i) => i.category).filter(Boolean))).sort();
  const hasBankField = columns.some((c) => c.key === "bank");
  const hasCategoryField = columns.some((c) => c.key === "category");
  const hasRatingField = columns.some((c) => c.key === "rating");
  const hasFeeField = columns.some((c) => c.key === "annualFee" || c.key === "fee");

  const resetFilters = () => {
    setSearch("");
    setSelectedBank("");
    setSelectedCategory("");
    setMinRating("");
    setMaxFee("");
  };

  const filteredItems = items.filter((item) => {
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchesText = columns.some((c) => String(item[c.key] ?? "").toLowerCase().includes(query));
      if (!matchesText) return false;
    }

    if (selectedBank && item.bank !== selectedBank) return false;
    if (selectedCategory && item.category !== selectedCategory) return false;

    if (minRating !== "") {
      const itemRating = Number(item.rating) || 0;
      if (itemRating < Number(minRating)) return false;
    }

    if (maxFee !== "") {
      const rawFee = String(item.annualFee || item.fee || "").replace(/[^0-9]/g, "");
      const numericFee = rawFee ? Number(rawFee) : 0;
      if (maxFee === "free" && numericFee !== 0 && !String(item.annualFee || item.fee).toLowerCase().includes("free")) {
        return false;
      }
      if (maxFee === "1000" && numericFee > 1000) return false;
      if (maxFee === "3000" && numericFee > 3000) return false;
    }

    return true;
  });

  const openCreate = () => {
    const blank = {};
    formFields.forEach((f) => (blank[f.name] = f.type === "number" ? "" : ""));
    setForm(blank);
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    const filled = {};
    formFields.forEach((f) => {
      const val = item[f.name];
      filled[f.name] = f.type === "tags" ? (Array.isArray(val) ? val.join(", ") : "") : val ?? "";
    });
    setForm(filled);
    setEditing(item);
    setModalOpen(true);
  };

  const onChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      formFields.forEach((f) => {
        if (f.type === "number") payload[f.name] = payload[f.name] === "" ? undefined : Number(payload[f.name]);
        if (f.type === "tags") payload[f.name] = String(payload[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
      });
      if (editing) {
        await api.update(editing._id, payload);
      } else {
        await api.create(payload);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setBulkSaving(true);
    setBulkError("");
    try {
      let parsedDocs;
      try {
        parsedDocs = JSON.parse(bulkJson);
      } catch {
        throw new Error("Invalid JSON syntax. Please verify commas and quotes.");
      }

      if (!Array.isArray(parsedDocs)) {
        throw new Error("JSON payload must be an array of objects [ { ... } ].");
      }

      await bulkDataApi.executePipeline(modelName, bulkOperation, parsedDocs);
      setBulkModalOpen(false);
      load();
    } catch (err) {
      const resData = err?.response?.data;
      if (resData?.errors && Array.isArray(resData.errors)) {
        const errorList = resData.errors.map((e) => e.message || (e.field ? `${e.field}: invalid` : JSON.stringify(e))).join(" | ");
        setBulkError(`Bulk validation failed: ${errorList}`);
      } else {
        setBulkError(resData?.message || resData?.error || err?.message || "Bulk operation failed");
      }
    } finally {
      setBulkSaving(false);
    }
  };

  const onDelete = async (item) => {
    if (!window.confirm(`Delete "${item[columns[0].key]}"? This can't be undone.`)) return;
    try {
      await api.remove(item._id);
      load();
    } catch {
      setError("Delete failed");
    }
  };

  const hasActiveFilters = Boolean(search || selectedBank || selectedCategory || minRating !== "" || maxFee !== "");

  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((item) => item._id || item.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected record(s)? This action cannot be undone.`)) return;

    setDeletingBulk(true);
    setError("");
    try {
      await Promise.all(selectedIds.map((id) => api.remove(id)));
      setSelectedIds([]);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete selected items");
    } finally {
      setDeletingBulk(false);
    }
  };

  const isAllSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;

  return (
    <div className="space-y-6">
      <TableHeaderBanner
        title={title}
        count={items.length}
        emptyLabel={emptyLabel}
        onOpenBulk={onBulkNavigate || (() => setBulkModalOpen(true))}
        onOpenCreate={openCreate}
      />

      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 transition-all">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300">
            <span>{selectedIds.length} item(s) selected</span>
          </div>
          <button
            type="button"
            onClick={handleBulkDelete}
            disabled={deletingBulk}
            className="fin-focus flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition-all"
          >
            {deletingBulk ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )}

      {error && (
        <div className="text-xs text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl p-4">
          {error}
        </div>
      )}

      <TableFilterBar
        search={search}
        setSearch={setSearch}
        emptyLabel={emptyLabel}
        filteredCount={filteredItems.length}
        totalCount={items.length}
        hasBankField={hasBankField}
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
        uniqueBanks={uniqueBanks}
        hasCategoryField={hasCategoryField}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        uniqueCategories={uniqueCategories}
        hasRatingField={hasRatingField}
        minRating={minRating}
        setMinRating={setMinRating}
        hasFeeField={hasFeeField}
        maxFee={maxFee}
        setMaxFee={setMaxFee}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
              {search ? `No ${emptyLabel} match "${search}".` : `No ${emptyLabel} available yet.`}
            </p>
            {!search && (
              <button onClick={openCreate} className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700">
                + Create your first record
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="text-left px-4 py-3.5 w-16">Sr. No.</th>
                  {columns.map((c) => (
                    <th key={c.key} className="text-left px-6 py-3.5">
                      {c.label}
                    </th>
                  ))}
                  <th className="text-right px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredItems.map((item, index) => {
                  const itemId = item._id || item.id;
                  const isChecked = selectedIds.includes(itemId);
                  return (
                    <tr
                      key={itemId || `item-${index}`}
                      className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${
                        isChecked ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(itemId)}
                          className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 fin-num">
                        {index + 1}
                      </td>
                      {columns.map((c, idx) => (
                        <td key={c.key} className={`px-6 py-4 ${idx === 0 ? "font-bold text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                          {c.key === "rating" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-xs">
                              ★ {item[c.key] ?? "N/A"}
                            </span>
                          ) : c.key === "category" ? (
                            <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-100 dark:border-blue-900/50">
                              {item[c.key]}
                            </span>
                          ) : Array.isArray(item[c.key]) ? (
                            item[c.key].join(", ")
                          ) : (
                            String(item[c.key] ?? "")
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onEdit) {
                              onEdit(item);
                            } else {
                              openEdit(item);
                            }
                          }}
                          className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition-colors inline-flex"
                          title="Edit record"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onDelete(item);
                          }}
                          className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors inline-flex"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ResourceEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        editing={editing}
        formFields={formFields}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        saving={saving}
      />

      <BulkJsonModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        modelName={modelName}
        bulkOperation={bulkOperation}
        setBulkOperation={setBulkOperation}
        bulkJson={bulkJson}
        setBulkJson={setBulkJson}
        bulkSaving={bulkSaving}
        bulkError={bulkError}
        onSubmit={handleBulkSubmit}
      />
    </div>
  );
}
